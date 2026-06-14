export function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        {eyebrow ? <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-electric">{eyebrow}</p> : null}
        <h2 className="mt-1 text-xl font-bold text-navy sm:text-2xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}
