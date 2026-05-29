export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          About SmartIndia.club
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          Learn • Compete • Grow
        </h1>

        <p className="mt-6 max-w-4xl text-lg text-slate-300">
          SmartIndia.club is an educational platform designed to help students
          build confidence, improve problem-solving skills, develop logical
          thinking, and gain exposure to coding and future-ready digital skills.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">🎯 Our Mission</h2>
            <p className="mt-3 text-slate-300">
              Create a trusted educational ecosystem where students learn,
              compete and grow through healthy digital experiences.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">🌱 Our Vision</h2>
            <p className="mt-3 text-slate-300">
              Help students across India develop confidence, logic, coding
              skills and future-ready abilities.
            </p>
          </div>

          <div className="rounded-3xl bg-slate-900 p-6">
            <h2 className="text-2xl font-bold">🏆 Our Goal</h2>
            <p className="mt-3 text-slate-300">
              Turn screen time into skill time through quiz, logic and coding
              competitions.
            </p>
          </div>
        </div>

        <div className="mt-12 rounded-3xl bg-slate-900 p-8">
          <h2 className="text-3xl font-bold">
            What Makes Us Different?
          </h2>

          <ul className="mt-6 space-y-4 text-slate-300">
            <li>✅ Educational-first approach</li>
            <li>✅ Student confidence building</li>
            <li>✅ Healthy competition ecosystem</li>
            <li>✅ Coding and digital literacy exposure</li>
            <li>✅ Transparent and fair participation system</li>
          </ul>
        </div>
      </section>
    </main>
  );
}