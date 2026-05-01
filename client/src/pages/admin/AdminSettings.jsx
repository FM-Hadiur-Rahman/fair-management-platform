import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/axios";
import Button from "../../components/ui/Button";

export default function AdminSettings() {
  const [form, setForm] = useState({
    eventName: "",
    tagline: "",
    eventDate: "",
    eventTime: "",
    locationName: "",
    address: "",
    contactEmail: "",
    contactPhone: "",
    foodStallPrice: 0,
    regularStallPrice: 0,
    sponsorStartingPrice: 0,
    applicationOpen: true,
    heroImageUrl: "",
    isPublished: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await API.get("/settings/admin");
        setForm(data.settings);
      } catch {
        toast.error("Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await API.patch("/settings/admin", form);
      toast.success("Settings updated successfully");
    } catch {
      toast.error("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="font-bold">Loading settings...</p>;

  return (
    <div>
      <p className="font-black text-emerald-600">Event Settings</p>
      <h2 className="mt-2 text-4xl font-black text-slate-950">
        Control event information
      </h2>

      <form
        onSubmit={submit}
        className="mt-8 rounded-[2rem] bg-white p-6 shadow-xl shadow-slate-200/60"
      >
        <div className="grid gap-5 md:grid-cols-2">
          {[
            ["eventName", "Event Name"],
            ["tagline", "Tagline"],
            ["eventDate", "Event Date"],
            ["eventTime", "Event Time"],
            ["locationName", "Location Name"],
            ["address", "Address"],
            ["contactEmail", "Contact Email"],
            ["contactPhone", "Contact Phone"],
            ["heroImageUrl", "Hero Image URL"],
          ].map(([name, label]) => (
            <label key={name}>
              <span className="mb-2 block text-sm font-black text-slate-700">
                {label}
              </span>
              <input
                name={name}
                value={form[name] || ""}
                onChange={update}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </label>
          ))}

          {[
            ["foodStallPrice", "Food Stall Price"],
            ["regularStallPrice", "Regular Stall Price"],
            ["sponsorStartingPrice", "Sponsor Starting Price"],
          ].map(([name, label]) => (
            <label key={name}>
              <span className="mb-2 block text-sm font-black text-slate-700">
                {label}
              </span>
              <input
                name={name}
                type="number"
                value={form[name] || 0}
                onChange={update}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold outline-none focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
              />
            </label>
          ))}

          <label className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 font-black">
            <input
              type="checkbox"
              name="applicationOpen"
              checked={!!form.applicationOpen}
              onChange={update}
            />
            Applications Open
          </label>

          <label className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 font-black">
            <input
              type="checkbox"
              name="isPublished"
              checked={!!form.isPublished}
              onChange={update}
            />
            Publish Event Info
          </label>
        </div>

        <Button
          disabled={saving}
          className="mt-7 bg-emerald-600 hover:bg-emerald-700"
        >
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </div>
  );
}
