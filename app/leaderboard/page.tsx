// app/leaderboard/page.tsx
import { supabase } from "@/lib/supabase";

export default async function LeaderboardPage() {
  const { data: students, error } = await supabase
    .from("students")
    .select("*")
    .order("score", { ascending: false });

  // Handle error or no data
  if (error) {
    console.error("Error fetching leaderboard:", error);
  }

  const topThree = students?.slice(0, 3) || [];
  const allStudents = students || [];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          Tournament Results
        </p>

        <h1 className="mt-2 text-4xl font-bold">Live Leaderboard</h1>
        <p className="mt-3 text-slate-300">
          Real-time ranking based on student scores.
        </p>

        {/* Top 3 Podium */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {topThree.map((student, index) => (
            <div
              key={student.id}
              className="rounded-3xl bg-slate-900 p-6 text-center"
            >
              <div className="text-5xl">
                {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
              </div>

              <h2 className="mt-4 text-2xl font-bold">{student.name}</h2>
              <p className="text-slate-400">{student.school_name}</p>

              <p className="mt-3 text-xl font-bold text-green-400">
                {student.score ?? 0}/100
              </p>

              <p className="mt-2 text-yellow-400">Rank #{index + 1}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <StatCard
            title="Total Participants"
            value={String(allStudents.length)}
          />
          <StatCard title="Evaluation" value="Score Based" />
          <StatCard title="Certificates" value="Available" />
          <StatCard title="Leaderboard" value="Live" />
        </div>

        {/* Full Leaderboard Table */}
        <div className="mt-10 overflow-x-auto rounded-3xl bg-slate-900 shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Student</th>
                <th className="p-4">Class</th>
                <th className="p-4">School</th>
                <th className="p-4">Score</th>
                <th className="p-4">Performance</th>
              </tr>
            </thead>
            <tbody>
              {allStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className="border-t border-slate-800 hover:bg-slate-800/50"
                >
                  <td className="p-4 font-bold">#{index + 1}</td>
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.class_name}</td>
                  <td className="p-4">{student.school_name}</td>
                  <td className="p-4 font-bold text-green-400">
                    {student.score ?? 0}/100
                  </td>
                 <td className="p-4 font-bold">
  {student.performance === "Gold Performer" && (
    <span className="text-yellow-400">
      🥇 Gold Performer
    </span>
  )}

  {student.performance === "Silver Performer" && (
    <span className="text-gray-300">
      🥈 Silver Performer
    </span>
  )}

  {student.performance === "Bronze Performer" && (
    <span className="text-orange-400">
      🥉 Bronze Performer
    </span>
  )}

  {!student.performance && (
    <span className="text-slate-400">
      Participant
    </span>
  )}
</td>
                </tr>
              ))}

              {allStudents.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-6 text-center text-slate-400"
                  >
                    No results available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-8 rounded-3xl bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Ranking Rule</h2>
          <p className="mt-3 text-slate-300">
            Students are automatically ranked according to their score. Higher
            score means higher rank.
          </p>
        </div>
      </section>
    </main>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-900 p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className="mt-2 text-2xl font-bold">{value}</h2>
    </div>
  );
}