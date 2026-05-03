import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";

// Dashboard Stats
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const { data } = await api.get("/reports/dashboard-stats");
      return data;
    },
  });
};

// Courses
export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const { data } = await api.get("/courses");
      return data;
    },
  });
};

interface Course {
  id: number;
  code?: string;
  name: string;
  description?: string;
  years?: number;
  duration_years?: number;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (course: Omit<Course, 'id' | 'created_at' | 'updated_at'>) => {
      const { data } = await api.post("/courses", course);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, course }: { id: number; course: Omit<Course, 'id' | 'created_at' | 'updated_at'> }) => {
      const { data } = await api.put(`/courses/${id}`, course);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/courses/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};

export const useCourse = (id: number | null) => {
  return useQuery({
    queryKey: ["courses", id],
    queryFn: async () => {
      const { data } = await api.get(`/courses/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

// Rooms
export const useRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: async () => {
      const { data } = await api.get("/rooms");
      return data;
    },
  });
};

interface Room {
  id: number;
  name: string;
  code?: string;
  type?: string;
  capacity?: number;
  location?: string | null;
  is_active?: boolean;
  created_at: string;
  updated_at: string;
}

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (room: Omit<Room, 'id' | 'created_at' | 'updated_at'>) => {
      const { data } = await api.post("/rooms", room);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, room }: { id: number; room: Omit<Room, 'id' | 'created_at' | 'updated_at'> }) => {
      const { data } = await api.put(`/rooms/${id}`, room);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/rooms/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
  });
};

// Students
interface StudentParams {
  search?: string;
  course_id?: number;
  section_id?: number;
  year_level?: number;
  semester?: string;
}

export const useStudents = (params?: StudentParams) => {
  return useQuery({
    queryKey: ["students", params],
    queryFn: async () => {
      const { data } = await api.get("/students", { params });
      return data;
    },
  });
};

export const useStudent = (id: number | null) => {
  return useQuery({
    queryKey: ["students", id],
    queryFn: async () => {
      const { data } = await api.get(`/students/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

export const useMyProfile = () => {
  return useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const { data } = await api.get("/my-profile");
      return data;
    },
  });
};

interface UserProfile {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  suffix?: string;
  contact_number?: string;
  address?: string;
  gender?: 'male' | 'female' | 'other';
  birthday?: string;
  birthplace?: string;
  religion?: string;
  mother_name?: string;
  father_name?: string;
  guardian_name?: string;
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      const { data } = await api.put("/profile", profile);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-profile"] });
    },
  });
};

export const useFacultyProfile = () => {
  return useQuery({
    queryKey: ["faculty-profile"],
    queryFn: async () => {
      const { data } = await api.get("/faculty/my-profile");
      return data;
    },
  });
};

interface Student {
  id: number;
  user_id: number;
  student_id: string;
  course_id?: number;
  section_id?: number;
  year_level?: number;
  semester?: string;
  user?: {
    name: string;
  };
  course?: {
    name: string;
  };
  section?: {
    id: number;
    name: string;
  };
  skills?: Array<{ id: number; name: string }>;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  suffix?: string;
  email?: string;
  password?: string;
  contact_number?: string;
  address?: string;
  emergency_contact_name?: string;
  emergency_contact_number?: string;
  mother_name?: string;
  father_name?: string;
  guardian_name?: string;
  gender?: string;
  birthday?: string;
  birthplace?: string;
  religion?: string;
}

export const useCreateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (student: Omit<Student, 'id' | 'created_at' | 'updated_at'>) => {
      const { data } = await api.post("/students", student);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, student }: { id: number; student: Omit<Student, 'id' | 'created_at' | 'updated_at'> }) => {
      const { data } = await api.put(`/students/${id}`, student);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/students/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
  });
};

export const useNextStudentId = () => {
  return useQuery({
    queryKey: ["next-student-id"],
    queryFn: async () => {
      const { data } = await api.get("/students/next-id");
      return data.next_id;
    },
  });
};

// Faculty
interface Faculty {
  user_id: number;
  employee_id: string;
  course_id?: number;
  specialization?: string;
  firstname?: string;
  middlename?: string;
  lastname?: string;
  suffix?: string;
  email?: string;
  password?: string;
  department?: string;
  position?: string;
  employment_status?: string;
  educational_attainment?: string;
  contact_number?: string;
  address?: string;
  mother_name?: string;
  father_name?: string;
  gender?: string;
  birthday?: string;
  birthplace?: string;
  religion?: string;
  office_location?: string;
}

