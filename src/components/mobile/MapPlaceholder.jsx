export function MapPlaceholder() {
  return (
    <section className="relative mt-5 h-44 overflow-hidden rounded-[28px] border border-line bg-white shadow-card">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,0.18),transparent_24%),radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.16),transparent_28%)]" />
      <div className="absolute inset-0 opacity-80">
        <div className="absolute left-4 top-7 h-20 w-36 rounded-full border border-blue-electric/20" />
        <div className="absolute right-0 top-4 h-28 w-36 rounded-full border border-cyan/25" />
        <div className="absolute bottom-4 left-20 h-20 w-44 rounded-full border border-blue-electric/20" />
        <div className="absolute left-0 top-20 h-1 w-full rotate-[-8deg] bg-slate-200/80" />
        <div className="absolute left-8 top-0 h-full w-1 rotate-[28deg] bg-slate-200/80" />
        <div className="absolute right-16 top-0 h-full w-1 rotate-[-22deg] bg-slate-200/70" />
      </div>
      <div className="absolute left-7 top-8 grid h-8 w-8 place-items-center rounded-full bg-blue-electric text-xs font-black text-white shadow-card">
        4
      </div>
      <div className="absolute right-12 top-16 grid h-8 w-8 place-items-center rounded-full bg-cyan text-xs font-black text-white shadow-card">
        2
      </div>
      <div className="absolute bottom-9 left-1/2 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border-4 border-white bg-navy text-xs font-black text-white shadow-card">
        You
      </div>
      <div className="absolute bottom-3 left-4 right-4 rounded-xl bg-white/92 px-4 py-3 shadow-card backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-electric">Nearby map</p>
        <p className="mt-1 text-sm font-bold text-navy">SPKLU coverage around your route</p>
      </div>
    </section>
  );
}
