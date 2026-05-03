import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "faculty" | "student";
  is_active: boolean;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
  profile_image?: string;
}

type AppRole = "admin" | "faculty" | "student";

interface AuthContextType {
  user: User | null;
  role: AppRole | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string, role?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<AppRole | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for stored token and user on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setRole(parsedUser.role);
      } catch (err) {
        console.error("Error parsing stored user:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Validate input
      if (!email || !password) {
        return { error: "Email and password are required" };
      }

      const response = await api.post("/login", { email, password });
      console.log("Login response:", response.data);
      
      const { user, token } = response.data;
      
      if (!user || !token) {
        console.error("Missing user or token in response", response.data);
        return { error: "Invalid server response format" };
      }
      
      // Validate user object
      if (!user.id || !user.email || !user.role) {
        console.error("Invalid user object received", user);
        return { error: "Invalid user data received" };
      }
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      setUser(user);
      setRole(user.role || null);
      
      return { error: null };
    } catch (err: any) {
      console.error("Login error:", err);
      
      // Handle different types of errors
      if (err.code === 'ECONNABORTED') {
        return { error: "Request timeout. Please try again." };
      }
      
      if (err.code === 'ERR_NETWORK') {
        return { error: "Network error. Please check your connection." };
      }
      
      if (err.response) {
        // Server responded with error status
        const status = err.response.status;
        const data = err.response.data;
        
        if (status === 500) {
          return { error: "Server error. Please try again later." };
        }
        
        if (status === 422) {
          // Validation errors
          const errors = data?.errors;
          if (errors?.email) {
            return { error: errors.email[0] };
          }
          if (errors?.password) {
            return { error: errors.password[0] };
          }
          return { error: "Invalid credentials" };
        }
        
        if (status === 401) {
          return { error: "Invalid email or password" };
        }
        
        return { error: data?.message || `Server error (${status})` };
      }
      
      if (err.request) {
        // Network error (no response received)
        return { error: "Unable to connect to server. Please check if the backend is running." };
      }
      
      return { error: "Login failed. Please try again." };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, userRole = "student") => {
    try {
      const response = await api.post("/register", {
        name: fullName,
        email,
        password,
        password_confirmation: password,
        role: userRole,
      });
      
      const { user, token } = response.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      setUser(user);
      setRole(user.role);
      
      return { error: null };
    } catch (err: any) {
      console.error("Signup error:", err);
      return { 
        error: err.response?.data?.message || "Registration failed" 
      };
    }
  };

  const signOut = async () => {
    try {
      await api.post("/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setRole(null);
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
