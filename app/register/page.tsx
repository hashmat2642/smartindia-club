"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const studentId = `SIC-${Date.now()}`;
    const certificateId = `SIC-CERT-${Date.now()}`;

    const studentData = {
      student_id: studentId,
      name: String(formData.get("name")),
      class_name: String(formData.get("class_name")),
      school_name: String(formData.get("school_name")),
      score: 0,
      rank: "Pending",
      certificate_id: certificateId,
    };

    const { error } = await supabase.from("students").insert([studentData]);

    setLoading(false);

    if (error) {
      alert("Registration failed: " + error.message);
      return;
    }

    router.push(`/success?studentId=${studentId}`);
  }

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
          onSubmit={handleSubmit}
          className="mt-10 grid gap-5 rounded-3xl bg-slate-900 p-8 md:grid-cols-2"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Student Full Name
            </label>
            <input
              name="name"
              required
              className="w-full rounded-xl p-3 text-black"
              placeholder="Enter student name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">Class</label>
            <select
              name="class_name"
              required
              className="w-full rounded-xl p-3 text-black"
            >
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
              name="school_name"
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
              name="parent_phone"
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
              name="email"
              type="email"
              className="w-full rounded-xl p-3 text-black"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">City</label>
            <input
              name="city"
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

          <div className="rounded-2xl bg-slate-800 p-5 md:col-span-2">
            <label className="flex gap-3 text-sm text-slate-300">
              <input required type="checkbox" className="mt-1" />
              I confirm that the entered details are correct and I understand
              that this tournament is an educational skill-based activity.
            </label>
          </div>

          <button
            disabled={loading}
            className="rounded-xl bg-green-500 p-3 font-bold text-slate-950 hover:bg-green-400 disabled:opacity-60 md:col-span-2"
          >
            {loading ? "Submitting..." : "Submit Registration"}
          </button>
        </form>
      </section>
    </main>
  );
}