import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TestLogin = () => {
  const [email, setEmail] = useState("admin@uc.edu.ph");
  const [password, setPassword] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const { signIn } = useAuth();

  const handleTestLogin = async () => {
    setIsLoading(true);
    setResult("Testing login...");
    
    try {
      const { error } = await signIn(email, password);
      if (error) {
        setResult(`❌ Login failed: ${error}`);
      } else {
        setResult("✅ Login successful!");
      }
    } catch (err: any) {
      setResult(`❌ Unexpected error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Test Login Functionality</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@test.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </div>
          <Button 
            onClick={handleTestLogin} 
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Testing..." : "Test Login"}
          </Button>
          {result && (
            <div className={`p-3 rounded-md text-sm ${
              result.includes("✅") 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              {result}
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            <p>Test credentials:</p>
            <p>Email: admin@uc.edu.ph</p>
            <p>Password: password</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestLogin;
