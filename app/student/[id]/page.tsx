import { supabase } from "@/lib/supabase";

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: students } = await supabase
  .from("students")
  .select("*");

const student = students?.find(
  (s) =>
    s.student_id?.toLowerCase() === id.toLowerCase() ||
    s.name?.toLowerCase().includes(id.toLowerCase()) ||
    s.phone_number?.includes(id)
);

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

      <div className="mt-8 grid gap-4 md:grid-cols-2">
  <div className="rounded-xl bg-slate-900 p-4">
    Student ID: {student.student_id}
  </div>

  <div className="rounded-xl bg-slate-900 p-4">
    Class: {student.class_name}
  </div>

  <div className="rounded-xl bg-slate-900 p-4">
    School: {student.school_name}
  </div>

  <div className="rounded-xl bg-slate-900 p-4">
    Payment: {student.payment_status}
  </div>

  <div className="rounded-xl bg-slate-900 p-4">
    Score: {student.score ?? 0}
  </div>

  <div className="rounded-xl bg-slate-900 p-4">
    Rank: {student.rank || "Pending"}
  </div>
</div>
    </main>
  );
}