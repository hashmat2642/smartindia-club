export default function AdminAnnouncementsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          Announcement Management
        </h1>

        <div className="mt-10 rounded-3xl bg-slate-900 p-6">
          <input
            type="text"
            placeholder="Announcement Title"
            className="w-full rounded-xl p-3 text-black"
          />

          <textarea
            placeholder="Announcement Description"
            className="mt-4 w-full rounded-xl p-3 text-black"
            rows={5}
          />

          <button
            className="mt-4 rounded-xl bg-green-500 px-6 py-3 font-bold text-black"
          >
            Save Announcement
          </button>
        </div>
      </section>
    </main>
  );
}