export const useCreateFaculty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (faculty: Omit<Faculty, 'id' | 'created_at' | 'updated_at'>) => {
      const { data } = await api.post("/faculty", faculty);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculty"] });
    },
  });
};

export const useUpdateFaculty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, faculty }: { id: number; faculty: Omit<Faculty, 'id' | 'created_at' | 'updated_at'> }) => {
      const { data } = await api.put(`/faculty/${id}`, faculty);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculty"] });
    },
  });
};

export const useDeleteFaculty = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/faculty/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculty"] });
    },
  });
};

export const useNextFacultyId = () => {
  return useQuery({
    queryKey: ["next-faculty-id"],
    queryFn: async () => {
      const { data } = await api.get("/faculty/next-id");
      return data.next_id;
    },
  });
};

export const useFaculty = () => {
  return useQuery({
    queryKey: ["faculty"],
    queryFn: async () => {
      const { data } = await api.get("/faculty");
      return data;
    },
  });
};

export const useMyStudents = () => {
  return useQuery({
    queryKey: ["my-students"],
    queryFn: async () => {
      const { data } = await api.get("/faculty/my-students");
      return data;
    },
  });
};

export const useMyClasses = () => {
  return useQuery({
    queryKey: ["my-classes"],
    queryFn: async () => {
      const { data } = await api.get("/faculty/my-classes");
      return data;
    },
  });
};

// Subjects
interface SubjectParams {
  search?: string;
  course_id?: number;
  year_level?: number;
  semester?: string;
  id?: number;
}

export const useSubjects = (params?: SubjectParams) => {
  return useQuery({
    queryKey: ["subjects", params],
    queryFn: async () => {
      const { data } = await api.get("/subjects", { params });
      return data;
    },
  });
};

export const useMySubjects = () => {
  return useQuery({
    queryKey: ["my-subjects"],
    queryFn: async () => {
      const { data } = await api.get("/my-subjects");
      return data;
    },
  });
};

export const useUpdateProfileImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('profile_image', file);
      const { data } = await api.post('/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
  });
};

export const useUpdateFacultyProfileImage = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('profile_image', file);
      const { data } = await api.post('/faculty/profile-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
  });
};

interface FacultyProfile {
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  suffix?: string;
  contact_number?: string;
  address?: string;
  gender?: 'male' | 'female' | 'other';
  birthday?: string;
  birthplace?: string;
  religion?: string;
  mother_name?: string;
  father_name?: string;
  guardian_name?: string;
}

export const useUpdateFacultyProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: FacultyProfile) => {
      const { data } = await api.put("/faculty/profile", profile);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faculty-profile"] });
    },
  });
};

// Notifications
export const useNotifications = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } = await api.get("/notifications");
      return data;
    },
  });
};

export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: ["notifications", "unread-count"],
    queryFn: async () => {
      const { data } = await api.get("/notifications/unread/count");
      return data;
    },
  });
};

export const useMarkNotificationAsRead = () => {
  return useMutation({
    mutationFn: async (notificationId: number) => {
      const { data } = await api.post(`/notifications/${notificationId}/mark-as-read`);
      return data;
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/notifications/mark-all-as-read");
      return data;
    },
  });
};

// Course Subjects
interface CourseSubjectParams {
  search?: string;
  course_id?: number;
  subject_id?: number;
  year_level?: number;
  semester?: string;
}

export const useCourseSubjects = (params?: CourseSubjectParams) => {
  return useQuery({
    queryKey: ["course-subjects", params],
    queryFn: async () => {
      const { data } = await api.get("/course-subjects", { params });
      return data;
    },
  });
};

interface CourseSubject {
  course_id?: number;
  subject_id?: number;
  year_level: number;
  semester: string | number;
  is_active?: boolean;
}

export const useCreateCourseSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (courseSubject: Omit<CourseSubject, 'id' | 'created_at' | 'updated_at'>) => {
      const { data } = await api.post("/course-subjects", courseSubject);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-subjects"] });
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });
};

export const useUpdateCourseSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, courseSubject }: { id: number; courseSubject: Omit<CourseSubject, 'id' | 'created_at' | 'updated_at'> }) => {
      const { data } = await api.put(`/course-subjects/${id}`, courseSubject);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-subjects"] });
    },
  });
};

