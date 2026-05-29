import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-sm font-semibold text-green-400">
              Learn • Compete • Grow
            </p>

            <h1 className="mt-3 text-5xl font-bold md:text-6xl">
              SmartIndia.club
            </h1>

            <p className="mt-5 max-w-xl text-xl text-slate-300">
              Building future skills through healthy digital learning,
              quiz-based challenges, logic practice and coding basics.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/register"
                className="rounded-xl bg-green-500 px-6 py-3 font-bold text-slate-950 hover:bg-green-400"
              >
                Register Now
              </Link>

              <Link
                href="/tournament"
                className="rounded-xl border border-slate-600 px-6 py-3 font-bold text-white hover:bg-slate-800"
              >
                View Tournament
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-slate-900 p-8 shadow-xl">
            <h2 className="text-2xl font-bold">
              First Educational Skill Tournament
            </h2>

            <p className="mt-3 text-slate-300">
              A beginner-friendly tournament designed to help students improve
              quiz ability, logic thinking and coding basics.
            </p>

            <div className="mt-6 grid gap-4">
              <InfoCard title="Target" value="140 Students" />
              <InfoCard title="Registration" value="₹50 per student" />
              <InfoCard title="Format" value="Quiz + Logic + Coding Basics" />
              <InfoCard title="Selection" value="Top 5 from each class" />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon="🧠"
            title="Learn"
            description="Students practice quiz, logic and coding basics."
          />

          <FeatureCard
            icon="🏆"
            title="Compete"
            description="Healthy class-wise competition with fair evaluation."
          />

          <FeatureCard
            icon="🌱"
            title="Grow"
            description="Students build confidence, skills and future readiness."
          />
        </div>

        <div className="mt-16 rounded-3xl bg-slate-900 p-8 text-center">
          <h2 className="text-3xl font-bold">
            Turning Screen Time Into Skill Time
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-slate-300">
            SmartIndia.club is designed to help students use technology for
            learning, confidence building and positive digital growth.
          </p>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-800 p-4">
      <p className="text-sm text-slate-400">{title}</p>
      <h3 className="mt-1 text-xl font-bold text-green-400">{value}</h3>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl bg-slate-900 p-6 shadow-xl">
      <div className="text-4xl">{icon}</div>
      <h2 className="mt-4 text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-slate-300">{description}</p>
    </div>
  );
}