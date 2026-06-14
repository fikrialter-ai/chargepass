import { NavLink, Outlet, useLocation } from "react-router-dom";

const navItems = [
  { label: "Driver App", to: "/driver" },
  { label: "Company Dashboard", to: "/dashboard" }
];

export function AppLayout() {
  const { pathname } = useLocation();
  const showAppHeader = !pathname.startsWith("/dashboard");

  return (
    <main className="min-h-screen bg-cloud text-ink">
      {showAppHeader ? (
        <header className="sticky top-0 z-30 border-b border-line bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <NavLink to="/" className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-blue-electric text-lg font-black text-white shadow-card">
                CP
              </div>
              <div>
                <h1 className="text-lg font-black text-navy">ChargePass</h1>
                <p className="text-sm text-slate-500">EV charging payment and fleet management for Indonesia</p>
              </div>
            </NavLink>

            <nav className="grid w-full grid-cols-2 rounded-2xl border border-line bg-white p-1 shadow-card sm:w-auto">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-2 text-center text-sm font-semibold transition ${
                      isActive ? "bg-navy text-white shadow-sm" : "text-slate-600 hover:bg-slate-50 hover:text-navy"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>
      ) : null}
      <Outlet />
    </main>
  );
}
