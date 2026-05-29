import Link from "next/link";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          Student Profile
        </p>

        <h1 className="mt-2 text-4xl font-bold">My Learning Profile</h1>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Student Info</h2>
            <p className="mt-4 text-slate-300"><strong>ID:</strong> HDC-001</p>
            <p className="mt-2 text-slate-300"><strong>Name:</strong> Student Name</p>
            <p className="mt-2 text-slate-300"><strong>Class:</strong> Class 8</p>
            <p className="mt-2 text-slate-300"><strong>School:</strong> Demo School</p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Skill Level</h2>
            <p className="mt-4 text-4xl font-bold text-green-400">Beginner</p>
            <p className="mt-3 text-slate-300">
              Keep practicing to improve your level.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">Certificates</h2>
            <p className="mt-4 text-slate-300">Participation Certificate: Pending</p>
            <p className="mt-2 text-slate-300">Winner Certificate: Not Yet</p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-slate-900 p-8">
          <h2 className="text-2xl font-bold">Skill Progress</h2>

          <div className="mt-6 space-y-5">
            <SkillBar title="Quiz" percent={20} />
            <SkillBar title="Logic" percent={15} />
            <SkillBar title="Coding Basics" percent={10} />
          </div>
        </div>

        <div className="mt-8 rounded-3xl bg-slate-900 p-8">
          <h2 className="text-2xl font-bold">Participation History</h2>

          <div className="mt-5 rounded-2xl bg-slate-800 p-5">
            <p className="font-bold">First Educational Skill Tournament</p>
            <p className="mt-2 text-slate-300">
              Status: Registered / Result Pending
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/dashboard"
            className="rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 hover:bg-green-400"
          >
            Back to Dashboard
          </Link>

          <Link
            href="/certificate"
            className="rounded-xl border border-yellow-500 px-6 py-3 font-bold text-yellow-400 hover:bg-slate-800"
          >
            View Certificates
          </Link>
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