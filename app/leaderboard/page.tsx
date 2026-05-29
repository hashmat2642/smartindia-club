export default function LeaderboardPage() {
  const students = [
    {
      rank: 1,
      name: "Aarav Sharma",
      className: "Class 8",
      school: "Demo School",
      score: 95,
      status: "Top Performer",
    },
    {
      rank: 2,
      name: "Zoya Khan",
      className: "Class 7",
      school: "Demo School",
      score: 90,
      status: "Top Performer",
    },
    {
      rank: 3,
      name: "Rohan Patil",
      className: "Class 9",
      school: "Demo School",
      score: 86,
      status: "Top Performer",
    },
    {
      rank: 4,
      name: "Sara Shaikh",
      className: "Class 6",
      school: "Demo School",
      score: 82,
      status: "Selected",
    },
    {
      rank: 5,
      name: "Kabir Ansari",
      className: "Class 10",
      school: "Demo School",
      score: 78,
      status: "Selected",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          Tournament Results
        </p>

        <h1 className="mt-2 text-4xl font-bold">Leaderboard</h1>

        <p className="mt-3 text-slate-300">
          Students are ranked based on score, accuracy and completion time.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <StatCard title="Total Participants" value="140 Target" />
          <StatCard title="Top Selection" value="Top 5/Class" />
          <StatCard title="Evaluation" value="Score + Time" />
          <StatCard title="Certificate" value="Available" />
        </div>

        <div className="mt-10 overflow-x-auto rounded-3xl bg-slate-900 shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4">Rank</th>
                <th className="p-4">Student</th>
                <th className="p-4">Class</th>
                <th className="p-4">School</th>
                <th className="p-4">Score</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.rank} className="border-t border-slate-800">
                  <td className="p-4 font-bold">#{student.rank}</td>
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.className}</td>
                  <td className="p-4">{student.school}</td>
                  <td className="p-4 font-bold text-green-400">
                    {student.score}/100
                  </td>
                  <td className="p-4 font-bold text-yellow-400">
                    {student.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 rounded-3xl bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">Selection Rule</h2>
          <p className="mt-3 text-slate-300">
            From each school, the top 5 winners will be selected from every
            class based on score, accuracy and completion time.
          </p>
        </div>
      </section>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-900 p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className="mt-2 text-2xl font-bold">{value}</h2>
    </div>
  );
}