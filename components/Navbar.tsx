// components/Navbar.tsx
'use client';

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Make sure to install lucide-react if not already

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQ" },
    { href: "/rules", label: "Rules" },
    { href: "/announcements", label: "Announcements" },
    { href: "/tournament", label: "Tournament" },
    { href: "/practice", label: "Practice" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/profile", label: "Profile" },
    { href: "/register", label: "Register" },
  ];

  return (
    <nav className="border-b border-slate-800 bg-slate-950 text-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}

          <Link
  href="/pages"
  className="hover:text-green-400"
>
  All Pages
</Link>


          <Link href="/" className="text-2xl font-bold text-green-400 hover:text-green-300 transition-colors">
            Healthy Digital Club
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-green-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-800">
            <div className="flex flex-col gap-4 text-sm font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-green-400 transition-colors py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}