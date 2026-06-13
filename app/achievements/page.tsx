export default function AchievementsPage() {
  const badges = [
    {
      title: "Gold Performer",
      icon: "🥇",
      color: "bg-yellow-500",
      desc: "Awarded to top-performing students.",
    },
    {
      title: "Silver Performer",
      icon: "🥈",
      color: "bg-slate-400",
      desc: "Excellent performance in tournament.",
    },
    {
      title: "Bronze Performer",
      icon: "🥉",
      color: "bg-orange-500",
      desc: "Good performance in tournament.",
    },
    {
      title: "Champion",
      icon: "🏆",
      color: "bg-green-500",
      desc: "Highest scorer of the tournament.",
    },
    {
      title: "Participant",
      icon: "🎖️",
      color: "bg-blue-500",
      desc: "Successfully participated.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Achievements & Badges
        </h1>

        <p className="mt-3 text-slate-300">
          Recognition earned through performance.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {badges.map((badge) => (
            <div
              key={badge.title}
              className="rounded-3xl bg-slate-900 p-8 text-center"
            >
              <div
                className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full text-5xl ${badge.color}`}
              >
                {badge.icon}
              </div>

              <h2 className="mt-5 text-2xl font-bold">
                {badge.title}
              </h2>

              <p className="mt-3 text-slate-400">
                {badge.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}