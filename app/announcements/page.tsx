// app/announcements/page.tsx
import { Calendar, Trophy, Award } from "lucide-react";

export default function AnnouncementsPage() {
  const announcements = [
    {
      id: 1,
      title: "Tournament Registration Open",
      date: "June 1, 2026",
      icon: Calendar,
      description:
        "Students can now register for the First Educational Skill Tournament. Limited seats available.",
    },
    {
      id: 2,
      title: "Result Declaration",
      date: "June 15, 2026",
      icon: Trophy,
      description:
        "Tournament results and final rankings will be published on the Live Leaderboard.",
    },
    {
      id: 3,
      title: "Certificate Distribution",
      date: "June 20, 2026",
      icon: Award,
      description:
        "Digital certificates will be available for all participants in their dashboard.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-green-400 font-semibold text-sm tracking-widest">
            STAY UPDATED
          </p>
          <h1 className="text-5xl font-bold mt-3">Announcements</h1>
          <p className="text-slate-400 mt-3 text-lg">
            Latest updates and important information
          </p>
        </div>

        <div className="space-y-6">
          {announcements.map((announcement) => {
            const Icon = announcement.icon;
            return (
              <div
                key={announcement.id}
                className="group rounded-3xl bg-slate-900 p-8 border border-slate-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-start gap-5">
                  <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-colors">
                    <Icon size={28} />
                  </div>

                  <div className="flex-1">
                    <p className="text-green-400 text-sm font-medium">
                      {announcement.date}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold leading-tight">
                      {announcement.title}
                    </h2>
                    <p className="mt-4 text-slate-300 leading-relaxed">
                      {announcement.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Future Notice */}
        <div className="mt-16 text-center text-slate-500 text-sm">
          More announcements will appear here as the tournament progresses.
        </div>
      </section>
    </main>
  );
}