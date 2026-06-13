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

     <div className="mt-8 grid gap-5 md:grid-cols-2">

  <div className="rounded-2xl bg-slate-900 p-5">
    <p className="text-slate-400">Student ID</p>
    <h2 className="text-xl font-bold">
      {student.student_id}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-900 p-5">
    <p className="text-slate-400">Class</p>
    <h2 className="text-xl font-bold">
      {student.class_name}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-900 p-5">
    <p className="text-slate-400">School</p>
    <h2 className="text-xl font-bold">
      {student.school_name}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-900 p-5">
    <p className="text-slate-400">Payment Status</p>
    <h2 className="text-xl font-bold text-green-400">
      {student.payment_status || "Pending"}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-900 p-5">
    <p className="text-slate-400">Score</p>
    <h2 className="text-xl font-bold text-green-400">
      {student.score ?? 0}
    </h2>
  </div>

  <div className="rounded-2xl bg-slate-900 p-5">
    <p className="text-slate-400">Rank</p>
    <h2 className="text-xl font-bold text-yellow-400">
      {student.rank || "Pending"}
    </h2>
  </div>

</div>

<div className="mt-8 rounded-3xl bg-slate-900 p-6">
  <h2 className="text-2xl font-bold">
    Achievement Badge
  </h2>

  <div className="mt-4 inline-block rounded-full bg-yellow-500 px-6 py-3 font-bold text-black">
    🏆 SmartIndia Participant
  </div>
</div>
    </main>
  );
}