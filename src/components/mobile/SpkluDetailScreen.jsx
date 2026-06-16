import { Badge } from "../ui/Badge.jsx";
import { Button } from "../ui/Button.jsx";
import { MobileIcon } from "./MobileIcon.jsx";
import { formatCurrency } from "../../utils/formatters.js";

export function SpkluDetailScreen({ location, onBack, onScanQr, onStartCharging }) {
  const chargerStatuses = buildChargerStatuses(location);

  return (
    <div className="min-h-full px-4 pb-5">
      <ScreenTopBar eyebrow="Station Details" title="SPKLU details" onBack={onBack} />

      <section className="mt-5 overflow-hidden rounded-[24px] text-white shadow-glow driver-primary-panel">
        <div className="relative h-36 p-4">
          <div className="absolute inset-0 opacity-80">
            <div className="absolute left-4 top-4 h-24 w-32 rounded-full border border-white/15" />
            <div className="absolute right-8 top-8 h-20 w-28 rounded-full border border-[#57DFFE]/35" />
            <div className="absolute left-0 top-24 h-1 w-full rotate-[-10deg] bg-white/10" />
          </div>
          <div className="relative grid h-full place-items-center rounded-[22px] bg-white/10 ring-1 ring-white/15 backdrop-blur">
            <div className="grid h-16 w-16 place-items-center rounded-[22px] bg-white text-[#2563EB] shadow-card">
              <MobileIcon name="ev_station" filled className="text-[34px]" />
            </div>
          </div>
        </div>

        <div className="p-5 pt-0">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-2xl font-bold leading-7">{location.name}</h3>
              <p className="mt-2 text-sm leading-6 text-blue-100">{location.address}</p>
            </div>
            <Badge tone={location.availableChargers > 0 ? "green" : "amber"}>{location.status}</Badge>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <DetailStat icon="bolt" label="Availability" value={`${location.availableChargers}/${location.totalChargers}`} />
            <DetailStat icon="route" label="Distance" value={location.distance} />
          </div>
        </div>
      </section>

      <section className="driver-glass mt-4 rounded-[24px] p-4">
        <div className="flex gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#EAEDFF] text-[#2563EB]">
            <MobileIcon name="verified" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#131B2E]">No top-up required. Pay only for actual usage.</p>
            <p className="mt-1 text-xs leading-5 text-[#434655]">ChargePass settles the final cost from measured kWh and creates an automatic receipt.</p>
          </div>
        </div>
      </section>

      <section className="driver-card mt-4 rounded-[24px] p-4">
        <h3 className="text-xl font-semibold text-[#131B2E]">Charging details</h3>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <PriceTile icon="payments" label="Price / kWh" value={formatCurrency(location.pricePerKwh)} />
          <PriceTile icon="receipt_long" label="Est. cost" value={formatCurrency(location.estimatedCost)} />
        </div>
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#434655]/70">Connector type</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {location.connectorTypes.map((connector) => (
              <span key={connector} className="rounded-full bg-[#EAEDFF] px-3 py-2 text-xs font-semibold text-[#2563EB] ring-1 ring-[#2563EB]/10">
                {connector}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="driver-card mt-4 rounded-[24px] p-4">
        <h3 className="text-xl font-semibold text-[#131B2E]">Charger list</h3>
        <div className="mt-3 space-y-2">
          {chargerStatuses.map((charger) => (
            <div key={charger.id} className="flex items-center justify-between rounded-2xl bg-white/72 px-3 py-3 ring-1 ring-[#C3C6D7]/35">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#EAEDFF] text-[#2563EB]">
                  <MobileIcon name="power" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#131B2E]">{charger.id}</p>
                  <p className="text-xs text-[#434655]">{charger.connector}</p>
                </div>
              </div>
              <Badge tone={charger.status === "Available" ? "green" : charger.status === "Charging" ? "amber" : "gray"}>
                {charger.status}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3">
        <Button onClick={onScanQr} className="min-h-12">
          <MobileIcon name="qr_code_scanner" />
          Scan QR
        </Button>
        <Button variant="secondary" onClick={onStartCharging} className="min-h-12">
          Start Charging
        </Button>
      </section>
    </div>
  );
}

function buildChargerStatuses(location) {
  const busyCount = location.totalChargers - location.availableChargers;

  return Array.from({ length: location.totalChargers }, (_, index) => {
    const connector = location.connectorTypes[index % location.connectorTypes.length];
    const isAvailable = index < location.availableChargers;

    return {
      id: `Charger ${index + 1}`,
      connector,
      status: isAvailable ? "Available" : index - location.availableChargers < Math.ceil(busyCount / 2) ? "Charging" : "Offline"
    };
  });
}

function ScreenTopBar({ eyebrow, title, onBack }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onBack}
        className="grid h-11 w-11 place-items-center rounded-2xl border border-[#C3C6D7]/55 bg-white/80 text-[#131B2E] shadow-card backdrop-blur"
        aria-label="Back to driver home"
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

function PriceTile({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white/72 p-3 ring-1 ring-[#C3C6D7]/35">
      <MobileIcon name={icon} className="text-[#57DFFE]" />
      <p className="mt-2 text-xs font-semibold text-[#434655]">{label}</p>
      <p className="mt-1 text-base font-bold text-[#131B2E]">{value}</p>
    </div>
  );
}

function DetailStat({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white/12 p-3 ring-1 ring-white/15 backdrop-blur">
      <MobileIcon name={icon} className="text-[#57DFFE]" />
      <p className="mt-2 text-xs text-blue-100">{label}</p>
      <p className="mt-1 text-xl font-bold text-white">{value}</p>
    </div>
  );
}
