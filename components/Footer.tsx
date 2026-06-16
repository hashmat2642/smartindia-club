// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Segment - Aligned with SmartIndia.club */}
          <div>
            <h3 className="text-green-400 text-xl font-bold mb-3">
              SmartIndia.club
            </h3>
            <p className="text-sm leading-relaxed">
              Empowering students through healthy digital habits, logical thinking, and competitive learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-green-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link href="/tournament" className="hover:text-green-400 transition-colors">Tournament</Link></li>
              <li><Link href="/leaderboard" className="hover:text-green-400 transition-colors">Leaderboard</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/practice" className="hover:text-green-400 transition-colors">Practice Arena</Link></li>
              <li><Link href="/rules" className="hover:text-green-400 transition-colors">Rules</Link></li>
              <li><Link href="/faq" className="hover:text-green-400 transition-colors">FAQ</Link></li>
              <li><Link href="/announcements" className="hover:text-green-400 transition-colors">Announcements</Link></li>
            </ul>
          </div>

          {/* Contact Details with Branded Domain Email */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-green-400 transition-colors">Contact Us</Link></li>
              <li className="text-sm">Email: info@smartindia.club</li>
              <li className="text-sm">Phone: +91 98765 43210</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar - Dynamic Year and Copyright Mapping */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} SmartIndia.club. All Rights Reserved.</p>
          <p className="mt-1">
            Made with ❤️ for a healthier digital future
          </p>
        </div>
      </div>
    </footer>
  );
}