export const useDeleteCourseSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/course-subjects/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-subjects"] });
    },
  });
};

// Sections
interface SectionParams {
  search?: string;
  course_id?: number;
  year_level?: number;
  semester?: string;
}

export const useSections = (params?: SectionParams) => {
  return useQuery({
    queryKey: ["sections", params],
    queryFn: async () => {
      const { data } = await api.get("/sections", { params });
      return data;
    },
  });
};

export const useSectionStudents = (sectionId: number) => {
  return useQuery({
    queryKey: ["sections", sectionId, "students"],
    queryFn: async () => {
      const { data } = await api.get(`/sections/${sectionId}/students`);
      return data;
    },
    enabled: !!sectionId,
  });
};

interface Section {
  name: string;
  course_id: number;
  year_level: number;
  semester: string;
  capacity?: number;
  academic_year?: string;
  is_active?: boolean;
}

export const useCreateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (section: Omit<Section, 'id' | 'created_at' | 'updated_at'>) => {
      const { data } = await api.post("/sections", section);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
};

export const useUpdateSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, section }: { id: number; section: Omit<Section, 'id' | 'created_at' | 'updated_at'> }) => {
      const { data } = await api.put(`/sections/${id}`, section);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
};

export const useDeleteSection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/sections/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });
};

// Schedules
interface ScheduleParams {
  search?: string;
  faculty_id?: number;
  section_id?: number;
  subject_id?: number;
  room_id?: number;
}

export const useSchedules = (params?: ScheduleParams) => {
  return useQuery({
    queryKey: ["schedules", params],
    queryFn: async () => {
      const { data } = await api.get("/schedules", { params });
      return data;
    },
  });
};

export const useMySchedule = () => {
  return useQuery({
    queryKey: ["my-schedule"],
    queryFn: async () => {
      const { data } = await api.get("/my-schedule");
      return data;
    },
  });
};

interface Schedule {
  faculty_id: number;
  section_id: number;
  subject_id: number;
  room_id: number;
  day_of_week?: string;
  day?: string;
  start_time: string;
  end_time: string;
  academic_year?: string;
  semester?: string | number;
}

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (schedule: Omit<Schedule, 'id' | 'created_at' | 'updated_at'>) => {
      const { data } = await api.post("/schedules", schedule);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
};

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, schedule }: { id: number; schedule: Omit<Schedule, 'id' | 'created_at' | 'updated_at'> }) => {
      const { data } = await api.put(`/schedules/${id}`, schedule);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
};

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/schedules/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
};

// Violations
interface ViolationParams {
  search?: string;
  student_id?: number;
  status?: string;
  violation_type_id?: number;
}

export const useViolations = (params?: ViolationParams) => {
  return useQuery({
    queryKey: ["violations", params],
    queryFn: async () => {
      const { data } = await api.get("/violations", { params });
      return data;
    },
  });
};

interface Violation {
  student_id: number;
  violation_type_id: number;
  description: string;
  severity: string;
  reporter_type: string;
  reporter_id?: number;
  violation_date?: string;
}

export const useCreateViolation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (violation: Omit<Violation, 'id' | 'created_at' | 'updated_at'>) => {
      const { data } = await api.post("/violations", violation);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["violations"] });
    },
  });
};

export const useUpdateViolation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, violation }: { id: number; violation: Omit<Violation, 'id' | 'created_at' | 'updated_at'> }) => {
      const { data } = await api.put(`/violations/${id}`, violation);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["violations"] });
    },
  });
};

export const useDeleteViolation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/violations/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["violations"] });
    },
  });
};

