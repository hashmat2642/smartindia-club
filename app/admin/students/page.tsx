export default function AdminStudentsPage() {
  const students = [
    {
      id: "HDC-001",
      name: "Student A",
      className: "Class 8",
      school: "Demo School",
      phone: "98XXXXXX01",
      payment: "Paid",
      status: "Registered",
    },
    {
      id: "HDC-002",
      name: "Student B",
      className: "Class 7",
      school: "Demo School",
      phone: "98XXXXXX02",
      payment: "Pending",
      status: "Waiting",
    },
    {
      id: "HDC-003",
      name: "Student C",
      className: "Class 9",
      school: "Demo School",
      phone: "98XXXXXX03",
      payment: "Paid",
      status: "Registered",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          Admin Panel
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Students Management
        </h1>

        <p className="mt-3 text-slate-300">
          View registered students, payment status, tournament status and
          participation details.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <StatCard title="Total Students" value="3 Demo" />
          <StatCard title="Paid Students" value="2 Demo" />
          <StatCard title="Pending Payments" value="1 Demo" />
          <StatCard title="Target" value="140 Students" />
        </div>

        <div className="mt-10 overflow-x-auto rounded-3xl bg-slate-900 shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4">Student ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Class</th>
                <th className="p-4">School</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-t border-slate-800">
                  <td className="p-4 font-bold">{student.id}</td>
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.className}</td>
                  <td className="p-4">{student.school}</td>
                  <td className="p-4">{student.phone}</td>
                  <td
                    className={`p-4 font-bold ${
                      student.payment === "Paid"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {student.payment}
                  </td>
                  <td className="p-4">{student.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
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