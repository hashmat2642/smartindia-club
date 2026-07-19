"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Calendar, Trophy, Award, Bell, Megaphone, 
  Trash2, Plus, ArrowLeft, CheckCircle2, AlertCircle 
} from "lucide-react";

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

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [iconType, setIconType] = useState("bell");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  // Sync announcements from localStorage
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const dateStr = new Date().toLocaleDateString("en-US", options);

    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: title.trim(),
      date: dateStr,
      iconType,
      description: description.trim()
    };

    const updated = [newAnnouncement, ...announcements];
    setAnnouncements(updated);
    localStorage.setItem("hdc_custom_announcements", JSON.stringify(updated));

    // Reset input fields
    setTitle("");
    setDescription("");
    setIconType("bell");

    // Display temporary success banner
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDelete = (id: string) => {
    const updated = announcements.filter(ann => ann.id !== id);
    setAnnouncements(updated);
    localStorage.setItem("hdc_custom_announcements", JSON.stringify(updated));
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center relative overflow-hidden">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 text-sm">Accessing announcements server logs...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[130px] pointer-events-none" />

      <section className="mx-auto max-w-4xl relative z-10">
        
        {/* Back Link */}
        <div className="mb-6">
          <Link 
            href="/admin" 
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-green-400 transition-colors uppercase tracking-widest cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>

        {/* Header Title */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Announcement Management
          </h1>
          <p className="text-sm text-slate-450 mt-2">
            Configure alerts, registration announcements, and schedules for participants.
          </p>
        </div>

        {/* Action success indicators */}
        {showSuccess && (
          <div className="mb-6 rounded-xl bg-green-500/10 border border-green-500/20 p-4 flex items-center gap-3 text-green-400 text-xs font-semibold animate-in fade-in slide-in-from-top-4 duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Success: Announcement published successfully and cached into database registries.</span>
          </div>
        )}

        {/* Refactored Form Container - High Contrast Styling */}
        <div className="rounded-3xl bg-slate-900 border border-slate-850 p-6 shadow-xl mb-12">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <Plus className="w-4 h-4 text-green-450" /> Publish New Update
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Announcement Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Online Exam Room Schedules declare"
                  className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs focus:outline-none focus:border-green-500 text-white placeholder-slate-600 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Notice Icon Widget</label>
                <select
                  value={iconType}
                  onChange={(e) => setIconType(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs focus:outline-none focus:border-green-500 text-white transition-colors"
                >
                  <option value="bell">🔔 General Notice (Bell)</option>
                  <option value="megaphone">📢 Alert Broadcast (Megaphone)</option>
                  <option value="calendar">📅 Date & Schedule (Calendar)</option>
                  <option value="trophy">🏆 Ranks & Winners (Trophy)</option>
                  <option value="award">🎖️ Certificates & Badges (Award)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Notice Description</label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details of the announcement, links, or instructions..."
                className="w-full p-3 bg-slate-950 border border-slate-850 rounded-xl text-xs focus:outline-none focus:border-green-500 text-white placeholder-slate-660 transition-colors"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="rounded-xl bg-green-500 hover:bg-green-400 text-slate-950 font-black px-6 py-3 text-xs transition-all flex items-center gap-1.5 shadow-md shadow-green-500/10 cursor-pointer active:scale-95"
              >
                Save Announcement <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

          </form>
        </div>

        {/* Live Announcements Previewer list */}
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5 text-green-400" /> Active Bulletins ({announcements.length})
        </h2>

        <div className="space-y-4">
          {announcements.map((ann) => {
            const Icon = ICON_MAP[ann.iconType] || Bell;
            return (
              <div 
                key={ann.id}
                className="rounded-2xl border border-slate-850 bg-slate-900/60 p-6 flex justify-between items-start gap-4 shadow-md group hover:border-slate-800 hover:bg-slate-900 transition-all"
              >
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-green-500/10 rounded-xl text-green-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">{ann.date}</span>
                    <h4 className="font-bold text-base text-slate-200 mt-1">{ann.title}</h4>
                    <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">{ann.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(ann.id)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors cursor-pointer rounded-lg bg-slate-950 hover:bg-red-500/10 border border-slate-850"
                  title="Remove Notice"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })}

          {announcements.length === 0 && (
            <div className="rounded-2xl border border-slate-850 bg-slate-900/20 p-12 text-center text-slate-550">
              <AlertCircle className="w-8 h-8 text-slate-650 mx-auto mb-3" />
              <p className="font-semibold text-sm">No live bulletins posted.</p>
              <p className="text-xs mt-1">Publish an update to display notices on student terminals.</p>
            </div>
          )}
        </div>

      </section>
    </main>
  );
}