export function MetricCard({ label, value, change, tone = "info" }) {
  const accent =
    tone === "good" ? "text-mint" : tone === "warn" ? "text-amber" : "text-blue-electric";

  return (
    <article className="rounded-lg border border-line bg-white p-4 shadow-card">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <strong className="text-2xl font-bold tracking-normal text-navy">{value}</strong>
        <span className={`text-right text-xs font-semibold ${accent}`}>{change}</span>
      </div>
    </article>
  );
}
