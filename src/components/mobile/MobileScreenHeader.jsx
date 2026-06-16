export function MobileScreenHeader({ title, subtitle, action }) {
  return (
    <header className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-[28px] font-bold leading-8 tracking-normal text-[#131B2E]">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm font-normal leading-6 text-[#434655]">{subtitle}</p> : null}
      </div>
      {action}
    </header>
  );
}
