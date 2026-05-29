import Link from "next/link";

export default function TournamentPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          First Month Main Event
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          First Educational Skill Tournament
        </h1>

        <p className="mt-4 max-w-3xl text-slate-300">
          This tournament is designed to help students improve their logic,
          coding basics, quiz ability, confidence, and healthy competitive
          mindset.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-900 p-6">
            <h2 className="text-xl font-bold">Target</h2>
            <p className="mt-2 text-slate-300">140 Students</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <h2 className="text-xl font-bold">Fee</h2>
            <p className="mt-2 text-slate-300">₹50 Registration</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <h2 className="text-xl font-bold">Format</h2>
            <p className="mt-2 text-slate-300">Quiz + Logic + Coding</p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-slate-900 p-8">
          <h2 className="text-2xl font-bold">Tournament Rules</h2>

          <ul className="mt-5 space-y-3 text-slate-300">
            <li>• Students must register with correct details.</li>
            <li>• Each student can participate only once.</li>
            <li>• Questions will be based on quiz, logic, and coding basics.</li>
            <li>• Results will be calculated based on score and time.</li>
            <li>• Certificates will be provided after completion.</li>
            <li>• Top students will be selected class-wise.</li>
          </ul>
        </div>

        <div className="mt-10 rounded-3xl bg-slate-900 p-8">
          <h2 className="text-2xl font-bold">Why Join?</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <p className="rounded-xl bg-slate-800 p-4">
              Improve logical thinking
            </p>
            <p className="rounded-xl bg-slate-800 p-4">
              Build coding confidence
            </p>
            <p className="rounded-xl bg-slate-800 p-4">
              Get participation certificate
            </p>
            <p className="rounded-xl bg-slate-800 p-4">
              Compete in a healthy environment
            </p>
          </div>
        </div>

        <Link
          href="/register"
          className="mt-10 inline-block rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 hover:bg-green-400"
        >
          Register for Tournament
        </Link>
      </section>
    </main>
  );
}