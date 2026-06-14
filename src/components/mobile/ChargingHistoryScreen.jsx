import { useState } from "react";
import { Badge } from "../ui/Badge.jsx";
import { chargingSessions } from "../../data/mockData.js";
import { formatCurrency } from "../../utils/formatters.js";

const historyFilters = ["This Week", "This Month", "By Vehicle"];

export function ChargingHistoryScreen() {
  const [activeFilter, setActiveFilter] = useState(historyFilters[0]);

  return (
    <div className="min-h-full bg-cloud px-4 pb-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-electric">History</p>
          <h2 className="text-2xl font-black text-navy">Charging History</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">Review sessions and export receipts.</p>
        </div>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-2xl bg-navy text-sm font-black text-white shadow-card"
          aria-label="Driver profile summary"
        >
          RP
        </button>
      </div>

      <section className="mt-5 rounded-[32px] bg-[linear-gradient(145deg,#0F172A_0%,#2563EB_72%,#8B5CF6_135%)] p-5 text-white shadow-soft">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan">Recent charging spend</p>
        <h3 className="mt-3 text-4xl font-black leading-none">{formatCurrency(chargingSessions.reduce((total, session) => total + session.cost, 0))}</h3>
        <p className="mt-2 text-sm font-semibold text-blue-100">{chargingSessions.length} automatic receipts generated</p>
      </section>

      <div className="phone-screen -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1">
        {historyFilters.map((filter, index) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`shrink-0 rounded-full border px-3.5 py-2.5 text-xs font-bold transition duration-200 ${
              activeFilter === filter
                ? "border-navy bg-navy text-white shadow-card"
                : "border-line bg-white text-slate-600 shadow-sm hover:border-blue-electric hover:text-blue-electric"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => window.alert(`Receipts export prepared for ${activeFilter}.`)}
        className="mt-4 w-full rounded-2xl border border-blue-electric bg-white px-4 py-3 text-sm font-black text-blue-electric shadow-card transition hover:bg-blue-pale hover:shadow-raised"
      >
        Export Receipts
      </button>

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
    <article className="rounded-[26px] border border-line bg-white p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-raised">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-base font-black leading-5 text-navy">{session.location}</h3>
          <p className="mt-1 text-xs font-semibold text-slate-500">{session.date}</p>
        </div>
        <Badge tone={session.paymentStatus.includes("Paid") ? "green" : "amber"}>{session.paymentStatus}</Badge>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <HistoryStat label="kWh" value={`${session.kWh} kWh`} />
        <HistoryStat label="Duration" value={session.duration} />
        <HistoryStat label="Cost" value={formatCurrency(session.cost)} />
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-3 ring-1 ring-line/70">
        <span className="text-xs font-bold uppercase tracking-[0.08em] text-slate-400">Receipt</span>
        <span className="text-right text-xs font-black text-navy">{session.receiptStatus}</span>
      </div>
    </article>
  );
}

function HistoryStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-line/70">
      <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-black text-navy">{value}</p>
    </div>
  );
}
