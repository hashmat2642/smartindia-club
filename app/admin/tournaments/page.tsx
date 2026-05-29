export default function CreateTournamentPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          Admin Panel
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Create Tournament
        </h1>

        <p className="mt-3 text-slate-300">
          Create and manage educational tournaments for students.
        </p>

        <form className="mt-10 rounded-3xl bg-slate-900 p-8">
          
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Tournament Title
            </label>

            <input
              className="w-full rounded-xl p-3 text-black"
              placeholder="Enter tournament title"
            />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Registration Fee
              </label>

              <input
                className="w-full rounded-xl p-3 text-black"
                placeholder="₹50"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Target Students
              </label>

              <input
                className="w-full rounded-xl p-3 text-black"
                placeholder="140"
              />
            </div>

          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold">
              Tournament Description
            </label>

            <textarea
              className="h-36 w-full rounded-xl p-3 text-black"
              placeholder="Write tournament details"
            />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Start Date
              </label>

              <input
                type="date"
                className="w-full rounded-xl p-3 text-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                End Date
              </label>

              <input
                type="date"
                className="w-full rounded-xl p-3 text-black"
              />
            </div>

          </div>

          <button className="mt-8 rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 hover:bg-green-400">
            Create Tournament
          </button>

        </form>
      </section>
    </main>
  );
}