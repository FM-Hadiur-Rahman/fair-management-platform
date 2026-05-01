import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/ui/Button";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "admin@bengalifair.de",
    password: "123456",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await login(form.email, form.password);

      toast.success("Login successful");

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative grid min-h-[86vh] place-items-center overflow-hidden bg-slate-950 px-4 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(16,185,129,0.25),transparent_32%),radial-gradient(circle_at_82%_30%,rgba(245,158,11,0.22),transparent_30%),radial-gradient(circle_at_50%_90%,rgba(239,68,68,0.18),transparent_35%)]" />
      <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(45deg,rgba(255,255,255,.12)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.12)_50%,rgba(255,255,255,.12)_75%,transparent_75%,transparent)] [background-size:42px_42px]" />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55 }}
        className="relative w-full max-w-5xl rounded-[2.5rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-xl"
      >
        <div className="grid overflow-hidden rounded-[2rem] bg-white text-slate-950 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative hidden bg-slate-950 p-10 text-white lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.35),transparent_35%),radial-gradient(circle_at_80%_60%,rgba(245,158,11,0.25),transparent_35%)]" />

            <div className="relative flex h-full flex-col justify-between">
              <div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-500 shadow-xl">
                  <Sparkles />
                </div>

                <h2 className="mt-8 text-4xl font-black leading-tight">
                  Bengali Culture Fair Essen
                </h2>

                <p className="mt-4 leading-8 text-slate-300">
                  Secure access for organizers, admins, and stall management.
                  Control applications, announcements, offers, sponsors, and
                  fair operations from one dashboard.
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  "Admin dashboard access",
                  "Manage stalls and payments",
                  "Publish news and offers",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur"
                  >
                    <ShieldCheck className="text-emerald-300" size={20} />
                    <span className="font-bold">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="p-7 md:p-10">
            <p className="inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700">
              Welcome Back
            </p>

            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-5xl">
              Login to your account
            </h1>

            <p className="mt-3 text-slate-500">
              Access the fair management dashboard and organizer tools.
            </p>

            <div className="mt-8 grid gap-5">
              <label>
                <span className="mb-2 block text-sm font-black text-slate-700">
                  Email Address
                </span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-100">
                  <Mail size={19} className="text-slate-400" />
                  <input
                    className="w-full bg-transparent py-4 font-semibold outline-none"
                    placeholder="admin@bengalifair.de"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
              </label>

              <label>
                <span className="mb-2 block text-sm font-black text-slate-700">
                  Password
                </span>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-400 focus-within:ring-4 focus-within:ring-emerald-100">
                  <Lock size={19} className="text-slate-400" />
                  <input
                    className="w-full bg-transparent py-4 font-semibold outline-none"
                    placeholder="Enter password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </label>

              <div className="rounded-3xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
                <strong>Demo Admin:</strong> admin@bengalifair.de / 123456
              </div>

              <Button
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-700 py-4 text-base shadow-xl shadow-emerald-600/20 hover:from-emerald-600 hover:to-emerald-800"
              >
                {loading ? "Logging in..." : "Login"}
                {!loading && <ArrowRight className="ml-2" size={19} />}
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </main>
  );
}
