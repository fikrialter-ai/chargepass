const navItems = [
  { label: "Home", icon: "home" },
  { label: "Scan", icon: "scan" },
  { label: "History", icon: "history" },
  { label: "Profile", icon: "profile" }
];

export function MobileBottomNav({ active = "Home", onNavigate }) {
  return (
    <nav className="grid h-[78px] shrink-0 grid-cols-4 border-t border-line bg-white/95 px-2 pb-2 pt-2 shadow-[0_-18px_32px_rgba(15,23,42,0.08)] backdrop-blur">
      {navItems.map((item) => {
        const isActive = item.label === active;

        return (
          <button
            key={item.label}
            type="button"
            onClick={() => onNavigate?.(item.label)}
            className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-bold transition duration-200 ${
              isActive ? "bg-navy text-white shadow-card" : "text-slate-400 hover:bg-slate-50 hover:text-navy"
            }`}
            aria-label={item.label}
          >
            <NavIcon name={item.icon} active={isActive} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function NavIcon({ name, active }) {
  const color = active ? "bg-cyan" : "bg-slate-400";

  if (name === "scan") {
    return (
      <span className={`relative h-5 w-5 rounded-md border-2 ${active ? "border-cyan" : "border-slate-400"}`}>
        <span className={`absolute left-1 top-1 h-1.5 w-1.5 rounded-sm ${color}`} />
        <span className={`absolute bottom-1 right-1 h-1.5 w-1.5 rounded-sm ${color}`} />
      </span>
    );
  }

  if (name === "history") {
    return (
      <span className={`relative h-5 w-5 rounded-full border-2 ${active ? "border-cyan" : "border-slate-400"}`}>
        <span className={`absolute left-[8px] top-[4px] h-2 w-0.5 rounded-full ${color}`} />
        <span className={`absolute left-[8px] top-[9px] h-0.5 w-2 rounded-full ${color}`} />
      </span>
    );
  }

  if (name === "profile") {
    return (
      <span className="relative h-5 w-5">
        <span className={`absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full ${color}`} />
        <span className={`absolute bottom-0 left-1/2 h-3.5 w-4 -translate-x-1/2 rounded-t-full ${color}`} />
      </span>
    );
  }

  return (
    <span className="relative h-5 w-5">
      <span className={`absolute bottom-0 left-1 h-3.5 w-3 rounded-sm ${color}`} />
      <span
        className={`absolute left-[3px] top-1 h-3 w-3 rotate-45 rounded-[2px] ${color}`}
        aria-hidden="true"
      />
    </span>
  );
}
