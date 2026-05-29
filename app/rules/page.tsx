export default function RulesPage() {
  const rules = [
    {
      title: "Correct Details",
      text: "Students must register using correct name, class, school and parent contact details.",
    },
    {
      title: "One Student, One Entry",
      text: "Each student can participate only once in the same tournament.",
    },
    {
      title: "Educational Focus",
      text: "The tournament is based on quiz, logic and coding basics for learning and skill growth.",
    },
    {
      title: "Fair Evaluation",
      text: "Results will be calculated using score, accuracy and completion time.",
    },
    {
      title: "No Cheating",
      text: "Fake identity, unfair activity or cheating can lead to disqualification.",
    },
    {
      title: "Respectful Behaviour",
      text: "Students must maintain discipline and respectful participation throughout the event.",
    },
    {
      title: "Certificates",
      text: "Participation certificates and achievement recognition will be provided after completion.",
    },
    {
      title: "Class-wise Selection",
      text: "Top students will be selected class-wise to ensure fair competition.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          Rules & Fair Play
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          Tournament Rules
        </h1>

        <p className="mt-5 max-w-3xl text-slate-300">
          These rules are created to keep the tournament fair, transparent,
          educational and positive for every student.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {rules.map((rule, index) => (
            <div key={rule.title} className="rounded-3xl bg-slate-900 p-6">
              <p className="text-sm font-semibold text-green-400">
                Rule {index + 1}
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {rule.title}
              </h2>

              <p className="mt-3 text-slate-300">
                {rule.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-slate-900 p-8">
          <h2 className="text-3xl font-bold">
            Our Promise
          </h2>

          <p className="mt-4 text-slate-300">
            SmartIndia.club is built on trust, honesty, fairness, discipline,
            transparency and student-first thinking. Our focus is learning,
            confidence building and healthy competition.
          </p>
        </div>
      </section>
    </main>
  );
}