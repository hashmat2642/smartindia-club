import Link from "next/link";

export default function PracticePage() {
  const practiceItems = [
    {
      title: "Quiz Practice",
      icon: "🧠",
      level: "Beginner",
      description:
        "Practice general knowledge and school-level quiz questions to improve confidence.",
      sample: "Example: Which planet is known as the Red Planet?",
    },
    {
      title: "Logic Practice",
      icon: "💡",
      level: "Beginner",
      description:
        "Improve reasoning, patterns, sequences and problem-solving ability.",
      sample: "Example: What comes next? 2, 4, 6, 8, ?",
    },
    {
      title: "Coding Basics",
      icon: "💻",
      level: "Beginner",
      description:
        "Learn output prediction, basic programming logic and digital thinking.",
      sample: "Example: What is the output of 2 + 3?",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          SmartIndia.club Practice Lab
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Practice Before Tournament
        </h1>

        <p className="mt-3 max-w-3xl text-slate-300">
          Practice quiz, logic and coding basics before the tournament.
          Learning becomes easier when students prepare step by step.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {practiceItems.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-slate-900 p-6 shadow-xl"
            >
              <div className="text-4xl">{item.icon}</div>

              <p className="mt-4 text-sm font-semibold text-green-400">
                {item.level}
              </p>

              <h2 className="mt-2 text-2xl font-bold">{item.title}</h2>

              <p className="mt-3 text-slate-300">{item.description}</p>

              <div className="mt-5 rounded-2xl bg-slate-800 p-4">
                <p className="text-sm text-slate-400">Sample Question</p>
                <p className="mt-2 text-slate-200">{item.sample}</p>
              </div>

              <button className="mt-6 w-full rounded-xl bg-green-500 px-5 py-3 font-bold text-slate-950 hover:bg-green-400">
                Start Practice
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-slate-900 p-8">
          <h2 className="text-2xl font-bold">
            Practice Message
          </h2>

          <p className="mt-3 text-slate-300">
            Every student starts as a beginner. Practice helps you improve your
            confidence, speed, accuracy and thinking ability.
          </p>
        </div>

        <Link
          href="/dashboard"
          className="mt-10 inline-block rounded-xl border border-slate-600 px-6 py-3 font-bold text-white hover:bg-slate-800"
        >
          Back to Dashboard
        </Link>
      </section>
    </main>
  );
}