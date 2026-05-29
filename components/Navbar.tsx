import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        
        <Link
          href="/"
          className="text-xl font-bold text-green-400"
        >
          Healthy Digital Club
        </Link>

        <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-300">
          
          <Link
            href="/"
            className="hover:text-green-400"
          >
            Home
          </Link>

          <Link
  href="/about"
  className="hover:text-green-400"
>
  About
  <Link
  href="/faq"
  className="hover:text-green-400"
>
  FAQ
</Link>

</Link>
<Link
  href="/contact"
  className="hover:text-green-400"
>
  Contact
  <Link
  href="/rules"
  className="hover:text-green-400"
>
  Rules
</Link>
</Link>
<Link
  href="/announcements"
  className="hover:text-green-400"
>
  Announcements
</Link>

          <Link
            href="/tournament"
            className="hover:text-green-400"
          >
            Tournament
          </Link>

          <Link
            href="/practice"
            className="hover:text-green-400"
          >
            Practice
          </Link>

          <Link
            href="/leaderboard"
            className="hover:text-green-400"
          >
            Leaderboard
          </Link>

          <Link
            href="/dashboard"
            className="hover:text-green-400"
          >
            Dashboard

          </Link>
          <Link
  href="/profile"
  className="hover:text-green-400"
>
  Profile
</Link>

          <Link
            href="/register"
            className="hover:text-green-400"
          >
            Register
          </Link>

        </div>
      </div>
    </nav>
  );
}