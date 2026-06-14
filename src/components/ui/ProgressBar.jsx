export function ProgressBar({ value, max, tone = "blue" }) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  const color = tone === "mint" ? "bg-mint" : tone === "amber" ? "bg-amber" : "bg-blue-electric";

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }} />
    </div>
  );
}
