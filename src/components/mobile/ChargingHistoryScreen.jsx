import { useState } from "react";
import { Badge } from "../ui/Badge.jsx";
import { Button } from "../ui/Button.jsx";
import { MobileIcon } from "./MobileIcon.jsx";
import { chargingSessions } from "../../data/mockData.js";
import { formatCurrency } from "../../utils/formatters.js";

const historyFilters = ["This Week", "This Month", "By Vehicle"];

export function ChargingHistoryScreen({ onOpenProfile }) {
  const [activeFilter, setActiveFilter] = useState(historyFilters[0]);

  return (
    <div className="min-h-full px-4 pb-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2563EB]">History</p>
          <h2 className="mt-1 text-[28px] font-bold leading-8 text-[#131B2E]">Charging History</h2>
          <p className="mt-1 text-sm leading-6 text-[#434655]">Review sessions and export receipts.</p>
        </div>
        <button
          type="button"
          onClick={onOpenProfile}
          className="grid h-12 w-12 place-items-center rounded-2xl bg-[#131B2E] text-sm font-bold text-white shadow-card"
          aria-label="Driver profile summary"
        >
          RP
        </button>
      </div>

      <div className="phone-screen -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1">
        {historyFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`min-h-10 shrink-0 rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.03em] transition duration-200 ${
              activeFilter === filter
                ? "border-[#2563EB] bg-[#2563EB] text-white shadow-card"
                : "border-[#C3C6D7]/70 bg-white/76 text-[#434655] shadow-sm backdrop-blur hover:border-[#2563EB] hover:text-[#2563EB]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <Button variant="secondary" className="mt-4 w-full" onClick={() => window.alert(`Receipts export prepared for ${activeFilter}.`)}>
        <MobileIcon name="ios_share" />
        Export Receipts
      </Button>

      <section className="mt-5 space-y-3">
        {chargingSessions.map((session) => (
          <HistoryCard key={session.id} session={session} />
        ))}
      </section>
    </div>
  );
}

function HistoryCard({ session }) {
  return (
    <article className="driver-card rounded-[24px] p-4 transition duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-bold leading-5 text-[#131B2E]">{session.location}</h3>
          <p className="mt-1 text-xs font-normal text-[#434655]">{session.date}</p>
        </div>
        <Badge tone={session.paymentStatus.includes("Paid") ? "green" : "amber"}>{session.paymentStatus}</Badge>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <HistoryStat icon="electric_bolt" label="kWh" value={`${session.kWh} kWh`} />
        <HistoryStat icon="timer" label="Duration" value={session.duration} />
        <HistoryStat icon="payments" label="Cost" value={formatCurrency(session.cost)} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-white/72 px-3 py-3 ring-1 ring-[#C3C6D7]/35">
        <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#434655]/70">
          <MobileIcon name="receipt_long" className="text-[#57DFFE]" />
          Receipt
        </span>
        <span className="text-right text-xs font-bold text-[#131B2E]">{session.receiptStatus}</span>
      </div>
    </article>
  );
}

function HistoryStat({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white/72 p-3 ring-1 ring-[#C3C6D7]/35">
      <MobileIcon name={icon} className="text-[#57DFFE]" />
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#434655]/70">{label}</p>
      <p className="mt-1 text-xs font-bold text-[#131B2E]">{value}</p>
    </div>
  );
}
