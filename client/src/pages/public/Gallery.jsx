import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Camera, ImageIcon, Search, Sparkles } from "lucide-react";
import API from "../../api/axios";
import Card from "../../components/ui/Card";

const fallbackImages = [
  "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80",
];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        const { data } = await API.get("/gallery");
        setImages(data.images || []);
      } catch (error) {
        console.error("Failed to load gallery", error);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(images.map((item) => item.category))];
    return ["all", ...unique];
  }, [images]);

  const filteredImages = useMemo(() => {
    return images.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      const matchesSearch = `${item.title} ${item.caption} ${item.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [images, search, activeCategory]);

  return (
    <main className="overflow-hidden bg-[#fff8ee]">
      <section className="relative bg-slate-950 px-4 py-20 text-white lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.25),transparent_30%),radial-gradient(circle_at_80%_40%,rgba(245,158,11,0.22),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl"
          >
            <p className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-5 py-2 text-sm font-black text-amber-300 backdrop-blur">
              ✧ ছবি ঘর ✧
            </p>

            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              Chobi Ghor —{" "}
              <span className="bg-gradient-to-r from-amber-300 via-red-400 to-emerald-300 bg-clip-text text-transparent">
                fair memories
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              A beautiful photo gallery for cultural moments, food stalls,
              sponsors, community memories, and Bengali fair highlights.
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
                placeholder="Search photos, food, culture, sponsors..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-14 pr-5 font-semibold outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-2xl px-5 py-3 text-sm font-black capitalize transition ${
                    activeCategory === category
                      ? "bg-slate-950 text-white shadow-lg"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div>
            <p className="font-black text-emerald-600">Photo Gallery</p>
            <h2 className="mt-1 text-3xl font-black text-slate-950">
              {filteredImages.length} photo
              {filteredImages.length !== 1 && "s"} found
            </h2>
          </div>

          <div className="hidden rounded-full bg-amber-50 px-5 py-3 text-sm font-black text-amber-700 md:block">
            Bengali Fair Memories
          </div>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-[2rem] bg-white shadow-sm"
              />
            ))}
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="mt-10 rounded-[2rem] border border-dashed border-slate-300 bg-white p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <ImageIcon size={30} />
            </div>
            <h3 className="mt-5 text-2xl font-black">No photos yet</h3>
            <p className="mx-auto mt-2 max-w-md text-slate-500">
              Once the admin uploads Chobi Ghor photos, they will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-10 columns-1 gap-7 space-y-7 md:columns-2 lg:columns-3">
            {filteredImages.map((item, index) => {
              const image =
                item.imageUrl || fallbackImages[index % fallbackImages.length];

              return (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  className="break-inside-avoid"
                >
                  <Card className="group overflow-hidden p-0 shadow-xl shadow-slate-200/60 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="relative overflow-hidden">
                      <img
                        src={image}
                        alt={item.title}
                        className="w-full object-cover transition duration-700 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-90" />

                      <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-black capitalize text-slate-950 backdrop-blur">
                        {item.category || "memory"}
                      </div>

                      {item.isFeatured && (
                        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-xs font-black text-slate-950">
                          <Sparkles size={14} />
                          Featured
                        </div>
                      )}

                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-emerald-600">
                          <Camera size={20} />
                        </div>

                        <h3 className="text-2xl font-black text-white">
                          {item.title}
                        </h3>

                        {item.caption && (
                          <p className="mt-2 line-clamp-2 text-sm font-medium text-slate-200">
                            {item.caption}
                          </p>
                        )}
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
