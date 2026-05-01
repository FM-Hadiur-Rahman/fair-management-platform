export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition active:scale-95 disabled:opacity-60";

  const variants = {
    primary:
      "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20",
    dark: "bg-slate-950 text-white hover:bg-slate-800",
    outline:
      "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
