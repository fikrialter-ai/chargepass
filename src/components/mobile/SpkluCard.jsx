import { MobileIcon } from "./MobileIcon.jsx";
import { Badge } from "../ui/Badge.jsx";
import { Button } from "../ui/Button.jsx";
import { formatCurrency } from "../../utils/formatters.js";

export function SpkluCard({ location, onViewDetail }) {
  const isAvailable = location.availableChargers > 0;

  return (
    <article className="driver-card rounded-[24px] p-4 transition duration-200 hover:-translate-y-0.5">
      <div className="flex items-start gap-3">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#EAEDFF] text-[#2563EB] ring-1 ring-[#2563EB]/10">
          <MobileIcon name="ev_station" filled className="text-[26px]" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-base font-bold leading-5 text-[#131B2E]">{location.name}</h3>
            <Badge tone={isAvailable ? "green" : "amber"}>{location.status}</Badge>
          </div>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#434655]">{location.address}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <InfoTile icon="route" label="Distance" value={location.distance} />
        <InfoTile icon="bolt" label="Chargers" value={`${location.availableChargers}/${location.totalChargers}`} />
        <InfoTile icon="payments" label="Tariff" value={formatCurrency(location.pricePerKwh)} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {location.connectorTypes.slice(0, 3).map((connector) => (
          <span key={connector} className="rounded-full bg-[#EAEDFF] px-3 py-1.5 text-[11px] font-semibold text-[#2563EB] ring-1 ring-[#2563EB]/10">
            {connector}
          </span>
        ))}
      </div>

      <Button size="md" className="mt-4 w-full" onClick={() => onViewDetail(location)}>
        View Detail
      </Button>
    </article>
  );
}

function InfoTile({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white/72 p-3 ring-1 ring-[#C3C6D7]/35">
      <MobileIcon name={icon} className="text-[#57DFFE]" />
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#434655]/70">{label}</p>
      <p className="mt-1 truncate text-xs font-bold text-[#131B2E]">{value}</p>
    </div>
  );
}
