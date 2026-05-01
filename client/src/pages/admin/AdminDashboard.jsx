import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle,
  Clock,
  Euro,
  Gift,
  Megaphone,
  Store,
  Users,
} from "lucide-react";
import API from "../../api/axios";
import Card from "../../components/ui/Card";

export default function AdminDashboard() {
  const [apps, setApps] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [offers, setOffers] = useState([]);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const load = async () => {
      const [appsRes, annRes, offersRes, settingsRes] = await Promise.all([
        API.get("/stalls/admin/all"),
        API.get("/announcements/admin/all"),
        API.get("/offers/admin/all"),
        API.get("/settings/admin"),
      ]);

      setApps(appsRes.data.applications || []);
      setAnnouncements(annRes.data.announcements || []);
      setOffers(offersRes.data.offers || []);
      setSettings(settingsRes.data.settings || null);
    };

    load();
  }, []);

  const stats = useMemo(() => {
    const pending = apps.filter((a) => a.status === "pending").length;
    const approved = apps.filter((a) => a.status === "approved").length;
    const paid = apps.filter((a) => a.paymentStatus === "paid").length;
    const revenue = apps
      .filter((a) => a.paymentStatus === "paid")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);

    return [
      { label: "Applications", value: apps.length, icon: Store },
      { label: "Pending", value: pending, icon: Clock },
      { label: "Approved", value: approved, icon: CheckCircle },
      { label: "Paid Revenue", value: `€${revenue}`, icon: Euro },
      { label: "Announcements", value: announcements.length, icon: Megaphone },
      { label: "Offers", value: offers.length, icon: Gift },
    ];
  }, [apps, announcements, offers]);

  return (
    <div>
      <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl">
        <p className="font-black text-emerald-400">Control Center</p>
        <h2 className="mt-2 text-4xl font-black">Fair operations overview</h2>
        <p className="mt-3 text-slate-300">
          Manage event date, stall pricing, applications, news, offers, and
          public website content.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white/10 p-5">
            <CalendarDays className="text-amber-300" />
            <p className="mt-3 text-sm text-slate-300">Event Date</p>
            <p className="text-xl font-black">
              {settings?.eventDate || "Not set"}
            </p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5">
            <Store className="text-emerald-300" />
            <p className="mt-3 text-sm text-slate-300">Food Stall Price</p>
            <p className="text-xl font-black">
              €{settings?.foodStallPrice || 0}
            </p>
          </div>
          <div className="rounded-3xl bg-white/10 p-5">
            <Users className="text-red-300" />
            <p className="mt-3 text-sm text-slate-300">Applications Open</p>
            <p className="text-xl font-black">
              {settings?.applicationOpen ? "Yes" : "No"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="shadow-xl shadow-slate-200/60">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">{stat.label}</p>
                <p className="mt-2 text-4xl font-black text-slate-950">
                  {stat.value}
                </p>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <stat.icon />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
