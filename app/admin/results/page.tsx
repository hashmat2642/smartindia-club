import ResultUpdateForm from "@/components/ResultUpdateForm";
import { supabase } from "@/lib/supabase";

export default async function ResultsPage() {
  const { data: students } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Results Management
        </h1>

        <p className="mt-3 text-slate-300">
          Manage scores, ranks and performance levels.
        </p>

        <div className="mt-10 overflow-x-auto rounded-3xl bg-slate-900 p-6">
          <table className="w-full text-left">
           <thead className="bg-slate-800">
  <tr>
    <th className="p-4">Student</th>
    <th className="p-4">Class</th>
    <th className="p-4">Score</th>
    <th className="p-4">Rank</th>
    <th className="p-4">Performance</th>
    <th className="p-4">Update Result</th>
  </tr>
</thead>

            <tbody>
              {students?.map((student) => (
                <tr
                  key={student.id}
                  className="border-t border-slate-800"
                >
                  <td className="p-4">{student.name}</td>

                  <td className="p-4">
                    {student.class_name}
                  </td>

                  <td className="p-4 text-green-400">
                    {student.score ?? 0}
                  </td>

                  <td className="p-4 text-yellow-400">
                    {student.rank || "Pending"}
                  </td>

                  <td className="p-4">
                    {student.performance || "Pending"}
                  </td>

                  <td className="p-4">
  <ResultUpdateForm
    studentId={student.id}
    currentScore={student.score ?? 0}
    currentRank={student.rank || "Pending"}
    currentPerformance={student.performance || "Pending"}
  />
</td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}