export default function FAQPage() {
  const faqs = [
    {
      question: "SmartIndia.club kya hai?",
      answer:
        "SmartIndia.club ek educational skill development platform hai jahan students quiz, logic aur coding basics ke through learn, compete aur grow karte hain.",
    },
    {
      question: "Kya ye gaming platform hai?",
      answer:
        "Nahi. Ye gaming ya money-focused platform nahi hai. Ye educational-first platform hai jo confidence, logic, coding exposure aur healthy competition par focus karta hai.",
    },
    {
      question: "Kaun participate kar sakta hai?",
      answer:
        "Class 3 se Class 10 tak ke students beginner-friendly educational tournament me participate kar sakte hain.",
    },
    {
      question: "Registration fee kitni hai?",
      answer:
        "First Educational Skill Tournament ke liye registration fee ₹50 per student hai.",
    },
    {
      question: "Students ko kya benefit milega?",
      answer:
        "Students confidence build karenge, problem-solving skills improve karenge, coding basics seekhenge, progress track karenge aur certificates receive karenge.",
    },
    {
      question: "Parents ko trust kyu karna chahiye?",
      answer:
        "Platform student-first, transparent, educational-focused aur fair competition model par based hai. No fake promises, no unhealthy competition.",
    },
    {
      question: "Result kaise decide hoga?",
      answer:
        "Result score, accuracy aur completion time ke basis par calculate hoga. Top students class-wise select honge.",
    },
    {
      question: "Certificate milega?",
      answer:
        "Haan. Participation certificates aur top performers ke liye recognition certificates provide kiye jayenge.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-semibold text-green-400">
          Frequently Asked Questions
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          SmartIndia.club FAQ
        </h1>

        <p className="mt-5 max-w-3xl text-slate-300">
          Common questions from students, parents, teachers and schools about
          SmartIndia.club.
        </p>

        <div className="mt-10 space-y-5">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-3xl bg-slate-900 p-6">
              <h2 className="text-xl font-bold text-green-400">
                {faq.question}
              </h2>

              <p className="mt-3 text-slate-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}