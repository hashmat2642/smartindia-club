// app/admin/students/page.tsx
import DeleteStudentButton from "@/components/DeleteStudentButton";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default async function AdminStudentsPage() {
  const { data: students } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

  const totalStudents = students?.length || 0;

  const paidStudents =
    students?.filter(
      (s) => s.payment_status === "Paid"
    ).length || 0;

  const pendingStudents = totalStudents - paidStudents;

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
          <StatCard title="Total Students" value={String(totalStudents)} />
          <StatCard title="Paid Students" value={String(paidStudents)} />
          <StatCard title="Pending Payments" value={String(pendingStudents)} />
          <StatCard title="Target" value="140 Students" />
        </div>

        <div className="mt-10 overflow-x-auto rounded-3xl bg-slate-900 shadow-xl">
          <table className="w-full text-left">
            <thead className="bg-slate-800">
              <tr>
                <th className="p-4">Delete</th>
                <th className="p-4">Edit</th>
                <th className="p-4">Certificate</th>
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
              {students?.map((student) => (
                <tr key={student.id} className="border-t border-slate-800 hover:bg-slate-800/40 transition-colors">
                  {/* FIX: Nested td elements unwrapped into cleanly aligned separate header table cells */}
                  <td className="p-4">
                    <DeleteStudentButton studentId={student.id} />
                  </td>
                  
                  <td className="p-4">
                    <Link
                      href={`/admin/students/edit/${student.id}`}
                      className="font-bold text-blue-400 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/certificate/${student.certificate_id}`}
                      className="font-bold text-green-400 hover:underline"
                    >
                      View
                    </Link>
                  </td>

                  <td className="p-4 font-bold text-slate-200">
                    {student.student_id}
                  </td>
                  <td className="p-4">{student.name}</td>
                  <td className="p-4 text-slate-300">{student.class_name}</td>
                  <td className="p-4 text-slate-300">{student.school_name}</td>
                  <td className="p-4 text-slate-300">{student.phone_number}</td>
                  
                  <td
                    className={`p-4 font-bold ${
                      student.payment_status === "Paid"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {student.payment_status || "Pending"}
                  </td>
                  <td className="p-4 text-slate-400">{student.status || "Registered"}</td>
                </tr>
              ))}
              
              {students?.length === 0 && (
                <tr>
                  <td colSpan={10} className="p-12 text-center text-slate-500">
                    No registered students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-900 p-5 border border-slate-800/40">
      <p className="text-sm text-slate-400">{title}</p>
      <h2 className="mt-2 text-2xl font-bold text-green-400">{value}</h2>
    </div>
  );
}