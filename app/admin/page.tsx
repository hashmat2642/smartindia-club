import Link from "next/link";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default async function AdminPage() {
  const { data: students, error } = await supabase
    .from("students")
    .select("*")
    .order("created_at", { ascending: false });

const totalStudents = students?.length || 0;

const paidStudents =
  students?.filter(
    (student) => student.payment_status === "Paid"
  ).length || 0;

const collection = paidStudents * 50;
const pendingStudents = totalStudents - paidStudents;

const topStudent =
  students?.length
    ? [...students]
        .filter((s) => s.score)
        .sort((a, b) => (b.score || 0) - (a.score || 0))[0]
    : null;

  if (error) {
    return (
      <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
        <h1 className="text-4xl font-bold">Admin Error</h1>
        <p className="mt-4 text-red-400">{error.message}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          SmartIndia.club Admin Panel
        </p>

       <h1 className="mt-2 text-5xl font-bold">
  Tournament Management Dashboard
</h1>

<form
  action={async (formData) => {
    "use server";

    const search = formData
      .get("search")
      ?.toString()
      .trim();

    if (search) {
      redirect(`/student/${search}`);
    }
  }}
  className="mt-6 flex gap-3"
>
  <input
    type="text"
    name="search"
    placeholder="Enter Student ID"
    className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white"
  />

  <button
    type="submit"
    className="rounded-xl bg-green-500 px-6 py-3 font-bold text-black"
  >
    Search
  </button>
</form>

        <p className="mt-4 max-w-3xl text-slate-300">
          Manage real student registrations, payment status, tournaments,
          results and certificates.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-5">
          <StatCard title="Target Students" value="140" />
          <StatCard title="Registered" value={String(totalStudents)} />
          <StatCard title="Paid Students" value={String(paidStudents)} />
          <StatCard title="Collection" value={`₹${collection}`} />
          <StatCard title="Pending Payments" value={String(pendingStudents)} />
        </div>

        <div className="mt-6 rounded-2xl bg-slate-900 p-5">
  <p className="text-sm text-slate-400">
    Current Top Performer
  </p>

  <h2 className="mt-2 text-2xl font-bold text-yellow-400">
    {topStudent?.name || "No Results Yet"}
  </h2>

  <p className="text-slate-300">
    Score: {topStudent?.score || 0}
  </p>
</div>

        <div className="mt-10 rounded-3xl bg-slate-900 p-6">

          <h2 className="text-2xl font-bold">Recent Registrations</h2>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-800">
                <tr>
                  <th className="p-4">Student ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Class</th>
                  <th className="p-4">School</th>
                  <th className="p-4">Score</th>
                  <th className="p-4">Rank</th>
                  <th className="p-4">Certificate</th>
                </tr>
              </thead>

              <tbody>
                {students?.map((student) => (
                  <tr key={student.id} className="border-t border-slate-800">
                    <td className="p-4 font-bold">
                      {student.student_id}
                    </td>

                    <td className="p-4">{student.name}</td>

                    <td className="p-4">{student.class_name}</td>

                    <td className="p-4">{student.school_name}</td>

                    <td className="p-4 text-green-400">
                      {student.score ?? 0}
                    </td>

                    <td className="p-4 text-yellow-400">
                      {student.rank || "Pending"}
                    </td>

                    <td className="p-4">
                      <Link
                        href={`/certificate/${student.certificate_id}`}
                        className="font-bold text-green-400 hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}

                {students?.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="p-6 text-center text-slate-400"
                    >
                      No registrations found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <AdminAction
  title="Announcement Management"
  href="/admin/announcements"
/>



          <AdminAction
  title="Tournament Settings"
  href="/admin/tournaments"
/> 

          <AdminAction
  title="Export Students"
  href="/admin/export"
/>

          <AdminAction
  title="Analytics Dashboard"
  href="/admin/analytics"
/>

<AdminAction
  title="Payments Management"
  href="/admin/payments"
/>
          
          <AdminAction title="Add Questions" href="/admin/questions" />
          <AdminAction title="Students Management" href="/admin/students" />
          <AdminAction title="Results Management" href="/admin/results" />
          <AdminAction
            title="Generate Certificates"
            href="/admin/certificates"
          />
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