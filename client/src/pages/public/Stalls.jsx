import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Store,
  MapPin,
  Utensils,
  Shirt,
  Gem,
  BookOpen,
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";
import API from "../../api/axios";
import Card from "../../components/ui/Card";

const fallbackImages = {
  food: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
  clothing:
    "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=80",
  jewelry:
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
  books:
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
  services:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80",
  other:
    "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80",
};

const typeIcons = {
  food: Utensils,
  clothing: Shirt,
  jewelry: Gem,
  books: BookOpen,
  services: BriefcaseBusiness,
  other: Sparkles,
};

export default function Stalls() {
  const [stalls, setStalls] = useState([]);
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStalls = async () => {
      try {
        const { data } = await API.get("/stalls/public");
        setStalls(data.stalls || []);
      } catch (error) {
        console.error("Failed to load stalls", error);
      } finally {
        setLoading(false);
      }
    };

    loadStalls();
  }, []);

  const types = useMemo(() => {
    const unique = [...new Set(stalls.map((stall) => stall.stallType))];
    return ["all", ...unique];
  }, [stalls]);

  const filteredStalls = useMemo(() => {
    return stalls.filter((stall) => {
      const matchesType =
        activeType === "all" || stall.stallType === activeType;

      const text =
        `${stall.businessName} ${stall.description} ${stall.stallType}`.toLowerCase();

      const matchesSearch = text.includes(search.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [stalls, search, activeType]);

  return (
    <main className="overflow-hidden bg-[#fff8ee]">
      <section className="relative bg-slate-950 px-4 py-20 text-white lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.22),transparent_30%),radial-gradient(circle_at_80%_40%,rgba(245,158,11,0.2),transparent_30%)]" />
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(45deg,rgba(255,255,255,.12)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.12)_50%,rgba(255,255,255,.12)_75%,transparent_75%,transparent)] [background-size:42px_42px]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <p className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-5 py-2 text-sm font-black text-amber-300 backdrop-blur">
              ✧ Fair Marketplace ✧
            </p>

            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              Explore approved{" "}
              <span className="bg-gradient-to-r from-amber-300 via-red-400 to-emerald-300 bg-clip-text text-transparent">
                stalls
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Discover food, fashion, services, books, cultural products, and
              community businesses joining Bengali Culture Fair Essen.
            </p>
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
                placeholder="Search stall, food, clothing, service..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-5 font-semibold outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`rounded-2xl px-5 py-3 text-sm font-black capitalize transition ${
                    activeType === type
                      ? "bg-slate-950 text-white shadow-lg"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div>
            <p className="font-black text-emerald-600">Approved Businesses</p>
            <h2 className="mt-1 text-3xl font-black text-slate-950">
              {filteredStalls.length} stall{filteredStalls.length !== 1 && "s"}{" "}
              found
            </h2>
          </div>

          <div className="hidden rounded-full bg-emerald-50 px-5 py-3 text-sm font-black text-emerald-700 md:block">
            Live from admin approval
          </div>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-[2rem] bg-white shadow-sm"
              />
            ))}
          </div>
        ) : filteredStalls.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Store size={30} />
            </div>
            <h3 className="mt-5 text-2xl font-black">No approved stalls yet</h3>
            <p className="mx-auto mt-2 max-w-md text-slate-500">
              Once organizers approve stall applications, they will appear here
              automatically.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {filteredStalls.map((stall, index) => {
              const Icon = typeIcons[stall.stallType] || Sparkles;
              const image =
                stall.images?.[0] ||
                stall.logoUrl ||
                fallbackImages[stall.stallType] ||
                fallbackImages.other;

              return (
                <motion.div
                  key={stall._id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                >
                  <Card className="group overflow-hidden p-0 shadow-xl shadow-slate-200/60 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={image}
                        alt={stall.businessName}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                      <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-black capitalize text-slate-950 backdrop-blur">
                        <Icon size={15} className="text-emerald-600" />
                        {stall.stallType}
                      </div>

                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-black text-white">
                          {stall.businessName}
                        </h3>
                        <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-200">
                          <MapPin size={15} />
                          Stall No: {stall.stallNumber || "TBA"}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="line-clamp-3 leading-7 text-slate-600">
                        {stall.description}
                      </p>

                      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
                            Size
                          </p>
                          <p className="font-black capitalize">
                            {stall.requestedStallSize || "Standard"}
                          </p>
                        </div>

                        <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700">
                          Approved
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
