export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          Tournament Registration
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Register for First Educational Skill Tournament
        </h1>

        <p className="mt-3 text-slate-300">
          Fill in the student details carefully. Registration fee is ₹50.
        </p>

        <form
          action="/success"
          className="mt-10 grid gap-5 rounded-3xl bg-slate-900 p-8 md:grid-cols-2"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Student Full Name
            </label>
            <input
              required
              className="w-full rounded-xl p-3 text-black"
              placeholder="Enter student name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Class
            </label>
            <select required className="w-full rounded-xl p-3 text-black">
              <option value="">Select class</option>
              <option>Class 3</option>
              <option>Class 4</option>
              <option>Class 5</option>
              <option>Class 6</option>
              <option>Class 7</option>
              <option>Class 8</option>
              <option>Class 9</option>
              <option>Class 10</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              School / Coaching Name
            </label>
            <input
              required
              className="w-full rounded-xl p-3 text-black"
              placeholder="Enter school or coaching name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Parent Phone Number
            </label>
            <input
              required
              className="w-full rounded-xl p-3 text-black"
              placeholder="Enter parent phone number"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Email Address
            </label>
            <input
              type="email"
              className="w-full rounded-xl p-3 text-black"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              City
            </label>
            <input
              required
              className="w-full rounded-xl p-3 text-black"
              placeholder="Enter city name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Tournament
            </label>
            <input
              readOnly
              className="w-full rounded-xl bg-slate-200 p-3 text-black"
              value="Quiz + Logic + Coding Basics"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Registration Fee
            </label>
            <input
              readOnly
              className="w-full rounded-xl bg-slate-200 p-3 text-black"
              value="₹50"
            />
          </div>

          <div className="md:col-span-2 rounded-2xl bg-slate-800 p-5">
            <label className="flex gap-3 text-sm text-slate-300">
              <input required type="checkbox" className="mt-1" />
              I confirm that the entered details are correct and I understand
              that this tournament is an educational skill-based activity.
            </label>
          </div>

          <button className="md:col-span-2 rounded-xl bg-green-500 p-3 font-bold text-slate-950 hover:bg-green-400">
            Submit Registration
          </button>
        </form>
      </section>
    </main>
  );
}