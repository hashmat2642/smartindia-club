// app/student/[id]/page.tsx
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function StudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Optimized Database Query: Har baar saara data nikalne ki jagah filter query lagayi hai
  const { data: students, error } = await supabase
    .from("students")
    .select("*")
    .or(`student_id.eq.${id},name.ilike.%${id}%,phone_number.like.%${id}%`);

  if (error) {
    console.error("Error fetching student:", error);
  }

  // Best match object validation check
  const student = students?.find(
    (s) =>
      s.student_id?.toLowerCase() === id.toLowerCase() ||
      s.id?.toString() === id || 
      s.phone_number?.includes(id)
  );

  if (!student) {
    notFound();
  }

  const score = student.score ?? 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <p className="text-green-400 font-semibold">Student Profile</p>
          <h1 className="mt-2 text-5xl font-bold tracking-tight">
            {student.name}
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            ID: {student.student_id}
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-900 p-8">
            <p className="text-slate-400 text-sm">Class</p>
            <p className="text-3xl font-bold mt-2">{student.class_name}</p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-8">
            <p className="text-slate-400 text-sm">School</p>
            <p className="text-3xl font-bold mt-2">{student.school_name}</p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-8">
            <p className="text-slate-400 text-sm">Score</p>
            <p className="text-4xl font-bold text-green-400 mt-2">
              {score}/100
            </p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-8">
            <p className="text-slate-400 text-sm">Payment Status</p>
            <p className={`text-3xl font-bold mt-2 ${
              student.payment_status?.toLowerCase() === "paid" 
                ? "text-green-400" 
                : "text-yellow-400"
            }`}>
              {student.payment_status || "Pending"}
            </p>
          </div>
        </div>

        {/* Achievement Section - Admin Portal Rules ke sath match kiya gaya hai */}
        <div className="mt-12 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 border border-slate-700">
          <h2 className="text-2xl font-bold mb-6">Achievement Badge</h2>
          
          <div className="flex flex-wrap gap-4">
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-800 px-6 py-3 text-slate-300 border border-slate-700">
              ✨ SmartIndia Participant
            </div>

            {score >= 90 && (
              <div className="inline-flex items-center gap-3 rounded-full bg-yellow-500/10 px-6 py-3 text-yellow-400 border border-yellow-500/30">
                🥇 Gold Performer
              </div>
            )}

            {score >= 75 && score < 90 && (
              <div className="inline-flex items-center gap-3 rounded-full bg-gray-500/10 px-6 py-3 text-gray-300 border border-gray-500/30">
                🥈 Silver Performer
              </div>
            )}

            {score >= 60 && score < 75 && (
              <div className="inline-flex items-center gap-3 rounded-full bg-orange-500/10 px-6 py-3 text-orange-400 border border-orange-500/30">
                🥉 Bronze Performer
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 text-center text-slate-500 text-sm">
          Tournament Date: 31 May 2026
        </div>
      </section>
    </main>
  );
}