import { formatCurrency } from "../../utils/formatters.js";

const finalReceipt = {
  receiptId: "CP-RCPT-250612-1192",
  date: "12 Jun 2026, 10:48",
  vehicle: "B 2187 EV - Hyundai Ioniq 5",
  totalKwh: 19.4,
  duration: "35 min",
  totalCost: 47840,
  paymentMethod: "Corporate Account"
};

export function ReceiptScreen({ location, onDone }) {
  return (
    <div className="min-h-full bg-cloud px-4 pb-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-mint">Charging Complete</p>
        <h2 className="text-2xl font-black text-navy">Charging Receipt</h2>
        <p className="mt-1 text-sm leading-6 text-slate-500">Automatic receipt generated for this session.</p>
      </div>

      <section className="mt-5 overflow-hidden rounded-[28px] border border-line bg-white shadow-card">
        <div className="bg-navy p-5 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-blue-100">Total cost</p>
              <h3 className="mt-2 text-3xl font-black">{formatCurrency(finalReceipt.totalCost)}</h3>
            </div>
            <div className="rounded-full bg-success px-3 py-1 text-xs font-black text-white">Paid</div>
          </div>
          <p className="mt-4 text-sm leading-6 text-blue-100">{location.name}</p>
        </div>

        <div className="border-b border-dashed border-line px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">Receipt ID</p>
          <p className="mt-1 font-black text-navy">{finalReceipt.receiptId}</p>
        </div>

        <div className="px-5 py-2">
          <ReceiptRow label="Location" value={location.name} />
          <ReceiptRow label="Date" value={finalReceipt.date} />
          <ReceiptRow label="Vehicle" value={finalReceipt.vehicle} />
          <ReceiptRow label="Total kWh" value={`${finalReceipt.totalKwh} kWh`} />
          <ReceiptRow label="Duration" value={finalReceipt.duration} />
          <ReceiptRow label="Total cost" value={formatCurrency(finalReceipt.totalCost)} strong />
          <ReceiptRow label="Payment method" value={finalReceipt.paymentMethod} />
        </div>
      </section>

      <section className="mt-4 rounded-[24px] border border-blue-electric/20 bg-white p-4 shadow-card">
        <p className="text-sm font-black text-blue-deep">No trapped balance. You paid only for actual charging usage.</p>
      </section>

      <div className="mt-4 grid gap-3">
        <button
          type="button"
          onClick={() => window.alert("Receipt download prepared.")}
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm font-black text-navy shadow-card hover:bg-slate-50"
        >
          Download Receipt
        </button>
        <button
          type="button"
          onClick={() => window.alert("Receipt sent to company finance.")}
          className="w-full rounded-2xl border border-blue-electric bg-white px-4 py-3 text-sm font-black text-blue-electric shadow-card hover:bg-blue-pale"
        >
          Send to Company
        </button>
        <button
          type="button"
          onClick={onDone}
          className="w-full rounded-2xl bg-blue-electric px-4 py-3 text-sm font-black text-white shadow-card hover:bg-blue-deep"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

function ReceiptRow({ label, value, strong = false }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line py-3 last:border-b-0">
      <span className="text-sm font-semibold text-slate-500">{label}</span>
      <span className={`max-w-[58%] text-right text-sm ${strong ? "font-black text-blue-electric" : "font-bold text-navy"}`}>
        {value}
      </span>
    </div>
  );
}
