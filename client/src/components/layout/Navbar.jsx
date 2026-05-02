import { Link, NavLink } from "react-router-dom";
import { Menu, X, LayoutDashboard, LogOut, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Home", to: "/" },
    { label: "Stalls", to: "/stalls" },
    { label: "Sponsors", to: "/sponsors" },
    { label: "Photo Gallery", to: "/gallery" },
    { label: "Apply", to: "/apply-stall" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 text-white transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-slate-950/90 shadow-2xl backdrop-blur-xl"
          : "bg-slate-950"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_85%_30%,rgba(245,158,11,0.18),transparent_28%)]" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/" onClick={() => setOpen(false)} className="shrink-0">
            <img
              src="/logo.png"
              alt="BanglaMela Essen Logo"
              className="h-12 w-12 rounded-2xl object-contain shadow-xl sm:h-14 sm:w-14"
            />
          </Link>

          <div className="min-w-0 leading-tight">
            <Link to="/" onClick={() => setOpen(false)}>
              <p className="truncate text-base font-black tracking-tight text-white sm:text-lg">
                BanglaMela Essen
              </p>
            </Link>

            <a
              href="https://it.backpunkt-management.de/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-[10px] font-black transition hover:opacity-80 sm:text-xs"
            >
              <span className="text-yellow-300">Powered by</span>
              <span className="text-emerald-300 hover:underline">
                Backpunkt IT Solutions
              </span>
            </a>
          </div>
        </div>

        <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-5 py-2 text-sm font-bold transition ${
                  isActive
                    ? "bg-white text-slate-950"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user?.role === "admin" && (
            <Link to="/admin">
              <Button
                variant="outline"
                className="border-white/20 bg-white/10 text-white hover:bg-white hover:text-slate-950"
              >
                <LayoutDashboard size={16} className="mr-2" />
                Admin
              </Button>
            </Link>
          )}

          {user ? (
            <Button onClick={logout} className="bg-red-500 hover:bg-red-600">
              <LogOut size={16} className="mr-2" />
              Logout
            </Button>
          ) : (
            <Link to="/login">
              <Button className="bg-gradient-to-r from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-600/25 hover:from-emerald-600 hover:to-emerald-800">
                <UserRound size={16} className="mr-2" />
                Login
              </Button>
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="relative z-50 shrink-0 rounded-2xl border border-white/10 bg-white/10 p-3 text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="relative z-50 border-t border-white/10 bg-slate-950 px-4 py-5 md:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 font-semibold transition ${
                    isActive
                      ? "bg-white text-slate-950"
                      : "bg-white/5 text-slate-200 hover:bg-white/10"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {user?.role === "admin" && (
              <NavLink
                to="/admin"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-emerald-500/10 px-4 py-3 font-bold text-emerald-300"
              >
                Admin Dashboard
              </NavLink>
            )}

            {user ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="rounded-2xl bg-red-500/10 px-4 py-3 text-left font-bold text-red-300"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-emerald-600 px-4 py-3 text-center font-bold text-white"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
