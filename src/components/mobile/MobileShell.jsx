import { MobileBottomNav } from "./MobileBottomNav.jsx";

export function MobileShell({ children, activeNav = "Home", onNavChange }) {
  return (
    <div className="mx-auto flex h-[844px] w-[min(390px,calc(100vw-16px))] max-w-[390px] flex-col overflow-hidden rounded-[46px] border-[10px] border-[#050816] bg-[#FAF8FF] shadow-soft ring-4 ring-slate-900/10">
      <div className="relative flex items-center justify-center bg-[#FAF8FF] pb-3 pt-4">
        <div className="absolute left-6 top-5 text-xs font-bold text-[#131B2E]">9:41</div>
        <div className="h-6 w-24 rounded-full bg-[#050816] shadow-inner ring-1 ring-white/10" />
        <div className="absolute right-6 top-5 flex items-center gap-1 text-[#131B2E]">
          <span className="h-2.5 w-3 rounded-sm border border-current" />
          <span className="h-2 w-2 rounded-full bg-current" />
        </div>
      </div>
      <div className="phone-screen min-h-0 flex-1 overflow-y-auto driver-mesh">{children}</div>
      <MobileBottomNav active={activeNav} onNavigate={onNavChange} />
    </div>
  );
}
