import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/axios";
import Button from "../../components/ui/Button";

export default function AdminOffers() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    offerType: "stall",
    originalPrice: 0,
    offerPrice: 0,
    validUntil: "",
    isFeatured: false,
    isPublished: true,
  });

  const load = async () => {
    const { data } = await API.get("/offers/admin/all");
    setItems(data.offers || []);
  };

  useEffect(() => {
    load();
  }, []);

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const create = async (e) => {
    e.preventDefault();

    try {
      await API.post("/offers/admin", form);
      toast.success("Offer created");
      setForm({
        title: "",
        description: "",
        offerType: "stall",
        originalPrice: 0,
        offerPrice: 0,
        validUntil: "",
        isFeatured: false,
        isPublished: true,
      });
      load();
    } catch {
      toast.error("Failed to create offer");
    }
  };

  const togglePublish = async (item) => {
    await API.patch(`/offers/admin/${item._id}`, {
      isPublished: !item.isPublished,
    });
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this offer?")) return;
    await API.delete(`/offers/admin/${id}`);
    toast.success("Deleted");
    load();
  };

  return (
    <div>
      <p className="font-black text-emerald-600">Offers</p>
      <h2 className="mt-2 text-4xl font-black text-slate-950">
        Stall, sponsor, and early-bird offers
      </h2>

      <form
        onSubmit={create}
        className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/60"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <input
            name="title"
            value={form.title}
            onChange={update}
            placeholder="Offer title"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold outline-none"
          />

          <select
            name="offerType"
            value={form.offerType}
            onChange={update}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold outline-none"
          >
            <option value="stall">Stall</option>
            <option value="sponsor">Sponsor</option>
            <option value="early_bird">Early Bird</option>
            <option value="community">Community</option>
            <option value="other">Other</option>
          </select>

          <input
            name="originalPrice"
            type="number"
            value={form.originalPrice}
            onChange={update}
            placeholder="Original price"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold outline-none"
          />

          <input
            name="offerPrice"
            type="number"
            value={form.offerPrice}
            onChange={update}
            placeholder="Offer price"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold outline-none"
          />

          <input
            name="validUntil"
            value={form.validUntil}
            onChange={update}
            placeholder="Valid until"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold outline-none"
          />

          <div className="grid grid-cols-2 gap-4">
            <label className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 font-black">
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={update}
              />
              Featured
            </label>

            <label className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 font-black">
              <input
                type="checkbox"
                name="isPublished"
                checked={form.isPublished}
                onChange={update}
              />
              Publish
            </label>
          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={update}
            placeholder="Offer description..."
            className="min-h-32 rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold outline-none md:col-span-2"
          />
        </div>

        <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700">
          Create Offer
        </Button>
      </form>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <div
            key={item._id}
            className="rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/60"
          >
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black capitalize text-emerald-700">
                {item.offerType}
              </span>
              {item.isFeatured && (
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">
                  Featured
                </span>
              )}
            </div>

            <h3 className="mt-4 text-xl font-black">{item.title}</h3>
            <p className="mt-2 text-slate-600">{item.description}</p>

            <div className="mt-5 flex items-end gap-3">
              <p className="text-3xl font-black text-emerald-600">
                €{item.offerPrice}
              </p>
              <p className="mb-1 text-sm font-bold text-slate-400 line-through">
                €{item.originalPrice}
              </p>
            </div>

            <p className="mt-2 text-sm font-bold text-slate-500">
              Valid until: {item.validUntil || "N/A"}
            </p>

            <div className="mt-6 flex gap-2">
              <Button
                variant="outline"
                className="px-4 py-2"
                onClick={() => togglePublish(item)}
              >
                {item.isPublished ? "Unpublish" : "Publish"}
              </Button>

              <Button
                className="bg-red-500 px-4 py-2 hover:bg-red-600"
                onClick={() => remove(item._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