export const useApproveViolation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, admin_remarks }: { id: number; admin_remarks?: string }) => {
      const { data } = await api.post(`/violations/${id}/approve`, { admin_remarks });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["violations"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
};

export const useRejectViolation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, admin_remarks }: { id: number; admin_remarks: string }) => {
      const { data } = await api.post(`/violations/${id}/reject`, { admin_remarks });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["violations"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
};

export const useViolationTypes = () => {
  return useQuery({
    queryKey: ["violation-types"],
    queryFn: async () => {
      const { data } = await api.get("/violation-types");
      return data;
    },
  });
};

// Achievements
interface AchievementParams {
  search?: string;
  student_id?: number;
  status?: string;
}

export const useAchievements = (params?: AchievementParams) => {
  return useQuery({
    queryKey: ["achievements", params],
    queryFn: async () => {
      const { data } = await api.get("/achievements", { params });
      return data;
    },
  });
};

interface Achievement {
  student_id: number;
  title: string;
  description: string;
  category: string;
  date_achieved: string;
  organizer_type: string;
  organizer_id?: number;
}

export const useCreateAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (achievement: Omit<Achievement, 'id' | 'created_at' | 'updated_at'>) => {
      const { data } = await api.post("/achievements", achievement);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
};

export const useUpdateAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, achievement }: { id: number; achievement: Omit<Achievement, 'id' | 'created_at' | 'updated_at'> }) => {
      const { data } = await api.put(`/achievements/${id}`, achievement);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
};

export const useDeleteAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/achievements/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
};

export const useApproveAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, remarks }: { id: number; remarks?: string }) => {
      const { data } = await api.post(`/achievements/${id}/approve`, { admin_remarks: remarks });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
};

export const useRejectAchievement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, remarks }: { id: number; remarks: string }) => {
      const { data } = await api.post(`/achievements/${id}/reject`, { admin_remarks: remarks });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
};

// Materials
interface MaterialParams {
  search?: string;
  subject_id?: number;
  section_id?: number;
}

export const useMaterials = (params?: MaterialParams) => {
  return useQuery({
    queryKey: ["materials", params],
    queryFn: async () => {
      const { data } = await api.get("/materials", { params });
      return data;
    },
  });
};

export const useMyMaterials = () => {
  return useQuery({
    queryKey: ["my-materials"],
    queryFn: async () => {
      const { data } = await api.get("/my-materials");
      return data;
    },
  });
};

export const useCreateMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post("/materials", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      queryClient.invalidateQueries({ queryKey: ["my-materials"] });
    },
  });
};

interface Material {
  title: string;
  description?: string;
  subject_id: number;
  section_id?: number;
  type: string;
  file_path: string;
  original_filename?: string;
}

export const useUpdateMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, material }: { id: number; material: Partial<Material> }) => {
      const { data } = await api.put(`/materials/${id}`, material);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      queryClient.invalidateQueries({ queryKey: ["my-materials"] });
    },
  });
};

export const useDeleteMaterial = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/materials/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
      queryClient.invalidateQueries({ queryKey: ["my-materials"] });
    },
  });
};

export const useDownloadMaterial = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.get(`/materials/${id}/download`, {
        responseType: 'blob',
      });
      
      // Extract filename from Content-Disposition header
      const contentDisposition = response.headers['content-disposition'];
      let filename = `material-${id}`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename\*?=(?:UTF-\d'')?([^;]+)/i);
        if (filenameMatch && filenameMatch[1]) {
          filename = decodeURIComponent(filenameMatch[1].trim());
        } else {
          // Fallback to simpler pattern
          const simpleMatch = contentDisposition.match(/filename="?([^"]+)"?/);
          if (simpleMatch && simpleMatch[1]) {
            filename = simpleMatch[1];
          }
        }
      }

      const url = window.URL.createObjectURL(new Blob([response.data], { type: (response.headers['content-type'] as string) || 'application/octet-stream' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return response.data;
    },
  });
};

// Submissions
interface SubmissionParams {
  search?: string;
  assignment_id?: number;
  student_id?: number;
  status?: string;
  subject_id?: number;
}

export const useSubmissions = (params?: SubmissionParams) => {
  return useQuery({
    queryKey: ["submissions", params],
    queryFn: async () => {
      const { data } = await api.get("/submissions", { params });
      return data;
    },
  });
};

export const useMySubmissions = () => {
  return useQuery({
    queryKey: ["my-submissions"],
    queryFn: async () => {
      const { data } = await api.get("/my-submissions");
      return data;
    },
  });
};

export const useSubmissionsToGrade = () => {
  return useQuery({
    queryKey: ["submissions-to-grade"],
    queryFn: async () => {
      const { data } = await api.get("/submissions-to-grade");
      return data;
    },
  });
};

interface Submission {
  assignment_id: number;
  student_id: number;
  content: string;
  file_path?: string;
  original_filename?: string;
}

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (submission: Omit<Submission, 'id' | 'created_at' | 'updated_at'>) => {
      const { data } = await api.post("/submissions", submission);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-submissions"] });
      queryClient.invalidateQueries({ queryKey: ["submissions-to-grade"] });
    },
  });
};

