import { Link } from "react-router-dom";
import { MapPin, Mail, Phone, Sparkles, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.2),transparent_30%),radial-gradient(circle_at_80%_40%,rgba(245,158,11,0.2),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-500 text-white shadow-lg">
                <Sparkles />
              </div>
              <div>
                <p className="text-lg font-black">BanglaFair Essen</p>
                <p className="text-xs text-slate-400">Bengali Culture Fair</p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-400">
              A premium platform for managing Bengali cultural fair stalls,
              sponsors, and community events in Essen, Germany.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-black">Explore</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <Link to="/stalls" className="hover:text-white">
                Stalls
              </Link>
              <Link to="/sponsors" className="hover:text-white">
                Sponsors
              </Link>
              <Link to="/apply-stall" className="hover:text-white">
                Apply for Stall
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-black">Contact</h3>

            <div className="mt-4 flex flex-col gap-4 text-sm text-slate-400">
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-emerald-400" />
                Essen, Germany
              </div>

              <div className="flex items-center gap-3">
                <Mail size={16} className="text-emerald-400" />
                info@banglafair.de
              </div>

              <div className="flex items-center gap-3">
                <Phone size={16} className="text-emerald-400" />
                +49 xxx xxx xxx
              </div>
            </div>
          </div>

          {/* Company promo */}
          <div>
            <h3 className="text-lg font-black">Powered By</h3>

            <div className="mt-4 rounded-3xl bg-white/10 p-5 backdrop-blur">
              <p className="font-black text-emerald-400">
                Backpunkt IT Solutions
              </p>

              <p className="mt-2 text-sm text-slate-300">
                Event platforms, SaaS dashboards, and modern business systems.
              </p>

              <div className="mt-4 flex gap-3">
                <button className="rounded-full bg-white/10 p-2 hover:bg-white/20">
                  <Globe size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Bengali Culture Fair Essen. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
