import Link from "next/link";

export default function AllPagesPage() {
  const pages = [
    { title: "Home", link: "/" },
    { title: "About", link: "/about" },
    { title: "Tournament", link: "/tournament" },
    { title: "Practice", link: "/practice" },
    { title: "Leaderboard", link: "/leaderboard" },
    { title: "Achievements", link: "/achievements" },
    { title: "Announcements", link: "/announcements" },
    { title: "Dashboard", link: "/dashboard" },
    { title: "Profile", link: "/profile" },
    { title: "Register", link: "/register" },
    { title: "Certificate Center", link: "/certificate" },
    { title: "FAQ", link: "/faq" },
    { title: "Rules", link: "/rules" },
    { title: "Contact", link: "/contact" },
    { title: "Admin Panel", link: "/admin" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-5xl font-bold">
          SmartIndia.club Pages
        </h1>

        <p className="mt-3 text-slate-300">
          Quick access to all pages of the platform.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {pages.map((page) => (
            <Link
              key={page.link}
              href={page.link}
              className="rounded-3xl bg-slate-900 p-6 transition hover:scale-105 hover:border hover:border-green-500"
            >
              <h2 className="text-2xl font-bold">
                {page.title}
              </h2>

              <p className="mt-2 text-slate-400">
                Open {page.title} page
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}