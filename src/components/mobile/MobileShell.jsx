import { MobileBottomNav } from "./MobileBottomNav.jsx";

export function MobileShell({ children, activeNav = "Home", onNavChange }) {
  return (
    <div className="mx-auto flex h-[844px] w-full max-w-[390px] flex-col overflow-hidden rounded-[42px] border-[10px] border-[#050816] bg-cloud shadow-soft ring-1 ring-white/50">
      <div className="relative flex items-center justify-center bg-cloud pb-3 pt-4">
        <div className="absolute left-6 top-5 text-xs font-black text-slate-700">9:41</div>
        <div className="h-6 w-24 rounded-full bg-[#050816] shadow-inner" />
        <div className="absolute right-6 top-5 flex items-center gap-1">
          <span className="h-2.5 w-3 rounded-sm border border-slate-700" />
          <span className="h-2 w-2 rounded-full bg-slate-700" />
        </div>
      </div>
      <div className="phone-screen min-h-0 flex-1 overflow-y-auto bg-cloud">{children}</div>
      <MobileBottomNav active={activeNav} onNavigate={onNavChange} />
    </div>
  );
}
