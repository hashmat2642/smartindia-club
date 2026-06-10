import { supabase } from "@/lib/supabase";

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: student } = await supabase
    .from("students")
    .select("*")
    .eq("student_id", id)
    .single();

  if (!student) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        <h1 className="text-4xl font-bold">
          Student Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">
      <h1 className="text-5xl font-bold">
        {student.name}
      </h1>

      <div className="mt-8 space-y-3">
        <p>Student ID: {student.student_id}</p>
        <p>Class: {student.class_name}</p>
        <p>School: {student.school_name}</p>
        <p>Payment: {student.payment_status}</p>
        <p>Score: {student.score ?? 0}</p>
        <p>Rank: {student.rank || "Pending"}</p>
      </div>
    </main>
  );
}