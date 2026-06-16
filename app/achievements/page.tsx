// app/achievements/page.tsx

export default function AchievementsPage() {
  // Array structures with IDs and semantic descriptive label entries
  const badges = [
    {
      id: "gold",
      title: "Gold Performer",
      icon: "🥇",
      label: "gold medal",
      color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      desc: "Awarded to top-performing students achieving a verified score of 90 or above.",
    },
    {
      id: "silver",
      title: "Silver Performer",
      icon: "🥈",
      label: "silver medal",
      color: "bg-slate-500/10 text-slate-400 border-slate-500/20",
      desc: "Excellent performance in the tournament with a verified score of 75 or above.",
    },
    {
      id: "bronze",
      title: "Bronze Performer",
      icon: "🥉",
      label: "bronze medal",
      color: "bg-orange-500/10 text-orange-500 border-orange-500/20",
      desc: "Good performance in the tournament with a verified score of 60 or above.",
    },
    {
      id: "champion",
      title: "Champion",
      icon: "🏆",
      label: "trophy",
      color: "bg-green-500/10 text-green-400 border-green-500/20",
      desc: "Highest scorer demonstrating unmatched structural logic capabilities.",
    },
    {
      id: "participant",
      title: "Participant",
      icon: "🎖️",
      label: "military medal",
      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      desc: "Successfully participated and showcased fair dedication towards future skills.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-center">
      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-24">
        
        {/* Title Content Header Area */}
        <div className="mb-12">
          <p className="text-sm font-semibold text-green-400 uppercase tracking-wider">
            Recognition Engine
          </p>
          <h1 className="mt-2 text-4xl font-extrabold md:text-5xl tracking-tight text-white">
            Achievements &amp; Badges
          </h1>
          <p className="mt-3 text-base text-slate-400 max-w-2xl leading-relaxed">
            Every token of recognition is earned through verified cognitive performance, analytical logic validation, and class competition.
          </p>
        </div>

        {/* Dynamic Badges Symmetrical Layout Grid Matrix */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="rounded-3xl bg-slate-900 p-8 text-center border border-slate-800/60 hover:border-slate-700/50 transition-all duration-300 shadow-xl flex flex-col items-center justify-center group"
            >
              {/* FIX: Accessibility wrapper applied flawlessly over structural emoji layouts */}
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full text-5xl border group-hover:scale-105 transition-transform duration-300 ${badge.color}`}
                role="img"
                aria-label={badge.label}
              >
                {badge.icon}
              </div>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-white">
                {badge.title}
              </h2>

              <p className="mt-3 text-slate-400 text-sm leading-relaxed max-w-xs">
                {badge.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}