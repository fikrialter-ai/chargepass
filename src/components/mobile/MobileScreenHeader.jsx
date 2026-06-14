export function MobileScreenHeader({ title, subtitle, action }) {
  return (
    <header className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-2xl font-black tracking-normal text-navy">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">{subtitle}</p> : null}
      </div>
      {action}
    </header>
  );
}
