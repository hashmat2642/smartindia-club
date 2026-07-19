"use client";

import { useEffect, useState } from "react";
import { Calendar, Trophy, Award, Bell, Megaphone } from "lucide-react";

type Announcement = {
  id: string;
  title: string;
  date: string;
  iconType: string;
  description: string;
};

const ICON_MAP: Record<string, React.ElementType> = {
  calendar: Calendar,
  trophy: Trophy,
  award: Award,
  bell: Bell,
  megaphone: Megaphone
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedAnnouncements = localStorage.getItem("hdc_custom_announcements");
      if (savedAnnouncements) {
        try {
          setAnnouncements(JSON.parse(savedAnnouncements));
        } catch (e) {
          console.error(e);
        }
      } else {
        const defaults: Announcement[] = [
          {
            id: "1",
            title: "Tournament Registration Open",
            date: "June 1, 2026",
            iconType: "calendar",
            description: "Students can now register for the First Educational Skill Tournament. Limited seats available."
          },
          {
            id: "2",
            title: "Result Declaration",
            date: "June 15, 2026",
            iconType: "trophy",
            description: "Tournament results and final rankings will be published on the Live Leaderboard."
          },
          {
            id: "3",
            title: "Certificate Distribution",
            date: "June 20, 2026",
            iconType: "award",
            description: "Digital certificates will be available for all participants in their dashboard."
          }
        ];
        localStorage.setItem("hdc_custom_announcements", JSON.stringify(defaults));
        setAnnouncements(defaults);
      }
      setLoading(false);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Loading active notices...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[130px] pointer-events-none" />

      <section className="mx-auto max-w-4xl relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-mono tracking-widest uppercase text-xs">
            <Bell className="w-4 h-4 text-green-400 animate-pulse" />
            <span>Bulletin updates</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Announcements
          </h1>

          <p className="text-sm md:text-base text-slate-350 leading-relaxed font-light max-w-2xl mx-auto">
            Stay updated with the latest notices, timetables, leaderboard announcements, and verification schedule details.
          </p>
        </div>

        {/* Announcements List */}
        <div className="space-y-6">
          {announcements.map((announcement) => {
            const Icon = ICON_MAP[announcement.iconType] || Bell;
            return (
              <div
                key={announcement.id}
                className="group rounded-3xl bg-slate-900 border border-slate-850 p-6 md:p-8 hover:border-green-500/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Visual Accent Background glow */}
                <div className="absolute inset-0 bg-green-500/[0.01] pointer-events-none" />

                <div className="flex items-start gap-5 relative z-10">
                  <div className="mt-1 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-colors shrink-0">
                    <Icon size={24} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-slate-500 text-xs font-mono font-bold uppercase tracking-wider">
                      {announcement.date}
                    </p>
                    <h2 className="mt-2 text-xl md:text-2xl font-bold leading-snug text-slate-205 group-hover:text-green-400 transition-colors">
                      {announcement.title}
                    </h2>
                    <p className="mt-4 text-xs md:text-sm text-slate-400 leading-relaxed font-light">
                      {announcement.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {announcements.length === 0 && (
            <div className="rounded-3xl border border-slate-850 bg-slate-900/20 p-16 text-center text-slate-550">
              <Megaphone className="w-10 h-10 text-slate-650 mx-auto mb-3 animate-bounce" />
              <h4 className="font-bold text-sm">No live bulletins posted</h4>
              <p className="text-xs text-slate-550 mt-1">Check back later for monthly updates and exam registrations notice.</p>
            </div>
          )}
        </div>

        {/* Future Notice */}
        <div className="mt-16 text-center text-slate-500 text-[10px] font-mono tracking-widest uppercase">
          •• End of active bulletin logs ••
        </div>
      </section>
    </main>
  );
}