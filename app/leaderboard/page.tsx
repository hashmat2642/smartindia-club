// app/leaderboard/page.tsx
import { supabase } from "@/lib/supabase";

export default async function LeaderboardPage() {
  const { data: students, error } = await supabase
    .from("students")
    .select("*")
    .order("score", { ascending: false });

  if (error) {
    console.error("Error fetching leaderboard:", error);
  }

  const allStudents = students || [];
  const topThree = allStudents.slice(0, 3);
  const topPerformer = allStudents[0];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          Tournament Results
        </p>

        <h1 className="mt-2 text-5xl font-bold tracking-tight">
          Live Leaderboard
        </h1>
        <p className="mt-3 text-xl text-slate-300">
          Real-time ranking based on student scores.
        </p>

        {/* Current Champion */}
        {topPerformer && (
          <div className="mt-10 rounded-3xl bg-gradient-to-r from-yellow-500 to-orange-500 p-10 text-center text-black shadow-2xl">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-4xl font-extrabold">Current Champion</h2>
            <p className="mt-4 text-4xl font-bold">{topPerformer.name}</p>
            <p className="mt-2 text-2xl font-bold">
              Score: {topPerformer.score ?? 0}/100
            </p>
          </div>
        )}

        {/* Top 3 Podium */}
        {topThree.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-center text-3xl font-bold">Top Performers</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {topThree.map((student, index) => (
                <div
                  key={student.id}
                  className="rounded-3xl bg-slate-900 p-8 text-center transition-transform hover:scale-105"
                >
                  <div className="text-6xl mb-4">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                  </div>

                  <h3 className="text-2xl font-bold">{student.name}</h3>
                  <p className="text-slate-400 mt-1">{student.school_name}</p>

                  <p className="mt-6 text-3xl font-bold text-green-400">
                    {student.score ?? 0}/100
                  </p>
                  <p className="text-yellow-400 mt-2">Rank #{index + 1}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 grid gap-6 md:grid-cols-4">
          <StatCard title="Total Participants" value={String(allStudents.length)} />
          <StatCard
            title="Highest Score"
            value={`${topPerformer?.score ?? 0}/100`}
          />
          <StatCard
            title="Top Performer"
            value={topPerformer?.name || "N/A"}
          />
          <StatCard title="Certificates" value="Available" />
        </div>

        {/* Full Leaderboard Table */}
        <div className="mt-12 overflow-x-auto rounded-3xl bg-slate-900 shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-slate-800 sticky top-0">
              <tr>
                <th className="p-5 font-semibold">Rank</th>
                <th className="p-5 font-semibold">Student</th>
                <th className="p-5 font-semibold">Class</th>
                <th className="p-5 font-semibold">School</th>
                <th className="p-5 font-semibold">Score</th>
                <th className="p-5 font-semibold">Performance</th>
              </tr>
            </thead>
            <tbody>
              {allStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className="border-t border-slate-800 hover:bg-slate-800/70 transition-colors"
                >
                  <td className="p-5 font-bold text-lg">#{index + 1}</td>
                  <td className="p-5 font-medium">{student.name}</td>
                  <td className="p-5 text-slate-400">{student.class_name}</td>
                  <td className="p-5 text-slate-400">{student.school_name}</td>
                  <td className="p-5 font-bold text-green-400">
                    {student.score ?? 0}/100
                  </td>
                  <td className="p-5">
                    {student.performance === "Gold Performer" && (
                      <span className="text-yellow-400 font-semibold">🥇 Gold Performer</span>
                    )}
                    {student.performance === "Silver Performer" && (
                      <span className="text-gray-300 font-semibold">🥈 Silver Performer</span>
                    )}
                    {student.performance === "Bronze Performer" && (
                      <span className="text-orange-400 font-semibold">🥉 Bronze Performer</span>
                    )}
                    {!student.performance && (
                      <span className="text-slate-500">Participant</span>
                    )}
                  </td>
                </tr>
              ))}

              {allStudents.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-16 text-center text-slate-400">
                    No results available yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Ranking Rules */}
        <div className="mt-10 rounded-3xl bg-slate-900 p-8">
          <h2 className="text-2xl font-bold mb-3">Ranking Rules</h2>
          <p className="text-slate-300 leading-relaxed">
            Students are automatically ranked according to their score. Higher score = higher rank.
            Performance badges (Gold/Silver/Bronze) are awarded based on predefined thresholds.
          </p>
        </div>
      </section>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-900 p-6 text-center">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}