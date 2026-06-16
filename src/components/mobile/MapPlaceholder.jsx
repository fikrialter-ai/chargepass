import { MobileIcon } from "./MobileIcon.jsx";

export function MapPlaceholder() {
  return (
    <section className="driver-card relative mt-5 h-52 overflow-hidden rounded-[24px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(87,223,254,0.22),transparent_25%),radial-gradient(circle_at_86%_0%,rgba(37,99,235,0.16),transparent_32%),linear-gradient(180deg,#FFFFFF_0%,#EAEDFF_100%)]" />
      <div className="absolute inset-0 opacity-90">
        <div className="absolute left-4 top-7 h-24 w-40 rounded-full border border-[#2563EB]/20" />
        <div className="absolute right-[-12px] top-5 h-32 w-40 rounded-full border border-[#57DFFE]/35" />
        <div className="absolute bottom-6 left-20 h-20 w-44 rounded-full border border-[#7D4CE7]/12" />
        <div className="absolute left-0 top-24 h-1 w-full rotate-[-8deg] bg-[#C3C6D7]/55" />
        <div className="absolute left-9 top-0 h-full w-1 rotate-[28deg] bg-[#C3C6D7]/45" />
        <div className="absolute right-16 top-0 h-full w-1 rotate-[-22deg] bg-[#C3C6D7]/45" />
      </div>

      <MapMarker className="left-7 top-9" label="5" tone="blue" />
      <MapMarker className="right-11 top-16" label="3" tone="cyan" />
      <MapMarker className="bottom-16 left-1/2 -translate-x-1/2" label="" tone="navy" current />

      <button
        type="button"
        className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/86 text-[#2563EB] shadow-card backdrop-blur transition hover:bg-white"
        aria-label="Use current location"
      >
        <MobileIcon name="my_location" />
      </button>

      <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/82 px-4 py-3 shadow-card backdrop-blur-xl ring-1 ring-white/70">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#2563EB]">Nearby map</p>
        <p className="mt-1 text-sm font-semibold text-[#131B2E]">Surabaya SPKLU coverage around your route</p>
      </div>
    </section>
  );
}

function MapMarker({ label, tone, className, current = false }) {
  const colors = {
    blue: "bg-[#2563EB]",
    cyan: "bg-[#57DFFE]",
    navy: "bg-[#131B2E]"
  };

  return (
    <div className={`absolute grid h-10 w-10 place-items-center rounded-full border-4 border-white ${colors[tone]} text-xs font-bold text-white shadow-card ${className}`}>
      {current ? <MobileIcon name="near_me" filled className="text-white" /> : label}
    </div>
  );
}
