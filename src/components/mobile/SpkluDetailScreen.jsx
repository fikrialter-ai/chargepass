import { Badge } from "../ui/Badge.jsx";
import { formatCurrency } from "../../utils/formatters.js";

export function SpkluDetailScreen({ location, onBack, onScanQr, onStartCharging }) {
  const chargerStatuses = buildChargerStatuses(location);

  return (
    <div className="min-h-full bg-cloud px-4 pb-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="grid h-10 w-10 place-items-center rounded-2xl border border-line bg-white text-lg font-black text-navy shadow-card"
          aria-label="Back to driver home"
        >
          &lt;
        </button>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-electric">SPKLU Detail</p>
          <h2 className="text-lg font-black text-navy">Station info</h2>
        </div>
      </div>

      <section className="mt-5 overflow-hidden rounded-[28px] bg-navy text-white shadow-soft">
        <div className="h-32 bg-[linear-gradient(135deg,#EFF6FF,#E0F7FF)] p-4 text-navy">
          <div className="relative h-full overflow-hidden rounded-2xl bg-white/80">
            <div className="absolute left-4 top-4 h-24 w-28 rounded-full border border-blue-electric/20" />
            <div className="absolute right-8 top-8 h-20 w-24 rounded-full border border-blue-electric/20" />
            <div className="absolute left-0 top-20 h-1 w-full rotate-[-12deg] bg-blue-electric/10" />
            <div className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border-4 border-white bg-blue-electric text-xs font-black text-white shadow-card">
              CP
            </div>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-black leading-6">{location.name}</h3>
              <p className="mt-2 text-sm leading-6 text-blue-100">{location.address}</p>
            </div>
            <Badge tone={location.availableChargers > 0 ? "green" : "gray"}>{location.status}</Badge>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <DetailStat label="Distance" value={location.distance} />
            <DetailStat label="Chargers" value={`${location.availableChargers}/${location.totalChargers} available`} />
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[24px] border border-blue-electric/20 bg-white p-4 shadow-card">
        <p className="text-sm font-black text-blue-deep">No top-up required. Pay only for actual usage.</p>
        <p className="mt-2 text-xs leading-5 text-slate-600">
          ChargePass authorizes first, then settles the final cost from measured kWh. No trapped balance.
        </p>
      </section>

      <section className="mt-4 rounded-[24px] border border-line bg-white p-4 shadow-card">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-navy">Charging details</h3>
          <Badge tone={location.availableChargers > 0 ? "green" : "gray"}>{location.status}</Badge>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <PriceTile label="Price per kWh" value={formatCurrency(location.pricePerKwh)} />
          <PriceTile label="Estimated cost" value={formatCurrency(location.estimatedCost)} />
        </div>
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-slate-400">Connector types</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {location.connectorTypes.map((connector) => (
              <span key={connector} className="rounded-full bg-blue-pale px-3 py-2 text-xs font-black text-blue-deep ring-1 ring-blue-electric/15">
                {connector}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[24px] border border-line bg-white p-4 shadow-card">
        <h3 className="font-black text-navy">Charger status</h3>
        <div className="mt-3 space-y-2">
          {chargerStatuses.map((charger) => (
            <div key={charger.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-3 ring-1 ring-line/70">
              <div>
                <p className="text-sm font-black text-navy">{charger.id}</p>
                <p className="text-xs font-semibold text-slate-500">{charger.connector}</p>
              </div>
              <Badge tone={charger.status === "Available" ? "green" : charger.status === "Charging" ? "blue" : "gray"}>
                {charger.status}
              </Badge>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onScanQr}
          className="rounded-2xl border border-blue-electric bg-white px-4 py-3 text-sm font-black text-blue-electric shadow-card hover:bg-blue-pale"
        >
          Scan QR
        </button>
        <button
          type="button"
          onClick={onStartCharging}
          className="rounded-2xl bg-blue-electric px-4 py-3 text-sm font-black text-white shadow-card hover:bg-blue-deep"
        >
          Start Charging
        </button>
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

function PriceTile({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-line/70">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-base font-black text-navy">{value}</p>
    </div>
  );
}

function DetailStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">
      <p className="text-xs text-blue-100">{label}</p>
      <p className="mt-1 text-lg font-black text-white">{value}</p>
    </div>
  );
}
