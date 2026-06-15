// app/data/students.ts

export type StudentMockType = {
  id: string; // Internal unique database entry key
  student_id: string; // Public structural profile roll number
  name: string;
  class_name: string;
  school_name: string;
  score: number; // Strictly a valid integer number
  rank: string;
  certificate_id: string; // Standard snake_case key matching Supabase
};

export const students: StudentMockType[] = [
  {
    id: "1",
    student_id: "SIC-001",
    name: "Hashmat",
    class_name: "Class 8",
    school_name: "Demo School",
    score: 95,
    rank: "Top Performer",
    certificate_id: "SIC-CERT-2026-0001",
  },
  {
    id: "2", // FIX: Numeric identifier isolated
    student_id: "SIC-002", // FIX: Separated string roll number property added back safely
    name: "Student B",
    class_name: "Class 7",
    school_name: "Demo School",
    score: 88,
    rank: "Participation",
    certificate_id: "SIC-CERT-2026-0002",
  },
];