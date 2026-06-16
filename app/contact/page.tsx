"use client";

import { FormEvent, useState } from "react";

// 1. Structural Child Component Mapped onto Top Scope
function ContactCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl bg-slate-900 p-6 border border-slate-800/60 shadow-lg">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="mt-3 text-slate-300 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

// 2. Main Document Page Block Module
export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  // Form handling trigger pipeline
  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); // Prevents page from native raw browser reloads
    setSubmitting(true);
    
    // Simulate API Network Hit smoothly
    setTimeout(() => {
      alert("Message received successfully! Our team will contact you shortly.");
      setSubmitting(false);
    }, 1200);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col justify-center">
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        
        {/* Header Breadcrumbs Module */}
        <div>
          <p className="text-sm font-semibold text-green-400 uppercase tracking-wider">
            Contact SmartIndia.club
          </p>
          <h1 className="mt-2 text-5xl font-black tracking-tight text-white md:text-6xl">
            Get In Touch
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-300 leading-relaxed">
            For school partnerships, parent queries, student support or tournament
            information, you can contact the SmartIndia.club team.
          </p>
        </div>

        {/* Dynamic Multi-Column Segment Matrix */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <ContactCard
            title="🏫 School Partnership"
            text="For principals, teachers and coaching institutes interested in executing regional or institutional tournaments."
          />

          <ContactCard
            title="👨‍👩‍👧 Parent Support"
            text="For parents who want to understand platform safety metrics, data storage, active verification methods and learning benefits."
          />

          <ContactCard
            title="🎓 Student Help"
            text="For students who need real-time support with platform onboarding, quiz interactions, admin dashboard analytics or custom certificates."
          />
        </div>

        {/* FIX: Form action lifecycle managed with explicit accessible ids & semantic states */}
        <form 
          onSubmit={handleSubmit}
          className="mt-12 grid gap-5 rounded-3xl bg-slate-900 p-8 md:grid-cols-2 border border-slate-800/50 shadow-2xl"
        >
          {/* Full Name Form Field Container */}
          <div>
            <label htmlFor="contact_fullname" className="mb-2 block text-sm font-semibold text-slate-300">
              Full Name
            </label>
            <input
              id="contact_fullname"
              type="text"
              required
              className="w-full rounded-xl p-3 bg-white text-black font-medium border border-slate-700/40 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              placeholder="Enter your name"
            />
          </div>

          {/* Contact Identifier Form Field Container */}
          <div>
            <label htmlFor="contact_identity" className="mb-2 block text-sm font-semibold text-slate-300">
              Phone / Email
            </label>
            <input
              id="contact_identity"
              type="text"
              required
              className="w-full rounded-xl p-3 bg-white text-black font-medium border border-slate-700/40 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              placeholder="Enter phone number or email"
            />
          </div>

          {/* Classification Option Dropdown Container */}
          <div>
            <label htmlFor="contact_querytype" className="mb-2 block text-sm font-semibold text-slate-300">
              Query Type
            </label>
            <select 
              id="contact_querytype"
              className="w-full rounded-xl p-3 bg-white text-black font-semibold border border-slate-700/40 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            >
              <option value="School Partnership">School Partnership</option>
              <option value="Parent Support">Parent Support</option>
              <option value="Student Support">Student Support</option>
              <option value="General Query">General Query</option>
            </select>
          </div>

          {/* City Form Field Container */}
          <div>
            <label htmlFor="contact_city" className="mb-2 block text-sm font-semibold text-slate-300">
              City
            </label>
            <input
              id="contact_city"
              type="text"
              required
              className="w-full rounded-xl p-3 bg-white text-black font-medium border border-slate-700/40 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              placeholder="Enter city name"
            />
          </div>

          {/* Extensive Custom Message Textarea Container */}
          <div className="md:col-span-2">
            <label htmlFor="contact_message" className="mb-2 block text-sm font-semibold text-slate-300">
              Message Box
            </label>
            <textarea
              id="contact_message"
              required
              className="h-32 w-full rounded-xl p-3 bg-white text-black font-medium border border-slate-700/40 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
              placeholder="Write your brief description query message here..."
            />
          </div>

          {/* Operational Submission Dispatch Component */}
          <button 
            type="submit"
            disabled={submitting}
            className="md:col-span-2 rounded-xl bg-green-500 p-3 font-bold text-slate-950 hover:bg-green-400 disabled:opacity-50 transition-colors shadow-lg shadow-green-500/5 text-center"
          >
            {submitting ? "Submitting Message..." : "Submit Message"}
          </button>
        </form>
      </section>
    </main>
  );
}