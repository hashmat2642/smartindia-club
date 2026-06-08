import { supabase } from "@/lib/supabase";

export default async function AnalyticsPage() {
  const { data: students } = await supabase
    .from("students")
    .select("*");

  const totalStudents = students?.length || 0;

  const paidStudents =
    students?.filter(
      (s) => s.payment_status === "Paid"
    ).length || 0;

  const pendingStudents =
    totalStudents - paidStudents;

 const averageScore =
  totalStudents > 0
    ? Math.round(
        (students ?? []).reduce(
          (sum, s) => sum + (s.score || 0),
          0
        ) / totalStudents
      )
    : 0;

    const collection = paidStudents * 50;

const topStudent =
  students
    ?.filter((s) => s.score)
    .sort((a, b) => (b.score || 0) - (a.score || 0))[0];

    const totalSchools = new Set(
  (students ?? []).map((s) => s.school_name)
).size;

const schoolCount: Record<string, number> = {};

(students ?? []).forEach((student) => {
  const school = student.school_name || "Unknown";

  schoolCount[school] =
    (schoolCount[school] || 0) + 1;
});

const topSchool =
  Object.entries(schoolCount).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Analytics Dashboard
        </h1>

        <div className="mt-10 grid gap-5 md:grid-cols-6">

          <Card
  title="Total Schools"
  value={String(totalSchools)}
/>

<Card
  title="Top School"
  value={topSchool?.[0] || "N/A"}
/>
         <Card title="Total Students" value={String(totalStudents)} />
<Card title="Paid Students" value={String(paidStudents)} />
<Card title="Pending Payments" value={String(pendingStudents)} />
<Card title="Average Score" value={`${averageScore}/100`} />
<Card title="Collection" value={`₹${collection}`} />
<Card
  title="Top Score"
  value={String(topStudent?.score || 0)}
/>
        </div>

        <div className="mt-8 rounded-2xl bg-slate-900 p-6">
  <p className="text-slate-400">
    Current Top Performer
  </p>

  <h2 className="mt-2 text-3xl font-bold text-yellow-400">
    {topStudent?.name || "No Results Yet"}
  </h2>

  <p className="mt-2 text-slate-300">
    Score: {topStudent?.score || 0}
  </p>
</div>

      </section>
    </main>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-900 p-6">
      <p className="text-slate-400">{title}</p>

      <h2 className="mt-2 text-3xl font-bold text-green-400">
        {value}
      </h2>
    </div>
  );
}