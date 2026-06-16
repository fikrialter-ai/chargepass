import { Badge } from "../ui/Badge.jsx";
import { Button } from "../ui/Button.jsx";
import { formatCurrency } from "../../utils/formatters.js";

export function SpkluCard({ location, onViewDetail }) {
  return (
    <article className="cp-card rounded-[26px] bg-white p-4 transition duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,#EFF6FF,#CCFBF1)] text-sm font-black text-blue-electric ring-1 ring-blue-electric/10">
            CP
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
        <Button size="sm" onClick={() => onViewDetail(location)}>
          View Detail
        </Button>
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
