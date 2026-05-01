import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Mail,
  Phone,
  Store,
  UserRound,
} from "lucide-react";
import API from "../../api/axios";
import Button from "../../components/ui/Button";

export default function ApplyStall() {
  const [form, setForm] = useState({
    applicantName: "",
    email: "",
    phone: "",
    businessName: "",
    stallType: "food",
    requestedStallSize: "small",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await API.post("/stalls/apply", form);
      toast.success("Application submitted successfully");

      setForm({
        applicantName: "",
        email: "",
        phone: "",
        businessName: "",
        stallType: "food",
        requestedStallSize: "small",
        description: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Please login first");
    } finally {
      setLoading(false);
    }
  };

  const benefits = [
    "Submit your stall application digitally",
    "Organizer can approve and assign stall number",
    "Track application and payment status",
    "Promote your business on the fair website",
  ];

  return (
    <main className="overflow-hidden bg-[#fff8ee]">
      <section className="relative bg-slate-950 px-4 py-20 text-white lg:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.25),transparent_30%),radial-gradient(circle_at_80%_40%,rgba(245,158,11,0.22),transparent_30%)]" />
        <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(45deg,rgba(255,255,255,.12)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.12)_50%,rgba(255,255,255,.12)_75%,transparent_75%,transparent)] [background-size:42px_42px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-5 py-2 text-sm font-black text-amber-300 backdrop-blur">
              ✧ Stall Application ✧
            </p>

            <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
              Apply for your{" "}
              <span className="bg-gradient-to-r from-amber-300 via-red-400 to-emerald-300 bg-clip-text text-transparent">
                premium stall
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Register your food, fashion, service, book, jewelry, or cultural
              business for Bengali Culture Fair Essen.
            </p>

            <div className="mt-8 grid gap-4">
              {benefits.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-400" size={22} />
                  <span className="font-semibold text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-[2.5rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl"
          >
            <form
              onSubmit={submit}
              className="rounded-[2rem] bg-white p-6 text-slate-950 shadow-xl md:p-8"
            >
              <div className="mb-7">
                <p className="font-black text-emerald-600">
                  Business Information
                </p>
                <h2 className="mt-2 text-3xl font-black">Submit application</h2>
                <p className="mt-2 text-sm text-slate-500">
                  Fill the details below. Organizer will review your request.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="group">
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Applicant Name
                  </span>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition group-focus-within:border-emerald-400 group-focus-within:ring-4 group-focus-within:ring-emerald-100">
                    <UserRound size={19} className="text-slate-400" />
                    <input
                      name="applicantName"
                      value={form.applicantName}
                      onChange={update}
                      placeholder="Your full name"
                      className="w-full bg-transparent py-4 font-semibold outline-none"
                    />
                  </div>
                </label>

                <label className="group">
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Business Name
                  </span>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition group-focus-within:border-emerald-400 group-focus-within:ring-4 group-focus-within:ring-emerald-100">
                    <Store size={19} className="text-slate-400" />
                    <input
                      name="businessName"
                      value={form.businessName}
                      onChange={update}
                      placeholder="Shop / stall name"
                      className="w-full bg-transparent py-4 font-semibold outline-none"
                    />
                  </div>
                </label>

                <label className="group">
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Email
                  </span>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition group-focus-within:border-emerald-400 group-focus-within:ring-4 group-focus-within:ring-emerald-100">
                    <Mail size={19} className="text-slate-400" />
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={update}
                      placeholder="you@example.com"
                      className="w-full bg-transparent py-4 font-semibold outline-none"
                    />
                  </div>
                </label>

                <label className="group">
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Phone
                  </span>
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition group-focus-within:border-emerald-400 group-focus-within:ring-4 group-focus-within:ring-emerald-100">
                    <Phone size={19} className="text-slate-400" />
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={update}
                      placeholder="+49 ..."
                      className="w-full bg-transparent py-4 font-semibold outline-none"
                    />
                  </div>
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Stall Type
                  </span>
                  <select
                    name="stallType"
                    value={form.stallType}
                    onChange={update}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                  >
                    <option value="food">Food</option>
                    <option value="clothing">Clothing</option>
                    <option value="jewelry">Jewelry</option>
                    <option value="books">Books</option>
                    <option value="services">Services</option>
                    <option value="other">Other</option>
                  </select>
                </label>

                <label>
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Requested Size
                  </span>
                  <select
                    name="requestedStallSize"
                    value={form.requestedStallSize}
                    onChange={update}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 font-semibold outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                  >
                    <option value="small">Small Stall</option>
                    <option value="medium">Medium Stall</option>
                    <option value="large">Large Stall</option>
                  </select>
                </label>

                <label className="md:col-span-2">
                  <span className="mb-2 block text-sm font-black text-slate-700">
                    Description
                  </span>
                  <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-100">
                    <FileText
                      size={19}
                      className="mt-4 shrink-0 text-slate-400"
                    />
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={update}
                      placeholder="Describe your products, menu, services, or cultural items..."
                      className="min-h-32 w-full bg-transparent py-4 font-semibold outline-none"
                    />
                  </div>
                </label>
              </div>

              <div className="mt-7 rounded-3xl bg-amber-50 p-5 text-sm leading-6 text-amber-900">
                <strong>Note:</strong> Your application will be reviewed by the
                organizer. After approval, your stall can appear on the public
                stalls page.
              </div>

              <Button
                disabled={loading}
                className="mt-7 w-full bg-gradient-to-r from-emerald-500 to-emerald-700 py-4 text-base shadow-xl shadow-emerald-600/20 hover:from-emerald-600 hover:to-emerald-800"
              >
                {loading ? "Submitting..." : "Submit Application"}
                {!loading && <ArrowRight className="ml-2" size={19} />}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
