// components/Navbar.tsx
'use client';

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
          
          {/* Brand Logo - Updated to SmartIndia.club */}
          <Link href="/" className="text-2xl font-black text-green-400 hover:text-green-300 transition-colors tracking-tight">
            SmartIndia.club
          </Link>

          {/* Desktop Navigation Row Layout */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-green-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Quick Access Utility Link */}
            <span className="text-slate-700">|</span>
            <Link
              href="/pages"
              className="text-xs rounded-lg border border-slate-800 bg-slate-900/60 px-2.5 py-1 text-slate-400 hover:text-green-400 hover:border-slate-700 transition-all"
            >
              All Pages
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-800">
            <div className="flex flex-col gap-3 text-sm font-medium">
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
              
              <div className="border-t border-slate-900 pt-3 mt-1">
                <Link
                  href="/pages"
                  className="inline-block text-xs text-slate-400 hover:text-green-400 py-1"
                  onClick={() => setIsOpen(false)}
                >
                  📂 View All Pages
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}