export const useGradeSubmission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, grade, feedback }: { id: number; grade: number; feedback?: string }) => {
      const { data } = await api.post(`/submissions/${id}/grade`, { grade, feedback });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
      queryClient.invalidateQueries({ queryKey: ["submissions-to-grade"] });
      queryClient.invalidateQueries({ queryKey: ["my-submissions"] });
    },
  });
};

// Events
interface EventParams {
  search?: string;
  status?: string;
  organizer_type?: string;
}

export const useEvents = (params?: EventParams) => {
  return useQuery({
    queryKey: ["events", params],
    queryFn: async () => {
      const { data } = await api.get("/events", { params });
      return data;
    },
  });
};

export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: ["upcoming-events"],
    queryFn: async () => {
      const { data } = await api.get("/events/upcoming/list");
      return data;
    },
  });
};

interface Event {
  title: string;
  description: string;
  date?: string;
  time?: string;
  location?: string;
  organizer_type?: string;
  organizer_id?: number;
  start_date?: string;
  end_date?: string;
  venue?: string;
  participants?: any[];
  type?: string;
}

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) => {
      const { data } = await api.post("/events", event);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, event }: { id: number; event: Omit<Event, 'id' | 'created_at' | 'updated_at'> }) => {
      const { data } = await api.put(`/events/${id}`, event);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/events/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useJoinEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventId: number) => {
      const { data } = await api.post(`/events/${eventId}/join`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useSubmitEventForApproval = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (eventId: number) => {
      const { data } = await api.post(`/events/${eventId}/submit-for-approval`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useApproveEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, remarks }: { id: number; remarks?: string }) => {
      const { data } = await api.post(`/events/${id}/approve`, { admin_remarks: remarks });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useRejectEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, remarks }: { id: number; remarks: string }) => {
      const { data } = await api.post(`/events/${id}/reject`, { admin_remarks: remarks });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

export const useMarkEventAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ eventId, studentId }: { eventId: number; studentId: number }) => {
      const { data } = await api.post(`/events/${eventId}/mark-attendance`, { student_id: studentId });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
};

// Organizations
export const useOrganizations = () => {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const { data } = await api.get("/organizations");
      return data;
    },
  });
};

export const useMyOrganizations = () => {
  return useQuery({
    queryKey: ["my-organizations"],
    queryFn: async () => {
      const { data } = await api.get("/my-organizations");
      return data;
    },
  });
};

export const useJoinOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (organizationId: number) => {
      const { data } = await api.post(`/organizations/${organizationId}/join`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

export const useLeaveOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (organizationId: number) => {
      const { data } = await api.post(`/organizations/${organizationId}/leave`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

interface Organization {
  name: string;
  description: string;
  type?: string;
  category?: string;
  advisor_id?: number;
  adviser_id?: number;
  is_active?: boolean;
}

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (organization: Omit<Organization, 'id' | 'created_at' | 'updated_at'>) => {
      const { data } = await api.post("/organizations", organization);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, organization }: { id: number; organization: Omit<Organization, 'id' | 'created_at' | 'updated_at'> }) => {
      const { data } = await api.put(`/organizations/${id}`, organization);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/organizations/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

// Grades
interface GradeParams {
  search?: string;
  student_id?: number;
  subject_id?: number;
  section_id?: number;
}

export const useGrades = (params?: GradeParams) => {
  return useQuery({
    queryKey: ["grades", params],
    queryFn: async () => {
      const { data } = await api.get("/grades", { params });
      return data;
    },
  });
};

export const useMyGrades = () => {
  return useQuery({
    queryKey: ["my-grades"],
    queryFn: async () => {
      const { data } = await api.get("/my-grades");
      return data;
    },
  });
};

interface GradeManageParams {
  search?: string;
  subject_id?: number;
  section_id?: number;
}

export const useGradesToManage = (params?: GradeManageParams) => {
  return useQuery({
    queryKey: ["grades-to-manage", params],
    queryFn: async () => {
      const { data } = await api.get("/grades-to-manage", { params });
      return data;
    },
  });
};

interface Grade {
  student_id: number;
  subject_id: number;
  grade: number;
  score?: number;
  remarks?: string;
  is_locked?: boolean;
}

export const useCreateGrade = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (grade: Omit<Grade, 'id' | 'created_at' | 'updated_at'>) => {
      const { data } = await api.post("/grades", grade);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grades"] });
      queryClient.invalidateQueries({ queryKey: ["my-grades"] });
    },
  });
};

// Attendance
interface AttendanceParams {
  search?: string;
  student_id?: number;
  section_id?: number;
  date?: string;
}

export const useAttendance = (params?: AttendanceParams) => {
  return useQuery({
    queryKey: ["attendance", params],
    queryFn: async () => {
      const { data } = await api.get("/attendance", { params });
      return data;
    },
  });
};

export const useMyAttendance = () => {
  return useQuery({
    queryKey: ["my-attendance"],
    queryFn: async () => {
      const { data } = await api.get("/my-attendance");
      return data;
    },
  });
};

interface SectionAttendanceParams {
  section_id: number;
  date?: string;
}

export const useSectionAttendance = (params?: SectionAttendanceParams) => {
  return useQuery({
    queryKey: ["section-attendance", params],
    queryFn: async () => {
      const { data } = await api.get("/section-attendance", { params });
      return data;
    },
  });
};

interface AttendanceRecord {
  student_id: number;
  date: string;
  status: string;
  remarks?: string;
}

export const useBulkAttendance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (attendance: AttendanceRecord[]) => {
      const { data } = await api.post("/attendance/bulk", attendance);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      queryClient.invalidateQueries({ queryKey: ["my-attendance"] });
    },
  });
};

