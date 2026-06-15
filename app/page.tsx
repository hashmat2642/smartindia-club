import Link from "next/link";

// 1. Structural Helper Sub-component: InfoCard with Semantic Elements
function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-800 p-4 border border-slate-800/50">
      <p className="text-sm text-slate-400 font-medium">{title}</p>
      <h3 className="mt-1 text-xl font-bold text-green-400">{value}</h3>
    </div>
  );
}

// 2. Structural Helper Sub-component: FeatureCard with Accessible Emojis
function FeatureCard({
  icon,
  label,
  title,
  description,
}: {
  icon: string;
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl bg-slate-900 p-6 shadow-xl border border-slate-800/40 hover:border-slate-700/60 transition-all duration-300">
      {/* Accessibility Compliant Icon Wrapper */}
      <div className="text-4xl" role="img" aria-label={label}>
        {icon}
      </div>
      <h2 className="mt-4 text-2xl font-bold text-white">{title}</h2>
      <p className="mt-3 text-slate-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// 3. Main Export Document Component
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-center">
      <section className="mx-auto w-full max-w-7xl px-6 py-16 md:py-24">
        
        {/* Main Hero Grid Layout Section */}
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          
          {/* Left Hero Brand Content Segment */}
          <div>
            <p className="text-sm font-semibold text-green-400 uppercase tracking-wider">
              Learn • Compete • Grow
            </p>

            <h1 className="mt-3 text-5xl font-black md:text-6xl tracking-tight text-white">
              SmartIndia.club
            </h1>

            <p className="mt-5 max-w-xl text-lg md:text-xl text-slate-300 leading-relaxed">
              Building future skills through healthy digital learning,
              quiz-based challenges, logic practice and coding basics.
            </p>

            {/* CTA Dynamic Navigation Button Matrix */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 hover:bg-green-400 shadow-lg shadow-green-500/10 transition-all duration-200"
              >
                Register Now
              </Link>

              <Link
                href="/tournament"
                className="rounded-xl border border-slate-700 px-6 py-3 font-bold text-white hover:bg-slate-900 transition-all duration-200"
              >
                View Tournament
              </Link>
            </div>
          </div>

          {/* Right Tournament Specific Matrix Overview Container */}
          <div className="rounded-3xl bg-slate-900 p-8 shadow-2xl border border-slate-800/60">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              First Educational Skill Tournament
            </h2>

            <p className="mt-3 text-slate-300 text-sm leading-relaxed">
              A beginner-friendly tournament designed to help students improve
              quiz ability, logical thinking and coding basics.
            </p>

            {/* Information Grid Mapping Flow */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoCard title="Target" value="140 Students" />
              <InfoCard title="Registration" value="₹50 per student" />
              <InfoCard title="Format" value="Quiz + Logic + Coding" />
              <InfoCard title="Selection" value="Top 5 from each class" />
            </div>
          </div>
        </div>

        {/* Feature Cards Section Matrix */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon="🧠"
            label="brain"
            title="Learn"
            description="Students practice engaging quiz content, algorithmic logic structures and foundational coding basics."
          />

          <FeatureCard
            icon="🏆"
            label="trophy"
            title="Compete"
            description="Healthy class-wise digital tournament competition with transparent execution and evaluation."
          />

          <FeatureCard
            icon="🌱"
            label="seedling"
            title="Grow"
            description="Students build structural self-confidence, computational thinking skills and future readiness."
          />
        </div>

        {/* Brand Mission Alignment Statement Layout */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-900/40 p-8 text-center border border-slate-800/50">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Turning Screen Time Into Skill Time
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-slate-300 text-base leading-relaxed">
            SmartIndia.club is built fundamentally to guide students in utilizing technology productively for
            accelerated learning, active confidence building, and structural digital skill growth.
          </p>
        </div>
      </section>
    </main>
  );
}