import { formatCurrency } from "../../utils/formatters.js";

const chargingSnapshot = {
  batteryPercent: 68,
  kwhUsed: 18.7,
  duration: "32 min",
  estimatedRunningCost: 46114
};

export function ChargingProgressScreen({ location, onBack, onStopCharging }) {
  const connectorType = location.connectorTypes[0] ?? "CCS2";

  return (
    <div className="min-h-full bg-cloud px-4 pb-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="grid h-10 w-10 place-items-center rounded-2xl border border-line bg-white text-lg font-black text-navy shadow-card"
          aria-label="Back to payment authorization"
        >
          &lt;
        </button>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-mint">Charging</p>
          <h2 className="text-lg font-black text-navy">Charging Progress</h2>
        </div>
      </div>

      <section className="mt-5 rounded-[28px] p-5 text-white shadow-glow fintech-gradient">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-blue-100">Status</p>
            <h3 className="mt-1 text-2xl font-black">Charging in Progress</h3>
          </div>
          <span className="rounded-full bg-success px-3 py-1 text-xs font-black text-white">Live</span>
        </div>

        <div className="mt-6 rounded-[24px] bg-white/10 p-4 ring-1 ring-white/10">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-semibold text-blue-100">Battery</span>
            <span className="font-black text-white">{chargingSnapshot.batteryPercent}%</span>
          </div>
          <BatteryProgress percent={chargingSnapshot.batteryPercent} />
        </div>

        <p className="mt-5 text-sm leading-6 text-blue-100">{location.name}</p>
        <p className="mt-2 text-xs font-semibold text-cyan">Running cost is an estimate until stop.</p>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3">
        <ProgressStat label="kWh used" value={`${chargingSnapshot.kwhUsed} kWh`} />
        <ProgressStat label="Duration" value={chargingSnapshot.duration} />
        <ProgressStat label="Running cost" value={formatCurrency(chargingSnapshot.estimatedRunningCost)} />
        <ProgressStat label="Connector" value={connectorType} />
      </section>

      <section className="mt-4 rounded-[24px] border border-blue-electric/20 bg-white p-4 shadow-card">
        <p className="text-sm font-black text-blue-deep">Estimated cost updates as kWh usage increases.</p>
        <p className="mt-2 text-xs leading-5 text-slate-600">Final billing is calculated after the session stops.</p>
      </section>

      <button
        type="button"
        onClick={onStopCharging}
        className="mt-4 w-full rounded-2xl bg-danger px-4 py-3 text-sm font-black text-white shadow-card hover:bg-red-600"
      >
        Stop Charging
      </button>
    </div>
  );
}

function BatteryProgress({ percent }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-16 flex-1 rounded-2xl border-2 border-white/70 p-1">
        <div className="h-full rounded-xl bg-white/10 p-1">
          <div
            className="h-full rounded-lg bg-cyan shadow-[0_0_18px_rgba(6,182,212,0.45)]"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <div className="h-8 w-2 rounded-r-md bg-white/70" />
    </div>
  );
}

function ProgressStat({ label, value }) {
  return (
    <div className="rounded-[24px] border border-line bg-white p-4 shadow-card">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-black text-navy">{value}</p>
    </div>
  );
}
