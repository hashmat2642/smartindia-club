import Link from "next/link";

export default function AdminPage() {
  const students = [
    {
      id: "SIC-2026-001",
      name: "Aarav Sharma",
      className: "Class 8",
      school: "Demo School",
      payment: "Paid",
    },
    {
      id: "SIC-2026-002",
      name: "Zoya Khan",
      className: "Class 7",
      school: "Demo School",
      payment: "Pending",
    },
    {
      id: "SIC-2026-003",
      name: "Rohan Patil",
      className: "Class 9",
      school: "Demo School",
      payment: "Paid",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          SmartIndia.club Admin Panel
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          Tournament Management Dashboard
        </h1>

        <p className="mt-4 max-w-3xl text-slate-300">
          Manage student registrations, payment status, tournaments, questions,
          results, certificates and platform announcements.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <StatCard title="Target Students" value="140" />
          <StatCard title="Registered" value="3 Demo" />
          <StatCard title="Paid Students" value="2 Demo" />
          <StatCard title="Collection" value="₹100 Demo" />
        </div>

        <div className="mt-10 rounded-3xl bg-slate-900 p-6">
          <h2 className="text-2xl font-bold">
            Recent Registrations
          </h2>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-4">Student ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Class</th>
                  <th className="p-4">School</th>
                  <th className="p-4">Payment</th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="border-t border-slate-800">
                    <td className="p-4 font-bold">{student.id}</td>
                    <td className="p-4">{student.name}</td>
                    <td className="p-4">{student.className}</td>
                    <td className="p-4">{student.school}</td>
                    <td
                      className={`p-4 font-bold ${
                        student.payment === "Paid"
                          ? "text-green-400"
                          : "text-yellow-400"
                      }`}
                    >
                      {student.payment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <AdminAction title="Create Tournament" href="/admin/tournaments" />
          <AdminAction title="Add Questions" href="/admin/questions" />
          <AdminAction title="Students Management" href="/admin/students" />
          <AdminAction title="Results Management" href="/admin/results" />
          <AdminAction title="Generate Certificates" href="/admin/certificates" />
          <AdminAction title="Announcements" href="/announcements" />
        </div>
      </section>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-900 p-5">
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className="mt-2 text-2xl font-bold text-green-400">{value}</h2>
    </div>
  );
}

function AdminAction({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl bg-slate-900 p-5 text-left font-bold hover:bg-slate-800"
    >
      {title}
    </Link>
  );
}