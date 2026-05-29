import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-4xl font-bold">Student Dashboard</h1>
        <p className="mt-3 text-slate-300">
          Track your tournament, progress, certificates and skill growth.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Student ID</p>
            <h2 className="mt-2 text-2xl font-bold">HDC-001</h2>
          </div>

          <div className="rounded-2xl bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Current Rank</p>
            <h2 className="mt-2 text-2xl font-bold">Not Started</h2>
          </div>

          <div className="rounded-2xl bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Skill Level</p>
            <h2 className="mt-2 text-2xl font-bold">Beginner</h2>
          </div>

          <div className="rounded-2xl bg-slate-900 p-5">
            <p className="text-sm text-slate-400">Certificate</p>
            <h2 className="mt-2 text-2xl font-bold">Pending</h2>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-slate-900 p-8">
          <h2 className="text-2xl font-bold">Your Skill Progress</h2>

          <div className="mt-6 space-y-5">
            <SkillBar title="Quiz" percent={20} />
            <SkillBar title="Logic" percent={15} />
            <SkillBar title="Coding Basics" percent={10} />
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-slate-900 p-8">
          <h2 className="text-2xl font-bold">Current Tournament</h2>
          <p className="mt-3 text-slate-300">
            First Educational Skill Tournament: Quiz + Logic + Coding Basics.
          </p>

         <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
  href="/certificate"
  className="rounded-xl border border-yellow-500 px-6 py-3 font-bold text-yellow-400 hover:bg-slate-800"
>
  Certificates
</Link>
            <Link
  href="/practice"
  className="rounded-xl border border-green-500 px-6 py-3 font-bold text-green-400 hover:bg-slate-800"
>
  Practice Lab
</Link>
  <Link
    href="/dashboard"
    className="rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 hover:bg-green-400"
  >
    Go to Dashboard
  </Link>

  <Link
    href="/"
    className="rounded-xl border border-slate-600 px-6 py-3 font-bold text-white hover:bg-slate-800"
  >
    Back to Home
  </Link>
</div>
        </div>
      </section>
    </main>
  );
}

function SkillBar({ title, percent }: { title: string; percent: number }) {
  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span>{title}</span>
        <span>{percent}%</span>
      </div>

      <div className="h-3 rounded-full bg-slate-800">
        <div
          className="h-3 rounded-full bg-green-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}