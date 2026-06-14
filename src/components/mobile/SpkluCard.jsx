import { Badge } from "../ui/Badge.jsx";
import { formatCurrency } from "../../utils/formatters.js";

export function SpkluCard({ location, onViewDetail }) {
  return (
    <article className="rounded-[26px] border border-line bg-white p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-raised">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-3 grid h-10 w-10 place-items-center rounded-2xl bg-blue-pale text-sm font-black text-blue-electric">
            EV
          </div>
          <h3 className="text-base font-black leading-5 text-navy">{location.name}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">{location.address}</p>
        </div>
        <Badge tone={location.availableChargers > 0 ? "green" : "gray"}>{location.status}</Badge>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <InfoTile label="Distance" value={location.distance} />
        <InfoTile label="Chargers" value={`${location.availableChargers}/${location.totalChargers} available`} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {location.connectorTypes.map((connector) => (
          <span key={connector} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600 ring-1 ring-line">
            {connector}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-500">Actual tariff / kWh</p>
          <p className="font-black text-blue-electric">{formatCurrency(location.pricePerKwh)}</p>
        </div>
        <button
          type="button"
          onClick={() => onViewDetail(location)}
          className="rounded-2xl bg-navy px-4 py-2.5 text-sm font-black text-white transition hover:bg-blue-deep"
        >
          View Detail
        </button>
      </div>
    </article>
  );
}

function InfoTile({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-line/70">
      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">{label}</p>
      <p className="mt-1 font-black text-navy">{value}</p>
    </div>
  );
}
