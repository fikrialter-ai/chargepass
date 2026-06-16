import { Button } from "../ui/Button.jsx";
import { MobileIcon } from "./MobileIcon.jsx";
import { formatCurrency } from "../../utils/formatters.js";

const chargingSnapshot = {
  batteryPercent: 68,
  kwhUsed: 18.7,
  duration: "32 min",
  estimatedRunningCost: 46114
};

export function ChargingProgressScreen({ location, onBack, onStopCharging }) {
  const connectorType = location.connectorTypes[0] ?? "CCS2";
  const chargerId = `${location.id.toUpperCase().replace("SPKLU-", "CHG-")}-01`;

  return (
    <div className="min-h-full px-4 pb-5">
      <ScreenTopBar eyebrow="Charging" title="Live session" onBack={onBack} />

      <section className="mt-5 rounded-[24px] p-5 text-white shadow-glow driver-primary-panel">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-normal text-blue-100">Status</p>
            <h3 className="mt-1 text-2xl font-bold">Charging in Progress</h3>
          </div>
          <span className="rounded-full bg-[#10B981] px-3 py-1 text-xs font-semibold text-white">Live</span>
        </div>

        <div className="mt-7 rounded-[24px] bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-blue-100">Battery progress</span>
            <span className="text-[40px] font-bold leading-none text-white">{chargingSnapshot.batteryPercent}%</span>
          </div>
          <BatteryProgress percent={chargingSnapshot.batteryPercent} />
        </div>

        <p className="mt-5 text-sm leading-6 text-blue-100">{location.name}</p>
        <p className="mt-1 text-xs font-semibold text-[#57DFFE]">Energy indicators update visually for prototype preview.</p>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3">
        <ProgressStat icon="electric_bolt" label="kWh used" value={`${chargingSnapshot.kwhUsed} kWh`} />
        <ProgressStat icon="timer" label="Duration" value={chargingSnapshot.duration} />
        <ProgressStat icon="payments" label="Running cost" value={formatCurrency(chargingSnapshot.estimatedRunningCost)} />
        <ProgressStat icon="cable" label="Connector" value={connectorType} />
      </section>

      <section className="driver-glass mt-4 rounded-[24px] p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#434655]/70">Charger ID</p>
            <p className="mt-1 text-sm font-bold text-[#131B2E]">{chargerId}</p>
          </div>
          <MobileIcon name="bolt" filled className="text-[#57DFFE]" />
        </div>
      </section>

      <Button variant="danger" className="mt-4 w-full" onClick={onStopCharging}>
        Stop Charging
      </Button>
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
        aria-label="Back to payment authorization"
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

function BatteryProgress({ percent }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-16 flex-1 rounded-2xl border-2 border-white/75 p-1">
        <div className="h-full overflow-hidden rounded-xl bg-white/10 p-1">
          <div
            className="h-full rounded-lg bg-[#57DFFE] shadow-[0_0_22px_rgba(87,223,254,0.58)]"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      <div className="h-8 w-2 rounded-r-md bg-white/75" />
    </div>
  );
}

function ProgressStat({ icon, label, value }) {
  return (
    <div className="driver-card rounded-[24px] p-4">
      <MobileIcon name={icon} className="text-[#57DFFE]" />
      <p className="mt-3 text-xs font-semibold text-[#434655]">{label}</p>
      <p className="mt-1 text-lg font-bold text-[#131B2E]">{value}</p>
    </div>
  );
}
