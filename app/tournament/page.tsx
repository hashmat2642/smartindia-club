import Link from "next/link";
import { 
  Trophy, CheckCircle2, ShieldCheck, Zap, Clock, Star 
} from "lucide-react";

// Helper sub-component for step timeline
function TimelineStep({ 
  step, 
  title, 
  desc, 
  active 
}: { 
  step: string; 
  title: string; 
  desc: string; 
  active?: boolean;
}) {
  return (
    <div className="flex gap-4 relative">
      <div className="flex flex-col items-center">
        <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 ${
          active 
            ? "bg-green-500 border-green-500 text-slate-950 shadow-md shadow-green-500/20" 
            : "bg-slate-950 border-slate-800 text-slate-500"
        }`}>
          {step}
        </div>
        <div className="w-0.5 h-full bg-slate-900 min-h-[40px] last:hidden" />
      </div>
      <div className="pb-8">
        <h4 className={`text-base font-bold tracking-tight ${active ? "text-green-400" : "text-slate-350"}`}>{title}</h4>
        <p className="text-xs text-slate-450 mt-1 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function TournamentPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white py-16 px-4 md:px-8 relative overflow-hidden">
      
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[130px] pointer-events-none" />

      <section className="mx-auto max-w-6xl relative z-10">
        
        {/* Top Header Segment */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-mono tracking-widest uppercase text-xs">
            <Trophy className="w-4 h-4 text-green-400 animate-pulse" />
            <span>Monthly Main Event</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            First Educational <br/>
            <span className="text-green-450">Skill Tournament</span>
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-light">
            Designed fundamentally to foster student computational aptitude, logical syntax processing, and healthy competitive confidence in digital literacy.
          </p>
        </div>

        {/* Primary Parameter Widgets Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16">
          <div className="rounded-2xl bg-slate-900/60 border border-slate-850 p-6 shadow-md hover:border-slate-800 transition-colors">
            <span className="text-xs text-slate-500 font-mono tracking-widest uppercase block">TARGET</span>
            <p className="text-2xl font-black mt-2">140 Candidates</p>
            <p className="text-[10px] text-slate-450 mt-1">Classroom slots allocated</p>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-slate-850 p-6 shadow-md hover:border-slate-800 transition-colors">
            <span className="text-xs text-slate-500 font-mono tracking-widest uppercase block">ENROLLMENT FEE</span>
            <p className="text-2xl font-black mt-2">₹50.00 INR</p>
            <p className="text-[10px] text-slate-450 mt-1">Verifies profile credentials</p>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-green-500/20 p-6 shadow-md hover:border-green-500/30 transition-all bg-gradient-to-br from-slate-900/50 to-green-950/10">
            <span className="text-xs text-slate-500 font-mono tracking-widest uppercase block">REGISTRATION STATUS</span>
            <p className="text-2xl font-black text-green-400 mt-2">Live & Open</p>
            <p className="text-[10px] text-slate-450 mt-1">Accepting online entries</p>
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-slate-850 p-6 shadow-md hover:border-slate-800 transition-colors">
            <span className="text-xs text-slate-500 font-mono tracking-widest uppercase block">ASSESSMENT FORMAT</span>
            <p className="text-lg font-bold mt-2.5">Quiz • Logic • Coding</p>
            <p className="text-[10px] text-slate-450 mt-1">20-min timed challenge</p>
          </div>
        </div>

        {/* 2-Column Split: Motivation Timeline vs Prize Pool Structure */}
        <div className="grid gap-8 lg:grid-cols-12 mb-16">
          
          {/* Left Column: Reward Scale & Trophies */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/60 border border-slate-850 p-6 md:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-green-500/5 rounded-full blur-[40px] pointer-events-none" />
            
            <div>
              <h3 className="text-xl font-extrabold text-white mb-2 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" /> Reward Tier Checklist
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Students compete in classroom pools to qualify for scholarships, trophies, and verifiable performance grades.
              </p>

              <div className="space-y-4">
                
                {/* 1st Place */}
                <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-4 flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center text-2xl shrink-0 text-yellow-400">
                    🥇
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-yellow-400">Champion Rank #1</h4>
                      <span className="text-[9px] bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded text-yellow-400 font-mono">1 SLOT</span>
                    </div>
                    <p className="text-xs text-slate-350 mt-0.5">🥇 Smart Tablet + Champion Gold Shield + Verified Merit Badge</p>
                  </div>
                </div>

                {/* Top 10% */}
                <div className="rounded-2xl bg-slate-100/5 border border-slate-300/20 p-4 flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl shrink-0 text-slate-300">
                    🥈
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-200">Silver Grade (Top 10%)</h4>
                      <span className="text-[9px] bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-slate-300 font-mono">CLASSWISE</span>
                    </div>
                    <p className="text-xs text-slate-350 mt-0.5">🥈 Tech Development Kit + Scholar Silver Shield + High Ranks Cert</p>
                  </div>
                </div>

                {/* Top 25% */}
                <div className="rounded-2xl bg-orange-500/5 border border-orange-500/20 p-4 flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl shrink-0 text-amber-600">
                    🥉
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-amber-500">Bronze Grade (Top 25%)</h4>
                      <span className="text-[9px] bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded text-amber-500 font-mono">CLASSWISE</span>
                    </div>
                    <p className="text-xs text-slate-350 mt-0.5">🥉 Robotics STEM kit + Scholar Bronze Shield + Achievement Cert</p>
                  </div>
                </div>

                {/* All entries */}
                <div className="rounded-2xl bg-slate-950/40 border border-slate-850 p-4 flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl shrink-0 text-slate-500">
                    📜
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-400">Digital Credentials (All Entries)</h4>
                    <p className="text-xs text-slate-450 mt-0.5">Verifiable Cryptographic Digital Literacy Certificate of Participation</p>
                  </div>
                </div>

              </div>
            </div>

            <div className="border-t border-slate-850/80 pt-4 mt-6 flex justify-between items-center text-[10px] text-slate-500 font-mono">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-green-400" /> Secure Verification System</span>
              <span>100% Cryptographic Audits</span>
            </div>
          </div>

          {/* Right Column: Interactive Roadmap Timeline */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900/60 border border-slate-850 p-6 md:p-8 shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-extrabold text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-green-400" /> Tournament Roadmap
              </h3>
              
              <div className="pl-1">
                <TimelineStep 
                  step="1" 
                  title="Registry & Profile Setup" 
                  desc="Sign up online, create your profile record, and settle the secure ₹50 validation fee to set up credentials." 
                  active={true}
                />
                <TimelineStep 
                  step="2" 
                  title="Enter Practice Arenas" 
                  desc="Access interactive practice labs on Quiz GK, logical deduction, and HTML styling to warm up skills." 
                  active={true}
                />
                <TimelineStep 
                  step="3" 
                  title="Launch Live Examination" 
                  desc="Launch the timed tournament exam from your dashboard. Complete 10 problems in 20 minutes." 
                />
                <TimelineStep 
                  step="4" 
                  title="Audits & Certificate Issuance" 
                  desc="Ranks sync on the Live Leaderboard. Instantly print cryptographic certificates and unlock badges." 
                />
              </div>
            </div>

            <div className="border-t border-slate-850 pt-4 text-center text-xs text-slate-500">
              <p>Practice labs are open 24/7 for signed profiles.</p>
            </div>
          </div>

        </div>

        {/* Benefits Segment */}
        <div className="rounded-3xl bg-slate-900 border border-slate-850 p-8 shadow-xl mb-16">
          <h3 className="text-2xl font-black text-white text-center mb-8 flex items-center justify-center gap-2">
            <Zap className="w-5.5 h-5.5 text-green-400" /> Key Student Benefits
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 text-center">
            <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-850">
              <span className="text-3xl block mb-3">🧠</span>
              <h4 className="font-bold text-sm text-slate-200">Logic Expansion</h4>
              <p className="text-[11px] text-slate-450 mt-1.5 leading-relaxed">Strengthens core computational and algorithmic reasoning parameters.</p>
            </div>
            <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-850">
              <span className="text-3xl block mb-3">💻</span>
              <h4 className="font-bold text-sm text-slate-200">Coding Aptitude</h4>
              <p className="text-[11px] text-slate-450 mt-1.5 leading-relaxed">Builds basic HTML and CSS design self-confidence in safe environments.</p>
            </div>
            <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-850">
              <span className="text-3xl block mb-3">🎖️</span>
              <h4 className="font-bold text-sm text-slate-200">Verified Credentials</h4>
              <p className="text-[11px] text-slate-450 mt-1.5 leading-relaxed">Secures cryptographically verified certificates for school portfolios.</p>
            </div>
            <div className="bg-slate-950/40 p-5 rounded-2xl border border-slate-850">
              <span className="text-3xl block mb-3">🤝</span>
              <h4 className="font-bold text-sm text-slate-200">Healthy Standing</h4>
              <p className="text-[11px] text-slate-450 mt-1.5 leading-relaxed">Compete side-by-side with class candidates to motivate active learning.</p>
            </div>
          </div>
        </div>

        {/* Rules Summary Card */}
        <div className="rounded-3xl bg-slate-900 border border-slate-850 p-8 mb-16">
          <h3 className="text-2xl font-black text-white mb-6">Tournament Regulations</h3>
          <div className="grid gap-6 md:grid-cols-2 text-sm text-slate-350 leading-relaxed">
            <ul className="space-y-3">
              <li className="flex gap-2.5 items-start">
                <CheckCircle2 className="w-4.5 h-4.5 text-green-400 shrink-0 mt-0.5" />
                <span>Profiles must consist of valid student registry codes.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <CheckCircle2 className="w-4.5 h-4.5 text-green-400 shrink-0 mt-0.5" />
                <span>Single examination attempt is authorized per candidate record.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <CheckCircle2 className="w-4.5 h-4.5 text-green-400 shrink-0 mt-0.5" />
                <span>Questions cover logic problems, quiz parameters, and coding structures.</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex gap-2.5 items-start">
                <CheckCircle2 className="w-4.5 h-4.5 text-green-400 shrink-0 mt-0.5" />
                <span>Ranks calculated by combining correct responses and completion speed.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <CheckCircle2 className="w-4.5 h-4.5 text-green-400 shrink-0 mt-0.5" />
                <span>Certificates are cleared immediately upon payment validation.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <CheckCircle2 className="w-4.5 h-4.5 text-green-400 shrink-0 mt-0.5" />
                <span>Classroom standings are compiled independently per grade level.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Register Segment */}
        <div className="flex flex-col items-center text-center space-y-6 pt-4">
          <h2 className="text-2xl font-extrabold text-white">Secure Your Enrollment Seat Today</h2>
          <p className="text-xs text-slate-450 max-w-md leading-relaxed">
            Spaces are limited to 140 candidates. Ensure profile validation fee clearing to start practicing immediately.
          </p>
          <Link
            href="/register"
            className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-slate-950 font-black px-12 py-4.5 text-base transition-all shadow-lg shadow-green-500/20 active:scale-95 cursor-pointer"
          >
            Register for Tournament &rarr;
          </Link>
        </div>

      </section>
    </main>
  );
}