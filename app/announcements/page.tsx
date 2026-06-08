export default function AnnouncementsPage() {
  const announcements = [
    {
      title: "Tournament Registration Open",
      date: "01 June 2026",
      description:
        "Students can now register for the SmartIndia Educational Skill Tournament.",
    },
    {
      title: "Result Declaration",
      date: "15 June 2026",
      description:
        "Tournament results and rankings will be published on the leaderboard.",
    },
    {
      title: "Certificate Distribution",
      date: "20 June 2026",
      description:
        "Digital certificates will be available for all participants.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Announcements
        </h1>

        <div className="mt-10 space-y-6">
          {announcements.map((item, index) => (
            <div
              key={index}
              className="rounded-3xl bg-slate-900 p-6"
            >
              <p className="text-green-400">
                {item.date}
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {item.title}
              </h2>

              <p className="mt-3 text-slate-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}