export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          Contact SmartIndia.club
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          Get In Touch
        </h1>

        <p className="mt-5 max-w-3xl text-slate-300">
          For school partnerships, parent queries, student support or tournament
          information, you can contact the SmartIndia.club team.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <ContactCard
            title="🏫 School Partnership"
            text="For principals, teachers and coaching institutes interested in educational tournaments."
          />

          <ContactCard
            title="👨‍👩‍👧 Parent Support"
            text="For parents who want to understand safety, participation and learning benefits."
          />

          <ContactCard
            title="🎓 Student Help"
            text="For students who need help with registration, quiz, dashboard or certificates."
          />
        </div>

        <form className="mt-12 grid gap-5 rounded-3xl bg-slate-900 p-8 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Full Name
            </label>
            <input
              className="w-full rounded-xl p-3 text-black"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Phone / Email
            </label>
            <input
              className="w-full rounded-xl p-3 text-black"
              placeholder="Enter phone or email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Query Type
            </label>
            <select className="w-full rounded-xl p-3 text-black">
              <option>School Partnership</option>
              <option>Parent Support</option>
              <option>Student Support</option>
              <option>General Query</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              City
            </label>
            <input
              className="w-full rounded-xl p-3 text-black"
              placeholder="Enter city"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold">
              Message
            </label>
            <textarea
              className="h-32 w-full rounded-xl p-3 text-black"
              placeholder="Write your message"
            />
          </div>

          <button className="md:col-span-2 rounded-xl bg-green-500 p-3 font-bold text-slate-950 hover:bg-green-400">
            Submit Message
          </button>
        </form>
      </section>
    </main>
  );
}

function ContactCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl bg-slate-900 p-6">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-3 text-slate-300">{text}</p>
    </div>
  );
}