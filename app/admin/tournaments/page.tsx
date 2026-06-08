export default function TournamentPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Tournament Settings
        </h1>

        <div className="mt-10 rounded-3xl bg-slate-900 p-6">
          <p className="text-slate-400">
            Tournament Name
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            SmartIndia Educational Skill Tournament 2026
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-slate-800 p-4">
              <p>Registration Fee</p>
              <h3 className="text-xl font-bold">₹50</h3>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p>Target Students</p>
              <h3 className="text-xl font-bold">140</h3>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p>Status</p>
              <h3 className="text-xl font-bold text-green-400">
                Active
              </h3>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}