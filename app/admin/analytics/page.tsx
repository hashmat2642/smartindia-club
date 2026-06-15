// app/admin/analytics/page.tsx
import { supabase } from "@/lib/supabase";

// Structural Sub-component for Dashboard Metric Cards
function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-slate-900 p-6 border border-slate-800/60 hover:border-slate-700/50 transition-all duration-200 shadow-lg">
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <h2 className="mt-2 text-3xl font-bold text-green-400 tracking-tight">
        {value}
      </h2>
    </div>
  );
}

export default async function AnalyticsPage() {
  // Real-time Database Select Operations Fetching
  const { data: students } = await supabase
    .from("students")
    .select("*");

  const totalStudents = students?.length || 0;

  const paidStudents =
    students?.filter(
      (s) => s.payment_status === "Paid"
    ).length || 0;

  const pendingStudents = totalStudents - paidStudents;

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

  // Optimized sorting logic array check
  const topStudent = students
    ?.filter((s) => s.score !== null && s.score !== undefined)
    .sort((a, b) => (b.score || 0) - (a.score || 0))[0];

  // Unique validation mapping filter to avoid empty string count errors
  const validSchoolsList = (students ?? [])
    .map((s) => s.school_name?.trim())
    .filter((name) => name && name !== "");

  const totalSchools = new Set(validSchoolsList).size;

  const schoolCount: Record<string, number> = {};
  validSchoolsList.forEach((school) => {
    schoolCount[school] = (schoolCount[school] || 0) + 1;
  });

  const topSchool = Object.entries(schoolCount).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        
        {/* Dashboard Title Header Section */}
        <div className="mb-10">
          <p className="text-sm font-semibold text-green-400 uppercase tracking-wider">
            Admin Controls
          </p>
          <h1 className="mt-2 text-4xl font-extrabold md:text-5xl tracking-tight">
            Analytics Dashboard
          </h1>
        </div>

        {/* FIX: 8 Cards Grid System Balanced properly onto md:grid-cols-4 layout */}
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          <Card title="Total Schools" value={String(totalSchools)} />
          <Card title="Top School" value={topSchool?.[0] || "N/A"} />
          <Card title="Total Students" value={String(totalStudents)} />
          <Card title="Paid Students" value={String(paidStudents)} />
          <Card title="Pending Payments" value={String(pendingStudents)} />
          <Card title="Average Score" value={`${averageScore}/100`} />
          <Card title="Total Collection" value={`₹${collection}`} />
          <Card title="Top Score" value={`${topStudent?.score || 0}/100`} />
        </div>

        {/* Standout Highlights Section: Current Top Performer Showcase */}
        <div className="mt-10 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-900/40 p-8 border border-slate-800/80 shadow-2xl relative overflow-hidden">
          <div className="absolute right-6 top-6 opacity-10 text-7xl select-none" role="img" aria-label="trophy">
            🏆
          </div>

          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Current Top Performer
          </p>

          <h2 className="mt-3 text-4xl font-black text-yellow-400 tracking-wide">
            {topStudent?.name || "No Results Yet"}
          </h2>

          <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-300">
            <p>
              <span className="text-slate-500 font-medium">Class:</span>{" "}
              <span className="font-bold text-white">{topStudent?.class_name || "N/A"}</span>
            </p>
            <p>
              <span className="text-slate-500 font-medium">School:</span>{" "}
              <span className="font-bold text-white">{topStudent?.school_name || "N/A"}</span>
            </p>
            <p>
              <span className="text-slate-500 font-medium">Verified Score:</span>{" "}
              <span className="font-bold text-green-400">{topStudent?.score || 0} Points</span>
            </p>
          </div>
        </div>

      </section>
    </main>
  );
}