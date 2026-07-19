// components/Navbar.tsx
'use client';

import { Menu, X, Circle, GraduationCap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Read session on path transitions or mount
    const loggedId = localStorage.getItem("hdc_logged_student_id");
    setTimeout(() => {
      setActiveStudentId(loggedId);
    }, 0);

    // Dynamic custom event listener for instant state sync
    const handleAuthChange = () => {
      const updatedId = localStorage.getItem("hdc_logged_student_id");
      setActiveStudentId(updatedId);
    };

    window.addEventListener("hdc_auth_change", handleAuthChange);
    return () => {
      window.removeEventListener("hdc_auth_change", handleAuthChange);
    };
  }, [pathname]);

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
    <nav className="border-b border-slate-900 bg-slate-950 text-white sticky top-0 z-50 backdrop-blur-md bg-slate-950/90">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - Updated to SmartIndia.club */}
          <Link href="/" className="text-2xl font-black text-green-400 hover:text-green-300 transition-colors tracking-tight flex items-center gap-2">
            SmartIndia.club
          </Link>

          {/* Desktop Navigation Row Layout */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors ${
                    isActive ? "text-green-450 font-bold" : "text-slate-300 hover:text-green-400"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {/* Quick Access Utility Link */}
            <span className="text-slate-800">|</span>
            
            {activeStudentId ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 text-xs rounded-xl border border-green-550/20 bg-green-500/10 px-3 py-1.5 text-green-400 hover:bg-green-500/20 transition-all font-bold tracking-wide"
              >
                <Circle className="w-2 h-2 fill-green-400 text-green-400 animate-pulse" />
                <span>Active: {activeStudentId}</span>
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="flex items-center gap-1.5 text-xs rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-slate-400 hover:text-green-450 hover:border-slate-700 transition-all font-semibold"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Student Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-slate-900">
            <div className="flex flex-col gap-3 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors py-1 ${
                      isActive ? "text-green-450 font-bold pl-2 border-l-2 border-green-500" : "text-slate-300 hover:text-green-400"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                );
              })}
              
              <div className="border-t border-slate-900 pt-3 mt-1 flex justify-between items-center">
                {activeStudentId ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-xs rounded-xl border border-green-550/20 bg-green-500/10 px-3 py-2 text-green-400 font-bold"
                  >
                    <Circle className="w-1.5 h-1.5 fill-green-400 text-green-400 animate-pulse" />
                    <span>Logged In: {activeStudentId}</span>
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-1.5 text-xs rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2 text-slate-405 font-bold"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Portal Authentication</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}