// Skills
export const useSkills = () => {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data } = await api.get("/skills");
      return data;
    },
  });
};

export const useMySkills = () => {
  return useQuery({
    queryKey: ["my-skills"],
    queryFn: async () => {
      const { data } = await api.get("/my-skills");
      return data;
    },
  });
};

interface SkillData {
  skill_id: number;
  student_id: number;
  proficiency_level?: string;
}

export const useAddSkillToStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (skillData: SkillData) => {
      const { data } = await api.post("/skills/add-to-student", skillData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-skills"] });
    },
  });
};

export const useRemoveSkillFromStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (skillData: SkillData) => {
      const { data } = await api.post("/skills/remove-from-student", skillData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-skills"] });
    },
  });
};

// Search
interface SearchStudentParams {
  search?: string;
  course_id?: number;
  skill_ids?: number[];
  year_level?: number;
  section_id?: number;
}

export const useSearchStudents = (params?: SearchStudentParams) => {
  return useQuery({
    queryKey: ["search-students", params],
    queryFn: async () => {
      const { data } = await api.get("/search/students", { params });
      return data;
    },
    enabled: !!params?.search || !!params?.course_id || !!params?.skill_ids,
  });
};

export const useFilterOptions = () => {
  return useQuery({
    queryKey: ["filter-options"],
    queryFn: async () => {
      const { data } = await api.get("/search/filter-options");
      return data;
    },
  });
};

// Reports
interface ReportParams {
  start_date?: string;
  end_date?: string;
  course_id?: number;
  section_id?: number;
  year_level?: number;
}

export const useStudentPerformanceReport = (params?: ReportParams) => {
  return useQuery({
    queryKey: ["student-performance-report", params],
    queryFn: async () => {
      const { data } = await api.get("/reports/student-performance", { params });
      return data;
    },
  });
};

export const useAttendanceReport = (params?: ReportParams) => {
  return useQuery({
    queryKey: ["attendance-report", params],
    queryFn: async () => {
      const { data } = await api.get("/reports/attendance", { params });
      return data;
    },
  });
};

export const useViolationSummary = (params?: ReportParams) => {
  return useQuery({
    queryKey: ["violation-summary", params],
    queryFn: async () => {
      const { data } = await api.get("/reports/violation-summary", { params });
      return data;
    },
  });
};

export const useAchievementSummary = (params?: ReportParams) => {
  return useQuery({
    queryKey: ["achievement-summary", params],
    queryFn: async () => {
      const { data } = await api.get("/reports/achievement-summary", { params });
      return data;
    },
  });
};

export const useEventParticipationReport = (params?: ReportParams) => {
  return useQuery({
    queryKey: ["event-participation", params],
    queryFn: async () => {
      const { data } = await api.get("/reports/event-participation", { params });
      return data;
    },
  });
};

