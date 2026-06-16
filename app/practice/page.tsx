// app/practice/page.tsx
import Link from "next/link";

export default function PracticePage() {
  const practiceItems = [
    {
      id: "quiz", // Route slug parameter identifier
      title: "Quiz Practice",
      icon: "🧠",
      level: "Beginner",
      description:
        "Practice general knowledge and school-level quiz questions to improve confidence.",
      sample: "Example: Which planet is known as the Red Planet?",
    },
    {
      id: "logic",
      title: "Logic Practice",
      icon: "💡",
      level: "Beginner",
      description:
        "Improve reasoning, patterns, sequences and problem-solving ability.",
      sample: "Example: What comes next? 2, 4, 6, 8, ?",
    },
    {
      id: "coding",
      title: "Coding Basics",
      icon: "💻",
      level: "Beginner",
      description:
        "Learn output prediction, basic programming logic and digital thinking.",
      sample: "Example: What is the output of 2 + 3?",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-center">
      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-24">
        
        <div>
          <p className="text-sm font-semibold text-green-400 uppercase tracking-wider">
            SmartIndia.club Practice Lab
          </p>
          <h1 className="mt-2 text-4xl font-extrabold md:text-5xl tracking-tight text-white">
            Practice Before Tournament
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-slate-300 leading-relaxed">
            Practice quiz, logic, and coding basics before the main tournament phase.
            Learning becomes easier when students prepare step by step.
          </p>
        </div>

        {/* Practice Cards System Matrix */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {practiceItems.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-slate-900 p-6 border border-slate-800/60 shadow-xl flex flex-col justify-between hover:border-slate-700/50 transition-all duration-300"
            >
              <div>
                <div className="text-4xl" role="img" aria-label={item.id}>
                  {item.icon}
                </div>

                <p className="mt-4 text-xs font-bold text-green-400 uppercase tracking-wider">
                  {item.level}
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">{item.title}</h2>
                <p className="mt-3 text-slate-300 text-sm leading-relaxed">{item.description}</p>

                <div className="mt-5 rounded-2xl bg-slate-800/50 p-4 border border-slate-800/40">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sample Question</p>
                  <p className="mt-2 text-sm text-slate-200 italic">{"\"" + item.sample + "\""}</p>
                </div>
              </div>

              {/* FIX: Native raw button elements converted into semantic Next.js dynamic routing links */}
              <Link
                href={`/practice/${item.id}`}
                className="mt-6 block w-full rounded-xl bg-green-500 px-5 py-3 text-center font-bold text-slate-950 hover:bg-green-400 transition-colors shadow-lg shadow-green-500/5"
              >
                Start Practice
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-900/40 p-8 border border-slate-800/50">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Practice Philosophy
          </h2>
          <p className="mt-3 text-slate-300 text-sm leading-relaxed">
            Every student starts fundamentally as a beginner. Consistent practice structure helps you significantly scale your computational confidence, response speed, execution accuracy, and core critical thinking abilities.
          </p>
        </div>

        <div className="mt-10">
          <Link
            href="/dashboard"
            className="inline-block rounded-xl border border-slate-800 bg-slate-900/40 px-6 py-3 font-bold text-slate-300 hover:text-white hover:border-slate-700 hover:bg-slate-800/60 transition-all text-sm"
          >
            &larr; Back to Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}