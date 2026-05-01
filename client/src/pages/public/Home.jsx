import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Gift,
  HandHeart,
  MapPin,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Store,
  Users,
  Utensils,
  Music2,
  Palette,
} from "lucide-react";
import API from "../../api/axios";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

export default function Home() {
  const [settings, setSettings] = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const loadPublicData = async () => {
      try {
        const [settingsRes, announcementsRes, offersRes] = await Promise.all([
          API.get("/settings"),
          API.get("/announcements"),
          API.get("/offers"),
        ]);

        setSettings(settingsRes.data.settings || null);
        setAnnouncements(announcementsRes.data.announcements || []);
        setOffers(offersRes.data.offers || []);
      } catch (error) {
        console.error("Failed to load public homepage data", error);
      }
    };

    loadPublicData();
  }, []);

  const eventName = settings?.eventName || "Bengali Culture Fair Essen";
  const tagline =
    settings?.tagline ||
    "A premium digital fair platform for Bengali heritage, food, business, sponsors, and community celebration in Essen, Germany.";

  const heroImage =
    settings?.heroImageUrl && settings.heroImageUrl.trim() !== ""
      ? settings.heroImageUrl
      : "/images/fair-hero.jpg";

  const pinnedAnnouncements = useMemo(
    () => announcements.filter((item) => item.isPinned).slice(0, 2),
    [announcements],
  );

  const featuredOffers = useMemo(
    () => offers.filter((item) => item.isFeatured).slice(0, 3),
    [offers],
  );

  const stats = [
    { label: "Expected Visitors", value: "1,000+", icon: Users },
    { label: "Premium Stalls", value: "40+", icon: Store },
    { label: "Sponsors", value: "10+", icon: HandHeart },
    { label: "Culture", value: "100%", icon: Sparkles },
  ];

  const highlights = [
    { title: "Food Stalls", icon: Utensils },
    { title: "Music & Dance", icon: Music2 },
    { title: "Culture", icon: Palette },
  ];

  const features = [
    {
      icon: Store,
      title: "Stall Management",
      text: "Apply, review, approve, and manage food, fashion, service, and cultural stalls easily.",
    },
    {
      icon: ShieldCheck,
      title: "Secure & Transparent",
      text: "Clear approval process, payment tracking, stall numbers, and organizer control.",
    },
    {
      icon: Megaphone,
      title: "Promote & Grow",
      text: "Showcase Bengali businesses, sponsors, food stalls, and cultural activities online.",
    },
    {
      icon: CheckCircle2,
      title: "Real-time Dashboard",
      text: "Organizers can track applications, sponsors, payments, and fair operations live.",
    },
  ];

  return (
    <main className="overflow-hidden bg-[#fff8ee]">
      <section className="relative min-h-[840px] overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fff8ee] via-transparent to-black/30" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(45deg,rgba(255,255,255,.12)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.12)_50%,rgba(255,255,255,.12)_75%,transparent_75%,transparent)] [background-size:40px_40px]" />

        <div className="absolute -left-24 top-20 h-80 w-80 rounded-full bg-red-500/30 blur-3xl" />
        <div className="absolute right-0 top-40 h-96 w-96 rounded-full bg-amber-400/25 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-24 pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
          >
            <p className="mb-5 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-5 py-2 text-sm font-black text-amber-300 backdrop-blur">
              ✧ এসো মিলি, সংস্কৃতিকে ছড়াই ✧
            </p>

            <h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-tight md:text-7xl lg:text-8xl">
              {eventName.split(" ").slice(0, 2).join(" ")}
              <span className="block bg-gradient-to-r from-amber-300 via-red-400 to-emerald-300 bg-clip-text text-transparent">
                {eventName.split(" ").slice(2).join(" ") || "Fair Essen"}
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-100 md:text-xl">
              {tagline}
            </p>

            {pinnedAnnouncements.length > 0 && (
              <div className="mt-7 grid gap-3">
                {pinnedAnnouncements.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-2xl border border-amber-300/25 bg-amber-300/10 p-4 backdrop-blur"
                  >
                    <p className="flex items-center gap-2 text-sm font-black text-amber-300">
                      <Megaphone size={16} />
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-200">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-9 flex flex-wrap gap-4">
              {settings?.applicationOpen !== false ? (
                <Link to="/apply-stall">
                  <Button className="bg-gradient-to-r from-emerald-500 to-emerald-700 px-7 py-4 text-base shadow-xl shadow-emerald-600/30 hover:from-emerald-600 hover:to-emerald-800">
                    Apply for Stall <ArrowRight className="ml-2" size={19} />
                  </Button>
                </Link>
              ) : (
                <Button disabled className="px-7 py-4 text-base">
                  Applications Closed
                </Button>
              )}

              <Link to="/stalls">
                <Button
                  variant="outline"
                  className="border-white/30 bg-white/95 px-7 py-4 text-base text-slate-950 hover:bg-white"
                >
                  Explore Stalls
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur"
                >
                  <item.icon size={17} className="text-amber-300" />
                  <span className="text-sm font-bold">{item.title}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-amber-400/30 via-red-500/20 to-emerald-400/30 blur-2xl" />

            <div className="relative rounded-[2.5rem] border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[2rem] bg-white/95 p-6 text-slate-950">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-black text-emerald-600">
                      Live Fair Operations
                    </p>
                    <h3 className="mt-1 text-3xl font-black">
                      Organizer Console
                    </h3>
                  </div>
                  <div className="rounded-full bg-emerald-100 px-4 py-2 text-xs font-black text-emerald-700">
                    Online
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  {stats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-3xl border border-slate-100 bg-slate-50 p-5 shadow-sm"
                    >
                      <item.icon className="text-emerald-600" size={24} />
                      <p className="mt-4 text-3xl font-black">{item.value}</p>
                      <p className="text-sm font-semibold text-slate-500">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-3xl bg-slate-950 p-5 text-white">
                  <p className="text-sm text-amber-300">Stall Prices</p>
                  <p className="mt-1 text-xl font-black">
                    Food €{settings?.foodStallPrice || 0} · Regular €
                    {settings?.regularStallPrice || 0}
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    Sponsor packages from €{settings?.sponsorStartingPrice || 0}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25 }}
            className="grid gap-4 rounded-[2rem] border border-white/40 bg-white/95 p-5 text-slate-950 shadow-2xl md:grid-cols-3 lg:col-span-2"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                <MapPin />
              </div>
              <div>
                <p className="font-black">
                  {settings?.locationName || "Essen, Germany"}
                </p>
                <p className="text-sm text-slate-500">
                  {settings?.address || "Event Location"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CalendarDays />
              </div>
              <div>
                <p className="font-black">
                  {settings?.eventDate || "Coming Soon"}
                </p>
                <p className="text-sm text-slate-500">
                  {settings?.eventTime || "Official Date"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <Sparkles />
              </div>
              <div>
                <p className="font-black">Digital Platform</p>
                <p className="text-sm text-slate-500">For stalls & sponsors</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {featuredOffers.length > 0 && (
        <section className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <div className="mb-8 text-center">
            <p className="font-black uppercase tracking-widest text-amber-600">
              ✧ Active Offers ✧
            </p>
            <h2 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">
              Current stall & sponsor offers
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredOffers.map((offer) => (
              <Card
                key={offer._id}
                className="bg-white shadow-xl shadow-slate-200/60"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <Gift />
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-emerald-600">
                  {offer.offerType}
                </p>
                <h3 className="mt-2 text-xl font-black">{offer.title}</h3>
                <p className="mt-3 text-slate-600">{offer.description}</p>
                <div className="mt-5 flex items-end gap-3">
                  <p className="text-3xl font-black text-emerald-600">
                    €{offer.offerPrice}
                  </p>
                  {offer.originalPrice > 0 && (
                    <p className="mb-1 text-sm font-bold text-slate-400 line-through">
                      €{offer.originalPrice}
                    </p>
                  )}
                </div>
                {offer.validUntil && (
                  <p className="mt-2 text-sm font-bold text-slate-500">
                    Valid until: {offer.validUntil}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </section>
      )}

      <section className="relative mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <div className="relative text-center">
          <p className="font-black uppercase tracking-widest text-amber-600">
            ✧ Platform Features ✧
          </p>
          <h2 className="mt-3 text-4xl font-black text-slate-950 md:text-5xl">
            Everything managed digitally
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            From stall applications to sponsor promotion, this platform helps
            organizers manage the full fair professionally.
          </p>
        </div>

        <div className="relative mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group bg-white/90 shadow-xl shadow-slate-200/60 transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                <feature.icon size={28} />
              </div>
              <h3 className="text-xl font-black">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{feature.text}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative bg-slate-950 px-4 py-20 text-white lg:px-8">
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="font-black text-emerald-400">
              Backpunkt IT Solutions
            </p>
            <h2 className="mt-3 text-4xl font-black md:text-5xl">
              A live portfolio for your software company.
            </h2>
            <p className="mt-5 leading-8 text-slate-300">
              This project shows real-world software capability: event
              management, admin dashboard, applications, sponsors, payments, and
              digital operations.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Event Website Development",
              "Admin Dashboard System",
              "Business Automation",
              "Sponsor & Stall Management",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur transition hover:bg-white/15"
              >
                <CheckCircle2 className="text-emerald-400" />
                <p className="mt-4 text-lg font-black">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
