import { MobileIcon } from "./MobileIcon.jsx";

export function MapPlaceholder() {
  return (
    <section className="driver-card relative mt-5 h-60 overflow-hidden rounded-[24px]" style={{ height: 240 }}>
      <div className="absolute inset-0 bg-[#EEF4F8]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(87,223,254,0.22),transparent_24%),radial-gradient(circle_at_88%_0%,rgba(37,99,235,0.14),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.18)_0%,rgba(234,237,255,0.24)_100%)]" />
      <div className="absolute left-[-18px] top-[-14px] h-24 w-32 rounded-[28px] bg-[#D9F7EF]/70 rotate-[-10deg]" />
      <div className="absolute bottom-[-28px] right-[-14px] h-28 w-36 rounded-[32px] bg-[#E9E3FF]/65 rotate-[8deg]" />
      <div className="absolute left-[38px] top-[156px] h-12 w-24 rounded-[20px] bg-white/38 rotate-[10deg] ring-1 ring-white/45" />
      <div className="absolute right-[86px] top-[36px] h-14 w-20 rounded-[18px] bg-white/42 rotate-[-8deg] ring-1 ring-white/50" />

      <MapRoad className="-left-10 top-[42px] h-5 w-[210px] rotate-[18deg]" />
      <MapRoad className="left-[92px] top-[22px] h-5 w-[260px] rotate-[-16deg]" />
      <MapRoad className="-left-8 top-[132px] h-6 w-[300px] rotate-[-7deg]" major />
      <MapRoad className="left-[210px] top-[68px] h-5 w-[210px] rotate-[58deg]" />
      <MapRoad className="left-[28px] top-[4px] h-5 w-[250px] rotate-[78deg]" />
      <MapRoad className="left-[150px] top-[148px] h-5 w-[210px] rotate-[24deg]" />
      <MapRoad className="left-[92px] top-[86px] h-3 w-[150px] rotate-[12deg]" subtle />
      <MapRoad className="-left-8 top-[188px] h-3 w-[230px] rotate-[2deg]" subtle />

      <div className="absolute left-0 top-[118px] h-1.5 w-[235px] rotate-[-7deg] rounded-full bg-[#2563EB] shadow-[0_0_16px_rgba(37,99,235,0.28)]" />
      <div className="absolute left-[168px] top-[90px] h-1.5 w-[118px] rotate-[-34deg] rounded-full bg-[#57DFFE] shadow-[0_0_16px_rgba(87,223,254,0.35)]" />
      <div className="absolute left-[156px] top-[103px] h-4 w-4 rounded-full border-4 border-white bg-[#2563EB] shadow-card" />
      <div className="absolute left-[44px] top-[111px] h-3 w-3 rounded-full border-2 border-white bg-[#2563EB] shadow-sm" />
      <div className="absolute left-[274px] top-[74px] h-3 w-3 rounded-full border-2 border-white bg-[#57DFFE] shadow-sm" />

      <MapPin className="left-8 top-12" label="5" />
      <MapPin className="right-12 top-20" label="3" accent="cyan" />
      <MapPin className="right-24 bottom-[86px]" label="2" />
      <CurrentLocation className="left-[145px] top-[116px]" />

      <button
        type="button"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-[#2563EB] shadow-card backdrop-blur-xl transition hover:bg-white"
        aria-label="Use current location"
      >
        <MobileIcon name="my_location" />
      </button>

      <div className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-2 text-[11px] font-semibold text-[#434655] shadow-card backdrop-blur-xl ring-1 ring-white/80">
        Surabaya route preview
      </div>

      <div className="absolute left-5 top-[86px] rounded-full bg-white/72 px-2.5 py-1 text-[10px] font-semibold text-[#434655]/80 shadow-sm backdrop-blur">
        Pakuwon
      </div>
      <div className="absolute right-16 top-[132px] rounded-full bg-white/72 px-2.5 py-1 text-[10px] font-semibold text-[#434655]/80 shadow-sm backdrop-blur">
        Mayjen Sungkono
      </div>

      <div className="absolute right-4 top-[70px] overflow-hidden rounded-full bg-white/88 shadow-card ring-1 ring-white/80 backdrop-blur-xl">
        <button type="button" className="grid h-9 w-9 place-items-center text-[#434655]" aria-label="Zoom in map preview">
          <MobileIcon name="add" className="text-[18px]" />
        </button>
        <div className="mx-2 h-px bg-[#C3C6D7]/60" />
        <button type="button" className="grid h-9 w-9 place-items-center text-[#434655]" aria-label="Zoom out map preview">
          <MobileIcon name="remove" className="text-[18px]" />
        </button>
      </div>

      <div className="absolute bottom-4 left-4 right-4 rounded-[20px] bg-white/88 px-4 py-3 shadow-card backdrop-blur-xl ring-1 ring-white/80">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#2563EB]">Nearest SPKLU</p>
            <p className="mt-1 text-sm font-bold text-[#131B2E]">Pakuwon Mall Surabaya</p>
          </div>
          <div className="rounded-2xl bg-[#EAEDFF] px-3 py-2 text-right">
            <p className="text-[11px] font-semibold text-[#434655]">ETA</p>
            <p className="text-sm font-bold text-[#2563EB]">6 min</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapRoad({ className, major = false, subtle = false }) {
  return (
    <div className={`absolute rounded-full ${subtle ? "bg-white/54" : "bg-white"} shadow-[0_1px_0_rgba(148,163,184,0.22)] ring-1 ring-[#D7DBE8]/70 ${className}`}>
      <div className={`mx-auto h-full rounded-full ${major ? "w-[94%] bg-[#F9FBFF]" : "w-[90%] bg-white/90"}`} />
    </div>
  );
}

function MapPin({ className, label, accent = "blue" }) {
  const tone = accent === "cyan" ? "bg-[#57DFFE] text-[#131B2E]" : "bg-[#2563EB] text-white";

  return (
    <div className={`absolute ${className}`}>
      <div className={`relative grid h-10 w-10 place-items-center rounded-full border-[3px] border-white ${tone} text-xs font-bold shadow-card`}>
        <MobileIcon name="ev_station" filled className="text-[18px]" />
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 text-[10px] font-bold text-[#2563EB] shadow-sm">
          {label}
        </span>
      </div>
    </div>
  );
}

function CurrentLocation({ className }) {
  return (
    <div className={`absolute ${className}`}>
      <div className="absolute -inset-4 rounded-full bg-[#2563EB]/12" />
      <div className="absolute -inset-2 rounded-full bg-[#2563EB]/20" />
      <div className="relative grid h-10 w-10 place-items-center rounded-full border-[4px] border-white bg-[#131B2E] text-white shadow-card">
        <MobileIcon name="near_me" filled className="text-[18px]" />
      </div>
    </div>
  );
}
