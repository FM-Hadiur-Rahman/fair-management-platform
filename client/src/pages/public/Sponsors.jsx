import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Crown,
  Gem,
  HandHeart,
  Medal,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import API from "../../api/axios";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const levelStyles = {
  gold: {
    icon: Crown,
    label: "Gold Sponsor",
    badge: "bg-amber-100 text-amber-700",
    card: "from-amber-100 via-white to-white",
  },
  silver: {
    icon: Medal,
    label: "Silver Sponsor",
    badge: "bg-slate-100 text-slate-700",
    card: "from-slate-100 via-white to-white",
  },
  bronze: {
    icon: ShieldCheck,
    label: "Bronze Sponsor",
    badge: "bg-orange-100 text-orange-700",
    card: "from-orange-100 via-white to-white",
  },
  partner: {
    icon: HandHeart,
    label: "Community Partner",
    badge: "bg-emerald-100 text-emerald-700",
    card: "from-emerald-100 via-white to-white",
  },
};

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [search, setSearch] = useState("");
  const [activeLevel, setActiveLevel] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSponsors = async () => {
      try {
        const { data } = await API.get("/sponsors");
        setSponsors(data.sponsors || []);
      } catch (error) {
        console.error("Failed to load sponsors", error);
      } finally {
        setLoading(false);
      }
    };

    loadSponsors();
  }, []);

  const levels = useMemo(() => {
    const unique = [...new Set(sponsors.map((item) => item.level))];
    return ["all", ...unique];
  }, [sponsors]);

  const filteredSponsors = useMemo(() => {
    return sponsors.filter((sponsor) => {
      const matchesLevel =
        activeLevel === "all" || sponsor.level === activeLevel;

      const matchesSearch = `${sponsor.name} ${sponsor.level}`
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesLevel && matchesSearch;
    });
  }, [sponsors, search, activeLevel]);

  return (
    <main className="overflow-hidden bg-[#fff8ee]">
      <section className="relative bg-slate-950 px-4 py-20 text-white lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.25),transparent_30%),radial-gradient(circle_at_80%_40%,rgba(245,158,11,0.22),transparent_30%)]" />
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(45deg,rgba(255,255,255,.12)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.12)_50%,rgba(255,255,255,.12)_75%,transparent_75%,transparent)] [background-size:42px_42px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-5 py-2 text-sm font-black text-amber-300 backdrop-blur">
              ✧ Sponsors & Partners ✧
            </p>

            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              Powered by{" "}
              <span className="bg-gradient-to-r from-amber-300 via-red-400 to-emerald-300 bg-clip-text text-transparent">
                community support
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Our sponsors help make Bengali Culture Fair Essen possible —
              supporting culture, businesses, families, and the Bengali
              community in Germany.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button className="bg-gradient-to-r from-emerald-500 to-emerald-700 px-7 py-4 shadow-xl shadow-emerald-600/25 hover:from-emerald-600 hover:to-emerald-800">
                Become a Sponsor
              </Button>

              <Button
                variant="outline"
                className="border-white/30 bg-white/95 px-7 py-4 text-slate-950 hover:bg-white"
              >
                Download Sponsor Pack
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-[2.5rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="rounded-[2rem] bg-white p-6 text-slate-950">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-black text-emerald-600">
                    Sponsor Overview
                  </p>
                  <h2 className="mt-1 text-3xl font-black">
                    Partnership tiers
                  </h2>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <Gem />
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ["Gold", "Main visibility"],
                  ["Silver", "Premium promotion"],
                  ["Bronze", "Community support"],
                  ["Partner", "Local partner"],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="rounded-3xl border border-slate-100 bg-slate-50 p-5"
                  >
                    <p className="text-2xl font-black">{title}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-500">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="relative -mt-24 rounded-[2rem] border border-white/60 bg-white/90 p-5 shadow-2xl backdrop-blur-xl">
          <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search sponsor or partner..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-5 font-semibold outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveLevel(level)}
                  className={`rounded-2xl px-5 py-3 text-sm font-black capitalize transition ${
                    activeLevel === level
                      ? "bg-slate-950 text-white shadow-lg"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div>
            <p className="font-black text-emerald-600">Official Supporters</p>
            <h2 className="mt-1 text-3xl font-black text-slate-950">
              {filteredSponsors.length} sponsor
              {filteredSponsors.length !== 1 && "s"} found
            </h2>
          </div>

          <div className="hidden rounded-full bg-amber-50 px-5 py-3 text-sm font-black text-amber-700 md:block">
            Culture • Business • Community
          </div>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="h-80 animate-pulse rounded-[2rem] bg-white shadow-sm"
              />
            ))}
          </div>
        ) : filteredSponsors.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <HandHeart size={30} />
            </div>
            <h3 className="mt-5 text-2xl font-black">No sponsors added yet</h3>
            <p className="mx-auto mt-2 max-w-md text-slate-500">
              Once the admin adds sponsors, they will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
            {filteredSponsors.map((sponsor, index) => {
              const styles = levelStyles[sponsor.level] || levelStyles.partner;
              const Icon = styles.icon;

              return (
                <motion.div
                  key={sponsor._id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                >
                  <Card
                    className={`group relative overflow-hidden bg-gradient-to-br ${styles.card} p-0 shadow-xl shadow-slate-200/60 transition duration-300 hover:-translate-y-2 hover:shadow-2xl`}
                  >
                    <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-white/70 blur-2xl" />

                    <div className="relative p-6">
                      <div className="flex items-center justify-between gap-4">
                        <span
                          className={`rounded-full px-4 py-2 text-xs font-black ${styles.badge}`}
                        >
                          {styles.label}
                        </span>

                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-950 shadow-sm">
                          <Icon size={20} />
                        </div>
                      </div>

                      <div className="mt-8 flex h-28 items-center justify-center rounded-[1.5rem] border border-white/80 bg-white/80 p-5">
                        {sponsor.logoUrl ? (
                          <img
                            src={sponsor.logoUrl}
                            alt={sponsor.name}
                            className="max-h-20 max-w-full object-contain transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-950 text-3xl font-black text-white">
                            {sponsor.name?.charAt(0)}
                          </div>
                        )}
                      </div>

                      <h3 className="mt-6 text-xl font-black text-slate-950">
                        {sponsor.name}
                      </h3>

                      <p className="mt-2 text-sm font-semibold capitalize text-slate-500">
                        {sponsor.level || "partner"} supporter
                      </p>

                      {sponsor.website && (
                        <a
                          href={sponsor.website}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700"
                        >
                          Visit Website
                        </a>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        <section className="mt-16 overflow-hidden rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-2xl lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="font-black text-emerald-400">Sponsor Opportunity</p>
              <h2 className="mt-2 text-3xl font-black md:text-5xl">
                Promote your brand to the Bengali community in Essen.
              </h2>
              <p className="mt-4 max-w-2xl leading-8 text-slate-300">
                Become a sponsor and get visibility on the website, event
                materials, and community promotions.
              </p>
            </div>

            <Button className="bg-gradient-to-r from-amber-400 to-orange-500 px-8 py-4 text-base text-slate-950 shadow-xl shadow-amber-500/20 hover:from-amber-300 hover:to-orange-400">
              Contact Organizer
              <Sparkles className="ml-2" size={18} />
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}
