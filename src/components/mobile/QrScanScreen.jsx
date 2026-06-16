import { Button } from "../ui/Button.jsx";
import { MobileIcon } from "./MobileIcon.jsx";

export function QrScanScreen({ location, onBack, onContinue }) {
  return (
    <div className="min-h-full px-4 pb-5">
      <ScreenTopBar eyebrow="QR Scan" title="Scan charger QR" onBack={onBack} />

      <section className="mt-5 rounded-[24px] bg-[#131B2E] p-5 text-white shadow-soft">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-white/15 bg-slate-950">
          <div className="driver-scan-frame absolute inset-0" />
          <div className="absolute inset-8 rounded-[24px] border border-white/12" />
          <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-[24px] border-2 border-white/85">
            <span className="absolute -left-1 -top-1 h-10 w-10 rounded-tl-[24px] border-l-4 border-t-4 border-[#57DFFE]" />
            <span className="absolute -right-1 -top-1 h-10 w-10 rounded-tr-[24px] border-r-4 border-t-4 border-[#57DFFE]" />
            <span className="absolute -bottom-1 -left-1 h-10 w-10 rounded-bl-[24px] border-b-4 border-l-4 border-[#57DFFE]" />
            <span className="absolute -bottom-1 -right-1 h-10 w-10 rounded-br-[24px] border-b-4 border-r-4 border-[#57DFFE]" />
            <span className="absolute left-4 right-4 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-[#57DFFE] shadow-[0_0_18px_rgba(87,223,254,0.9)]" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/35 px-4 py-3 backdrop-blur-xl ring-1 ring-white/10">
            <p className="text-center text-sm font-semibold text-white">Scan QR code on the charger</p>
          </div>
        </div>
      </section>

      <section className="driver-glass mt-4 rounded-[24px] p-4">
        <div className="flex items-start gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-[#EAEDFF] text-[#2563EB]">
            <MobileIcon name="ev_station" />
          </div>
          <div>
            <h3 className="font-semibold text-[#131B2E]">{location.name}</h3>
            <p className="mt-1 text-sm leading-6 text-[#434655]">{location.address}</p>
          </div>
        </div>

        <label className="mt-4 grid gap-2 text-sm font-semibold text-[#434655]">
          Manual charger code
          <div className="relative">
            <MobileIcon name="pin" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#434655]/55" />
            <input
              className="min-h-12 w-full rounded-2xl border border-[#C3C6D7]/70 bg-white/78 py-3 pl-12 pr-4 text-sm font-semibold text-[#131B2E] outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/10"
              defaultValue="CHG-PAK-01"
              placeholder="Enter charger code"
            />
          </div>
        </label>

        <Button className="mt-4 w-full" onClick={onContinue}>
          Continue to Payment
          <MobileIcon name="arrow_forward" />
        </Button>
      </section>
    </div>
  );
}

function ScreenTopBar({ eyebrow, title, onBack }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onBack}
        className="grid h-11 w-11 place-items-center rounded-2xl border border-[#C3C6D7]/55 bg-white/80 text-[#131B2E] shadow-card backdrop-blur"
        aria-label="Back to SPKLU detail"
      >
        <MobileIcon name="arrow_back" />
      </button>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2563EB]">{eyebrow}</p>
        <h2 className="text-xl font-semibold text-[#131B2E]">{title}</h2>
      </div>
    </div>
  );
}
