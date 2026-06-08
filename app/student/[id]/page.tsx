import { supabase } from "@/lib/supabase";

export default async function StudentProfile({
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
    return <h1>Student Not Found</h1>;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          {student.name}
        </h1>

        <div className="mt-8 rounded-3xl bg-slate-900 p-6">
          <p><strong>Student ID:</strong> {student.student_id}</p>
          <p><strong>Class:</strong> {student.class_name}</p>
          <p><strong>School:</strong> {student.school_name}</p>
          <p><strong>Score:</strong> {student.score ?? 0}</p>
          <p><strong>Rank:</strong> {student.rank || "Pending"}</p>
          <p><strong>Performance:</strong> {student.performance || "Pending"}</p>
          <p><strong>Payment:</strong> {student.payment_status || "Pending"}</p>
        </div>
      </section>
    </main>
  );
}