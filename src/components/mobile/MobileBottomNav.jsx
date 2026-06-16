import { MobileIcon } from "./MobileIcon.jsx";

const navItems = [
  { label: "Home", icon: "home" },
  { label: "Scan", icon: "qr_code_scanner" },
  { label: "History", icon: "receipt_long" },
  { label: "Profile", icon: "person" }
];

export function MobileBottomNav({ active = "Home", onNavigate }) {
  return (
    <nav className="grid h-[78px] shrink-0 grid-cols-4 border-t border-[#C3C6D7]/45 bg-white/82 px-2 pb-2 pt-2 shadow-[0_-14px_32px_rgba(19,27,46,0.08)] backdrop-blur-xl">
      {navItems.map((item) => {
        const isActive = item.label === active;

        return (
          <button
            key={item.label}
            type="button"
            onClick={() => onNavigate?.(item.label)}
            className={`flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-semibold transition duration-200 active:scale-[0.98] ${
              isActive
                ? "bg-[#EAEDFF] text-[#2563EB] shadow-card ring-1 ring-[#2563EB]/10"
                : "text-[#434655]/70 hover:bg-[#EAEDFF]/60 hover:text-[#131B2E]"
            }`}
            aria-label={item.label}
          >
            <MobileIcon name={item.icon} filled={isActive} className={isActive ? "text-[#2563EB]" : "text-[#434655]/70"} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
