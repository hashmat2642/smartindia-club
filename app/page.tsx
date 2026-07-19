import Link from "next/link";
import { 
  Users, CreditCard, Award, ArrowRight, 
  ShieldCheck, Trophy, Sparkles, BookOpen, 
  BrainCircuit, Activity, Lock, CheckCircle2 
} from "lucide-react";

// Structural Helper Sub-component: InfoWidget with Premium Styling
function InfoWidget({ 
  icon, 
  title, 
  value, 
  label 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  label: string; 
}) {
  return (
    <div className="rounded-2xl bg-slate-950/50 p-5 border border-slate-850 flex items-start gap-4 hover:border-slate-800/80 transition-all duration-300">
      <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-green-400 shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500 font-mono tracking-wider uppercase">{title}</p>
        <h3 className="mt-1 text-lg font-bold text-white tracking-tight">{value}</h3>
        <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{label}</p>
      </div>
    </div>
  );
}

// Structural Helper Sub-component: FeatureCard with Lucide Icons
function FeatureCard({
  icon,
  iconBg,
  title,
  description,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl bg-slate-900/40 p-8 shadow-xl border border-slate-800/40 hover:border-slate-750/70 hover:shadow-2xl hover:shadow-green-500/5 transition-all duration-300 relative overflow-hidden group">
      {/* Light glow on hover */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-green-500/5 rounded-full blur-2xl group-hover:bg-green-500/10 transition-colors pointer-events-none" />
      
      <div className={`p-4 rounded-2xl ${iconBg} border border-white/5 inline-flex items-center justify-center mb-6`}>
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
      <p className="mt-3.5 text-slate-350 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// Main Home/Landing Component
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-center relative overflow-hidden">
      
      {/* Background Grids & Ambient Glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[130px] pointer-events-none" />

      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-24 relative z-10">
        
        {/* Main Hero Section */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          
          {/* Left Hero Brand Segment */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Project Tag Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 font-mono tracking-widest uppercase text-xs">
              <ShieldCheck className="w-4 h-4 text-green-400" />
              <span>National Digital Skill Initiative</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.05]">
              SmartIndia<span className="text-green-400">.club</span>
            </h1>

            <p className="max-w-2xl text-lg md:text-xl text-slate-300 leading-relaxed font-light">
              Fostering advanced computing mindsets through engaging quiz parameter labs, algorithmic reasoning structures, and foundational web styling challenges.
            </p>

            {/* CTA Navigation Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-slate-950 font-extrabold px-8 py-4 flex items-center gap-2 shadow-lg shadow-green-500/10 hover:shadow-green-500/25 transition-all duration-200 cursor-pointer"
              >
                Register Now <ArrowRight className="w-4.5 h-4.5" />
              </Link>

              <Link
                href="/tournament"
                className="rounded-xl border border-slate-800 bg-slate-950 hover:bg-slate-905 px-8 py-4 font-bold text-slate-350 hover:text-white transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Trophy className="w-4.5 h-4.5 text-green-400" /> View Tournament
              </Link>
            </div>

            {/* Security Compliance badges below CTAs */}
            <div className="flex items-center gap-6 text-xs text-slate-500 pt-4 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> SSL Encrypted
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Cryptographic IDs
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Database Cleared
              </span>
            </div>
          </div>

          {/* Right Tournament Details Matrix Container */}
          <div className="lg:col-span-5 rounded-3xl bg-slate-900/60 backdrop-blur-md p-6 md:p-8 shadow-2xl border border-slate-800/80 relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-400 rounded-t-3xl" />
            
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-green-400" /> Skill Tournament Phase
              </h2>
              <span className="bg-slate-950 border border-slate-800 text-[10px] font-bold text-slate-400 px-2 py-0.5 rounded-md">
                Active Enrolls
              </span>
            </div>

            <p className="text-slate-350 text-xs leading-relaxed mb-6">
              An educational curriculum platform configured to improve conceptual aptitude in general analytics, mathematical matrices, and visual design parameters.
            </p>

            {/* Information Grid Layout */}
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoWidget 
                icon={<Users className="w-4 h-4" />} 
                title="Target Allocation" 
                value="140 Students" 
                label="Maximum classroom seats" 
              />
              <InfoWidget 
                icon={<CreditCard className="w-4 h-4" />} 
                title="Registration" 
                value="₹50 Per Candidate" 
                label="Secures ledger credentials" 
              />
              <InfoWidget 
                icon={<BookOpen className="w-4 h-4" />} 
                title="Assessment Matrix" 
                value="Logic + Code + Quiz" 
                label="Combined scoring syllabus" 
              />
              <InfoWidget 
                icon={<Award className="w-4 h-4" />} 
                title="Selection Criteria" 
                value="Top 5 from Class" 
                label="Certificates granted on merit" 
              />
            </div>
          </div>
        </div>

        {/* Feature Cards Showcase Segment */}
        <div className="mt-24 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<BrainCircuit className="w-8 h-8 text-indigo-400" />}
            iconBg="bg-indigo-500/10 text-indigo-400"
            title="Conceptual Learning"
            description="Access practice modules focusing on logical syntax parameters, sequence prediction matrices, and fundamental HTML/CSS formatting labs."
          />

          <FeatureCard
            icon={<Activity className="w-8 h-8 text-green-400" />}
            iconBg="bg-green-500/10 text-green-400"
            title="Interactive Testing"
            description="Participate in timed class-level assessment tournaments with real-time scoring trackers, database validation registries, and active test logs."
          />

          <FeatureCard
            icon={<Trophy className="w-8 h-8 text-yellow-400" />}
            iconBg="bg-yellow-500/10 text-yellow-400"
            title="Credential Verification"
            description="Earn cryptographically verified, QR-linked credentials indicating performance level grades (Gold, Silver, Bronze) issued directly to candidate profiles."
          />
        </div>

        {/* Platform Integrity & Verification Checklist */}
        <div className="mt-24 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-green-950/20 p-8 border border-slate-800/80 shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            
            <div>
              <span className="text-xs font-mono font-bold text-green-400 uppercase tracking-widest">Platform Integrity</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-2 leading-tight">
                Turning Screen Time Into Skill Progress
              </h2>
              <p className="mt-4 text-slate-350 text-sm leading-relaxed">
                SmartIndia.club provides structured verification frameworks to confirm candidate technical proficiencies. Every participant profile includes secure log histories, active status trackers, and verifiable certificate registry IDs.
              </p>
            </div>

            <div className="bg-slate-950/60 border border-slate-850 p-6 rounded-2xl space-y-4">
              <h3 className="text-xs font-bold text-slate-450 uppercase tracking-widest flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-green-400" /> Platform Security Checklist
              </h3>

              <div className="grid gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-3 border-b border-slate-900 pb-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Individual candidate data is handled under SSL-compliant security models.</span>
                </div>
                <div className="flex items-center gap-3 border-b border-slate-900 pb-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Unique profile QR codes link directly to verified databases for quick audits.</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                  <span>Ledgers track all entry fee clearances instantly via transparent receipt indexes.</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
}