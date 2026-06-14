const toneClasses = {
  blue: "bg-blue-pale text-blue-deep ring-blue-electric/15",
  navy: "bg-navy text-white ring-navy/10",
  green: "bg-emerald-50 text-emerald-700 ring-success/20",
  amber: "bg-amber-50 text-amber-700 ring-amber/25",
  gray: "bg-slate-100 text-slate-600 ring-line"
};

export function Badge({ children, tone = "blue" }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${toneClasses[tone]}`}>
      {children}
    </span>
  );
}