export const useOrganizationReport = (params?: ReportParams) => {
  return useQuery({
    queryKey: ["organization-report", params],
    queryFn: async () => {
      const { data } = await api.get("/reports/organizations", { params });
      return data;
    },
  });
};

// Report Export Functions
export const useExportStudentPerformance = () => {
  return useMutation({
    mutationFn: async (params?: ReportParams) => {
      const response = await api.get("/reports/export/student-performance", {
        params,
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `student_performance_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return response.data;
    },
  });
};

export const useExportAttendanceReport = () => {
  return useMutation({
    mutationFn: async (params?: ReportParams) => {
      const response = await api.get("/reports/export/attendance", {
        params,
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return response.data;
    },
  });
};

export const useExportViolationSummary = () => {
  return useMutation({
    mutationFn: async (params?: ReportParams) => {
      const response = await api.get("/reports/export/violation-summary", {
        params,
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `violation_summary_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return response.data;
    },
  });
};

export const useExportAchievementSummary = () => {
  return useMutation({
    mutationFn: async (params?: ReportParams) => {
      const response = await api.get("/reports/export/achievement-summary", {
        params,
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `achievement_summary_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return response.data;
    },
  });
};

export const useExportEventParticipation = () => {
  return useMutation({
    mutationFn: async (params?: ReportParams) => {
      const response = await api.get("/reports/export/event-participation", {
        params,
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `event_participation_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return response.data;
    },
  });
};

export const useExportOrganizationReport = () => {
  return useMutation({
    mutationFn: async (params?: ReportParams) => {
      const response = await api.get("/reports/export/organizations", {
        params,
        responseType: 'blob',
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `organization_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      return response.data;
    },
  });
};

// Assignments
interface AssignmentParams {
  search?: string;
  subject_id?: number;
  section_id?: number;
}

export const useAssignments = (params?: AssignmentParams) => {
  return useQuery({
    queryKey: ["assignments", params],
    queryFn: async () => {
      const { data } = await api.get("/assignments", { params });
      return data;
    },
  });
};

interface Assignment {
  title: string;
  description: string;
  subject_id: number;
  section_id?: number;
  due_date: string;
  points: number;
  instructions?: string;
  deadline?: string;
}

export const useCreateAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (assignment: Omit<Assignment, 'id' | 'created_at' | 'updated_at'>) => {
      const { data } = await api.post("/assignments", assignment);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });
};

export const useUpdateAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, assignment }: { id: number; assignment: Omit<Assignment, 'id' | 'created_at' | 'updated_at'> }) => {
      const { data } = await api.put(`/assignments/${id}`, assignment);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });
};

export const useDeleteAssignment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/assignments/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assignments"] });
    },
  });
};

// Announcements
interface AnnouncementParams {
  search?: string;
  subject_id?: number;
  section_id?: number;
}

export const useAnnouncements = (params?: AnnouncementParams) => {
  return useQuery({
    queryKey: ["announcements", params],
    queryFn: async () => {
      const { data } = await api.get("/announcements", { params });
      return data;
    },
  });
};

interface Announcement {
  title: string;
  content: string;
  subject_id: number;
  section_id?: number;
  type: string;
  target_audience?: string;
}

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (announcement: Omit<Announcement, 'id' | 'created_at' | 'updated_at'>) => {
      const { data } = await api.post("/announcements", announcement);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};

export const useUpdateAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, announcement }: { id: number; announcement: Omit<Announcement, 'id' | 'created_at' | 'updated_at'> }) => {
      const { data } = await api.put(`/announcements/${id}`, announcement);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};

export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/announcements/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["announcements"] });
    },
  });
};

// Quizzes
interface QuizParams {
  search?: string;
  subject_id?: number;
  section_id?: number;
}

export const useQuizzes = (params?: QuizParams) => {
  return useQuery({
    queryKey: ["quizzes", params],
    queryFn: async () => {
      const { data } = await api.get("/quizzes", { params });
      return data;
    },
  });
};

export const useQuiz = (id: number | null) => {
  return useQuery({
    queryKey: ["quizzes", id],
    queryFn: async () => {
      const { data } = await api.get(`/quizzes/${id}`);
      return data;
    },
    enabled: !!id,
  });
};

interface Quiz {
  title: string;
  description: string;
  subject_id: number;
  section_id?: number;
  duration: number;
  total_points: number;
  is_active: boolean;
  passing_score?: number;
}

export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (quiz: Omit<Quiz, 'id' | 'created_at' | 'updated_at'>) => {
      const { data } = await api.post("/quizzes", quiz);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
};

export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, quiz }: { id: number; quiz: Omit<Quiz, 'id' | 'created_at' | 'updated_at'> }) => {
      const { data } = await api.put(`/quizzes/${id}`, quiz);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
};

export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/quizzes/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
};

interface QuizQuestion {
  question: string;
  type: string;
  options?: string[];
  correct_answer: string;
  points: number;
}

export const useAddQuizQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ quizId, question }: { quizId: number; question: QuizQuestion }) => {
      const { data } = await api.post(`/quizzes/${quizId}/questions`, question);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
};

export const useUpdateQuizQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, question }: { id: number; question: QuizQuestion }) => {
      const { data } = await api.put(`/quiz-questions/${id}`, question);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
};

export const useDeleteQuizQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/quiz-questions/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    },
  });
};

export const useStartQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (quizId: number) => {
      const { data } = await api.post(`/quizzes/${quizId}/start`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz-attempts"] });
    },
  });
};

interface QuizAnswer {
  question_id: number;
  answer: string;
}

export const useSubmitQuiz = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ quizId, answers }: { quizId: number; answers: QuizAnswer[] }) => {
      const { data } = await api.post(`/quizzes/${quizId}/submit`, { answers });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quiz-attempts"] });
      queryClient.invalidateQueries({ queryKey: ["my-quiz-attempts"] });
    },
  });
};

export const useMyQuizAttempts = () => {
  return useQuery({
    queryKey: ["my-quiz-attempts"],
    queryFn: async () => {
      const { data } = await api.get("/my-quiz-attempts");
      return data;
    },
  });
};

// Medical Records
interface MedicalRecordParams {
  search?: string;
  student_id?: number;
}

export const useMedicalRecords = (params?: MedicalRecordParams) => {
  return useQuery({
    queryKey: ["medical-records", params],
    queryFn: async () => {
      const { data } = await api.get("/medical-records", { params });
      return data;
    },
  });
};

export const useCreateMedicalRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post("/medical-records", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medical-records"] });
    },
  });
};

interface MedicalRecord {
  student_id: number;
  type: string;
  diagnosis: string;
  treatment: string;
  doctor_name: string;
  date: string;
  notes?: string;
}

export const useUpdateMedicalRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, record }: { id: number; record: Partial<MedicalRecord> }) => {
      const { data } = await api.put(`/medical-records/${id}`, record);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medical-records"] });
    },
  });
};

export const useDeleteMedicalRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await api.delete(`/medical-records/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medical-records"] });
    },
  });
};

export const useVerifyMedicalRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, isVerified }: { id: number; isVerified: boolean }) => {
      const { data } = await api.post(`/medical-records/${id}/verify`, { is_verified: isVerified });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medical-records"] });
    },
  });
};

// Activity Logs
interface ActivityLogParams {
  search?: string;
  user_id?: number;
  action?: string;
  start_date?: string;
  end_date?: string;
  per_page?: number;
}

export const useActivityLogs = (params?: ActivityLogParams) => {
  return useQuery({
    queryKey: ["activity-logs", params],
    queryFn: async () => {
      const { data } = await api.get("/activity-logs", { params });
      return data;
    },
  });
};

export const useStudentLogs = () => {
  return useQuery({
    queryKey: ["student-logs"],
    queryFn: async () => {
      const { data } = await api.get("/activity-logs/students");
      return data;
    },
  });
};

export const useFacultyLogs = () => {
  return useQuery({
    queryKey: ["faculty-logs"],
    queryFn: async () => {
      const { data } = await api.get("/activity-logs/faculty");
      return data;
    },
  });
};

// Approvals (pending counts)
export const usePendingApprovals = () => {
  return useQuery({
    queryKey: ["pending-approvals"],
    queryFn: async () => {
      const [violations, achievements, events] = await Promise.all([
        api.get("/violations/pending/count"),
        api.get("/achievements/pending/count"),
        api.get("/events/pending/count"),
      ]);
      return {
        violations: violations.data.count,
        achievements: achievements.data.count,
        events: events.data.count,
        total: violations.data.count + achievements.data.count + events.data.count,
      };
    },
  });
};
