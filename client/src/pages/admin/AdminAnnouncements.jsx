import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/axios";
import Button from "../../components/ui/Button";

export default function AdminAnnouncements() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "news",
    isPinned: false,
    isPublished: true,
  });

  const load = async () => {
    const { data } = await API.get("/announcements/admin/all");
    setItems(data.announcements || []);
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
      await API.post("/announcements/admin", form);
      toast.success("Announcement created");
      setForm({
        title: "",
        message: "",
        type: "news",
        isPinned: false,
        isPublished: true,
      });
      load();
    } catch {
      toast.error("Failed to create announcement");
    }
  };

  const togglePublish = async (item) => {
    await API.patch(`/announcements/admin/${item._id}`, {
      isPublished: !item.isPublished,
    });
    load();
  };

  const remove = async (id) => {
    if (!confirm("Delete this announcement?")) return;
    await API.delete(`/announcements/admin/${id}`);
    toast.success("Deleted");
    load();
  };

  return (
    <div>
      <p className="font-black text-emerald-600">Announcements</p>
      <h2 className="mt-2 text-4xl font-black text-slate-950">
        News, updates, important notices
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
            placeholder="Announcement title"
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold outline-none"
          />

          <select
            name="type"
            value={form.type}
            onChange={update}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold outline-none"
          >
            <option value="news">News</option>
            <option value="update">Update</option>
            <option value="important">Important</option>
            <option value="event">Event</option>
            <option value="stall">Stall</option>
            <option value="sponsor">Sponsor</option>
          </select>

          <textarea
            name="message"
            value={form.message}
            onChange={update}
            placeholder="Write announcement message..."
            className="min-h-32 rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold outline-none md:col-span-2"
          />

          <label className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 font-black">
            <input
              type="checkbox"
              name="isPinned"
              checked={form.isPinned}
              onChange={update}
            />
            Pin announcement
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

        <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700">
          Create Announcement
        </Button>
      </form>

      <div className="mt-8 grid gap-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="rounded-3xl bg-white p-5 shadow-lg shadow-slate-200/60"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black capitalize text-emerald-700">
                    {item.type}
                  </span>
                  {item.isPinned && (
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700">
                      Pinned
                    </span>
                  )}
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ${
                      item.isPublished
                        ? "bg-green-50 text-green-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.isPublished ? "Published" : "Draft"}
                  </span>
                </div>

                <h3 className="mt-3 text-xl font-black">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.message}</p>
              </div>

              <div className="flex gap-2">
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
          </div>
        ))}
      </div>
    </div>
  );
}
