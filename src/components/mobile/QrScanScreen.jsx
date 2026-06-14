export function QrScanScreen({ location, onBack, onContinue }) {
  return (
    <div className="min-h-full bg-cloud px-4 pb-5">
      <ScreenTopBar eyebrow="QR Scan" title="Scan charger QR" onBack={onBack} />

      <section className="mt-5 rounded-[28px] bg-ink p-5 text-white shadow-soft">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-white/15 bg-slate-900">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.26),transparent_42%),linear-gradient(45deg,rgba(255,255,255,0.08)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.08)_50%,rgba(255,255,255,0.08)_75%,transparent_75%)] bg-[length:100%_100%,22px_22px]" />
          <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-2 border-white/85">
            <span className="absolute -left-1 -top-1 h-9 w-9 rounded-tl-2xl border-l-4 border-t-4 border-blue-electric" />
            <span className="absolute -right-1 -top-1 h-9 w-9 rounded-tr-2xl border-r-4 border-t-4 border-blue-electric" />
            <span className="absolute -bottom-1 -left-1 h-9 w-9 rounded-bl-2xl border-b-4 border-l-4 border-blue-electric" />
            <span className="absolute -bottom-1 -right-1 h-9 w-9 rounded-br-2xl border-b-4 border-r-4 border-blue-electric" />
            <span className="absolute left-4 right-4 top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_18px_rgba(6,182,212,0.85)]" />
          </div>
          <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-black/35 px-4 py-3 backdrop-blur">
            <p className="text-center text-sm font-black text-white">Scan QR code on the charger</p>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[24px] border border-line bg-white p-4 shadow-card">
        <h3 className="font-black text-navy">{location.name}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">{location.address}</p>
        <div className="mt-4 grid gap-3">
          <button
            type="button"
            onClick={() => window.alert("Manual charger code entry opened in this prototype.")}
            className="rounded-2xl border border-line bg-white px-4 py-3 text-sm font-black text-navy hover:bg-slate-50"
          >
            Enter Charger Code Manually
          </button>
          <button
            type="button"
            onClick={onContinue}
            className="rounded-2xl bg-blue-electric px-4 py-3 text-sm font-black text-white shadow-card hover:bg-blue-deep"
          >
            Continue to Payment Authorization
          </button>
        </div>
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
        className="grid h-10 w-10 place-items-center rounded-2xl border border-line bg-white text-lg font-black text-navy shadow-card"
        aria-label="Back to SPKLU detail"
      >
        &lt;
      </button>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-electric">{eyebrow}</p>
        <h2 className="text-lg font-black text-navy">{title}</h2>
      </div>
    </div>
  );
}
