export default function AdminQuestionsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          Admin Panel
        </p>

        <h1 className="mt-2 text-4xl font-bold">Add Questions</h1>

        <p className="mt-3 text-slate-300">
          Add quiz, logic and coding basics questions for the tournament.
        </p>

        <form className="mt-10 rounded-3xl bg-slate-900 p-8">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Question Category
            </label>
            <select className="w-full rounded-xl p-3 text-black">
              <option>Quiz</option>
              <option>Logic</option>
              <option>Coding Basics</option>
            </select>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold">
              Question
            </label>
            <textarea
              className="h-28 w-full rounded-xl p-3 text-black"
              placeholder="Enter question"
            />
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <input className="rounded-xl p-3 text-black" placeholder="Option A" />
            <input className="rounded-xl p-3 text-black" placeholder="Option B" />
            <input className="rounded-xl p-3 text-black" placeholder="Option C" />
            <input className="rounded-xl p-3 text-black" placeholder="Option D" />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-semibold">
              Correct Answer
            </label>
            <select className="w-full rounded-xl p-3 text-black">
              <option>Option A</option>
              <option>Option B</option>
              <option>Option C</option>
              <option>Option D</option>
            </select>
          </div>

          <button className="mt-8 rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 hover:bg-green-400">
            Save Question
          </button>
        </form>
      </section>
    </main>
  );
}