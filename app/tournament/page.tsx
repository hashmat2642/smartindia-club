// app/tournament/page.tsx
import Link from "next/link";

export default function TournamentPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        
        <p className="text-sm font-semibold text-green-400">
          First Month Main Event
        </p>

        <h1 className="mt-2 text-5xl font-bold tracking-tight">
          First Educational Skill Tournament
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-slate-300">
          This tournament is designed to help students improve their logic, 
          coding basics, quiz ability, confidence, and healthy competitive mindset.
        </p>

        {/* Info Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl bg-slate-900 p-6">
            <h3 className="text-xl font-bold text-green-400">Target</h3>
            <p className="mt-3 text-3xl font-bold">140 Students</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <h3 className="text-xl font-bold text-green-400">Fee</h3>
            <p className="mt-3 text-3xl font-bold">₹50</p>
            <p className="text-sm text-slate-400">Registration Fee</p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <h3 className="text-xl font-bold text-green-400">Status</h3>
            <p className="mt-3 text-3xl font-bold text-green-400">
              Live Registration
            </p>
          </div>

          <div className="rounded-2xl bg-slate-900 p-6">
            <h3 className="text-xl font-bold text-green-400">Format</h3>
            <p className="mt-3 text-xl font-medium">Quiz + Logic + Coding</p>
          </div>
        </div>

        {/* Tournament Rules */}
        <div className="mt-16 rounded-3xl bg-slate-900 p-8">
          <h2 className="text-3xl font-bold mb-6">Tournament Rules</h2>
          <ul className="space-y-4 text-slate-300 text-lg">
            <li className="flex gap-3">
              <span className="text-green-400 mt-1">•</span>
              Students must register with correct details.
            </li>
            <li className="flex gap-3">
              <span className="text-green-400 mt-1">•</span>
              Each student can participate only once.
            </li>
            <li className="flex gap-3">
              <span className="text-green-400 mt-1">•</span>
              Questions will be based on quiz, logic, and coding basics.
            </li>
            <li className="flex gap-3">
              <span className="text-green-400 mt-1">•</span>
              Results will be calculated based on score and time.
            </li>
            <li className="flex gap-3">
              <span className="text-green-400 mt-1">•</span>
              Certificates will be provided to all participants.
            </li>
            <li className="flex gap-3">
              <span className="text-green-400 mt-1">•</span>
              Top students will be selected class-wise.
            </li>
          </ul>
        </div>

        {/* Rewards */}
        <div className="mt-16 rounded-3xl bg-slate-900 p-8">
          <h2 className="text-3xl font-bold mb-6">Rewards & Recognition</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 p-6 text-center">
              🏆 Champion Trophy + Badge
            </div>
            <div className="rounded-2xl bg-slate-800 p-6 text-center">
              📜 Verified Digital Certificate
            </div>
            <div className="rounded-2xl bg-slate-800 p-6 text-center">
              🥇 Gold / Silver / Bronze Performance Badges
            </div>
          </div>
        </div>

        {/* Why Join */}
        <div className="mt-16 rounded-3xl bg-slate-900 p-8">
          <h2 className="text-3xl font-bold mb-6">Why Join This Tournament?</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-800 p-6">Improve logical thinking</div>
            <div className="rounded-2xl bg-slate-800 p-6">Build strong coding confidence</div>
            <div className="rounded-2xl bg-slate-800 p-6">Get participation certificate</div>
            <div className="rounded-2xl bg-slate-800 p-6">Compete in a healthy environment</div>
          </div>
        </div>

        {/* Register Button */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/register"
            className="inline-block rounded-2xl bg-green-500 px-10 py-4 text-xl font-bold text-slate-950 hover:bg-green-400 transition-all active:scale-95 shadow-lg shadow-green-500/30"
          >
            Register for Tournament → 
          </Link>
        </div>
      </section>
    </main>
  );
}