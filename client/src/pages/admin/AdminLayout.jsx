import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Bell,
  CalendarCog,
  Gift,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Store,
  UserRound,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user || user.role !== "admin") {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100">
        <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
          <p className="text-xl font-black">Admin access only</p>
          <Link
            to="/login"
            className="mt-4 inline-block font-bold text-emerald-600"
          >
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
    { label: "Applications", to: "/admin/applications", icon: Store },
    { label: "Event Settings", to: "/admin/settings", icon: CalendarCog },
    { label: "Announcements", to: "/admin/announcements", icon: Megaphone },
    { label: "Offers", to: "/admin/offers", icon: Gift },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <aside className="sticky top-0 h-screen border-r border-white/10 bg-slate-950 p-5 text-white lg:w-80">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-500 font-black">
            BF
          </div>
          <div>
            <h2 className="text-xl font-black">Fair Control</h2>
            <p className="text-xs text-slate-400">BanglaFair Essen Admin</p>
          </div>
        </Link>

        <nav className="mt-10 grid gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                  isActive
                    ? "bg-white text-slate-950 shadow-lg"
                    : "text-slate-300 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <item.icon size={19} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-5 left-5 right-5">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                <UserRound size={20} />
              </div>
              <div>
                <p className="font-black">{user.name}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 font-bold text-white hover:bg-red-600"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 px-5 py-4 backdrop-blur-xl lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-emerald-600">Admin Panel</p>
              <h1 className="text-2xl font-black text-slate-950">
                Bengali Culture Fair Essen
              </h1>
            </div>

            <button className="relative rounded-2xl bg-slate-100 p-3 text-slate-700">
              <Bell size={20} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>
          </div>
        </header>

        <section className="p-5 lg:p-8">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
