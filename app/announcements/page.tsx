export default function AnnouncementsPage() {
  const announcements = [
    {
      title: "First Educational Skill Tournament",
      date: "Coming Soon",
      type: "Tournament",
      text: "SmartIndia.club will soon announce the first educational skill tournament for students from Class 3 to Class 10.",
    },
    {
      title: "Practice Lab Available",
      date: "Now Available",
      type: "Practice",
      text: "Students can practice quiz, logic and coding basics before participating in the tournament.",
    },
    {
      title: "Class-wise Selection",
      date: "Important",
      type: "Selection",
      text: "Top students will be selected class-wise based on score, accuracy and completion time.",
    },
    {
      title: "Certificates & Recognition",
      date: "After Tournament",
      type: "Certificate",
      text: "Participation certificates and special recognition will be provided after successful completion.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          SmartIndia.club Updates
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          Announcements
        </h1>

        <p className="mt-5 max-w-3xl text-slate-300">
          Stay updated with tournament news, practice updates, certificate
          information and important student announcements.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {announcements.map((item) => (
            <div key={item.title} className="rounded-3xl bg-slate-900 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-green-500 px-4 py-1 text-sm font-bold text-slate-950">
                  {item.type}
                </span>

                <span className="text-sm text-slate-400">
                  {item.date}
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-bold">
                {item.title}
              </h2>

              <p className="mt-3 text-slate-300">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}