// components/Navbar.tsx
'use client';

import { Menu, X, Circle, GraduationCap, ChevronDown, Info, HelpCircle, FileText, Bell, LogOut, UserCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("hdc_logged_student_id");
    setActiveStudentId(null);
    window.dispatchEvent(new Event("hdc_auth_change"));
    // Redirect to dashboard page
    window.location.href = "/dashboard";
  };

  const primaryLinks = [
    { href: "/", label: "Home" },
    { href: "/tournament", label: "Tournament" },
    { href: "/practice", label: "Practice" },
    { href: "/leaderboard", label: "Leaderboard" },
  ];

  const resourceLinks = [
    { href: "/about", label: "About Platform", icon: <Info className="w-4 h-4 text-green-400" /> },
    { href: "/rules", label: "Tournament Rules", icon: <FileText className="w-4 h-4 text-green-400" /> },
    { href: "/faq", label: "FAQ & Support", icon: <HelpCircle className="w-4 h-4 text-green-400" /> },
    { href: "/announcements", label: "Announcements", icon: <Bell className="w-4 h-4 text-green-400" /> },
  ];

  return (
    <nav className="border-b border-slate-900 bg-slate-950/95 text-white sticky top-0 z-50 backdrop-blur-md shadow-lg shadow-slate-950/20">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo - Updated to SmartIndia.club */}
          <Link href="/" className="text-2xl font-black text-green-450 hover:text-green-300 transition-colors tracking-tight flex items-center gap-2">
            SmartIndia<span className="text-green-400">.club</span>
          </Link>

          {/* Desktop Navigation Row Layout */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {primaryLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors py-1 px-1.5 rounded-lg text-slate-350 hover:text-green-400 ${
                    isActive ? "text-green-400 font-bold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {/* Resources Dropdown Trigger */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 transition-colors text-slate-350 hover:text-green-400 focus:outline-none cursor-pointer py-1 px-1.5 rounded-lg"
              >
                <span>Resources</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2.5 w-56 bg-slate-900 border border-slate-800 rounded-2xl p-2 shadow-2xl relative z-50">
                  {resourceLinks.map((sublink) => (
                    <Link
                      key={sublink.href}
                      href={sublink.href}
                      onClick={() => setIsDropdownOpen(false)}
                      className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-slate-850 transition-all ${
                        pathname === sublink.href ? "bg-slate-950 text-white font-bold" : ""
                      }`}
                    >
                      {sublink.icon}
                      <span>{sublink.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <span className="text-slate-850">|</span>
            
            {/* Action Buttons depending on login status */}
            {activeStudentId ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/profile"
                  className="flex items-center gap-1.5 text-xs rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 px-3 py-2 text-slate-300 transition-all font-semibold"
                >
                  <UserCheck className="w-3.5 h-3.5 text-green-400" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-xs rounded-xl border border-green-500/10 bg-green-500/10 px-3.5 py-2 text-green-400 hover:bg-green-500/20 transition-all font-bold tracking-wide"
                >
                  <Circle className="w-1.5 h-1.5 fill-green-400 text-green-400 animate-pulse" />
                  <span>Portal</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-xs rounded-xl border border-slate-900 hover:border-red-500/20 hover:bg-red-500/5 px-2.5 py-2 text-slate-400 hover:text-red-400 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/register"
                  className="text-xs text-slate-300 hover:text-green-400 transition-all font-bold px-1 py-1"
                >
                  Register
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-xs rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 hover:border-slate-700 px-4 py-2 text-slate-200 transition-all font-bold"
                >
                  <GraduationCap className="w-4 h-4 text-green-400" />
                  <span>Student Login</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-slate-900">
            <div className="flex flex-col gap-4 text-sm font-medium">
              
              {/* Primary Links */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2">Navigation</span>
                {primaryLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`transition-colors py-2 pl-2 rounded-xl text-slate-300 hover:text-green-400 hover:bg-slate-900/50 ${
                        isActive ? "text-green-400 font-bold bg-slate-900/80 pl-3 border-l-2 border-green-500" : ""
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Resource Links (Collapsible/Listed directly on Mobile) */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-2">Resources</span>
                <div className="grid grid-cols-2 gap-2 pl-2">
                  {resourceLinks.map((sublink) => (
                    <Link
                      key={sublink.href}
                      href={sublink.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 rounded-xl p-2 text-xs text-slate-400 hover:text-white hover:bg-slate-900 transition-all ${
                        pathname === sublink.href ? "bg-slate-900 text-white font-bold" : ""
                      }`}
                    >
                      {sublink.icon}
                      <span>{sublink.label.split(" ")[0]}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons depending on login status */}
              <div className="border-t border-slate-900 pt-4 flex flex-col gap-2">
                {activeStudentId ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded-xl border border-slate-850">
                      <span className="text-xs text-slate-400">Roll No:</span>
                      <span className="text-xs font-mono font-bold text-green-400">{activeStudentId}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-1 text-xs rounded-xl border border-slate-800 bg-slate-900 px-3 py-2.5 text-slate-300 font-bold"
                      >
                        Profile
                      </Link>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-1.5 text-xs rounded-xl bg-green-500 text-slate-950 font-bold px-3 py-2.5"
                      >
                        Portal Hub
                      </Link>
                    </div>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-950/10 p-2.5 text-xs font-bold text-red-400 hover:text-red-300 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center text-xs rounded-xl border border-slate-800 bg-slate-900/50 p-3 text-slate-300 font-bold"
                    >
                      Register
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-1.5 text-xs rounded-xl bg-green-500 text-slate-950 font-bold p-3"
                    >
                      <GraduationCap className="w-4 h-4 fill-slate-950 text-slate-950" />
                      <span>Student Login</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}