import Link from "next/link";

export default function ExportPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Export Data
        </h1>

        <p className="mt-3 text-slate-300">
          Download student records.
        </p>

        <div className="mt-10 rounded-3xl bg-slate-900 p-6">
          <a
            href="/api/export"
            className="rounded-xl bg-green-500 px-6 py-3 font-bold text-black"
          >
            Download CSV
          </a>
        </div>

        <Link
          href="/admin"
          className="mt-6 inline-block text-green-400"
        >
          Back to Admin
        </Link>
      </section>
    </main>
  );
}