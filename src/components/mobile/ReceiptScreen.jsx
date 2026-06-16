import { Button } from "../ui/Button.jsx";
import { MobileIcon } from "./MobileIcon.jsx";
import { formatCurrency } from "../../utils/formatters.js";

const finalReceipt = {
  receiptId: "CP-RCPT-250612-1192",
  date: "12 Jun 2026, 10:48",
  vehicle: "L 2187 EV - Hyundai Ioniq 5",
  totalKwh: 19.4,
  duration: "35 min",
  totalCost: 47840,
  paymentMethod: "Corporate Billing Account"
};

export function ReceiptScreen({ location, onDone }) {
  return (
    <div className="min-h-full px-4 pb-5">
      <div className="text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-[24px] bg-[#10B981]/10 text-[#10B981] ring-1 ring-[#10B981]/20">
          <MobileIcon name="check_circle" filled className="text-[34px]" />
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#10B981]">Charging Complete</p>
        <h2 className="mt-1 text-[28px] font-bold leading-8 text-[#131B2E]">Charging Receipt</h2>
        <p className="mt-1 text-sm leading-6 text-[#434655]">Automatic receipt generated for this session.</p>
      </div>

      <section className="driver-card mt-5 overflow-hidden rounded-[24px] p-0">
        <div className="p-5 text-white driver-primary-panel">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-normal text-blue-100">Total cost</p>
              <h3 className="mt-2 text-[40px] font-bold leading-none">{formatCurrency(finalReceipt.totalCost)}</h3>
            </div>
            <div className="rounded-full bg-[#10B981] px-3 py-1 text-xs font-semibold text-white">Paid</div>
          </div>
          <p className="mt-4 text-sm leading-6 text-blue-100">{location.name}</p>
        </div>

        <div className="border-b border-dashed border-[#C3C6D7]/70 px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#434655]/70">Receipt ID</p>
          <p className="mt-1 font-bold text-[#131B2E]">{finalReceipt.receiptId}</p>
        </div>

        <div className="px-5 py-2">
          <ReceiptRow label="Station location" value={location.name} />
          <ReceiptRow label="Date and time" value={finalReceipt.date} />
          <ReceiptRow label="Vehicle" value={finalReceipt.vehicle} />
          <ReceiptRow label="Total kWh" value={`${finalReceipt.totalKwh} kWh`} />
          <ReceiptRow label="Duration" value={finalReceipt.duration} />
          <ReceiptRow label="Payment method" value={finalReceipt.paymentMethod} />
          <ReceiptRow label="Total cost" value={formatCurrency(finalReceipt.totalCost)} strong />
        </div>
      </section>

      <section className="driver-glass mt-4 rounded-[24px] p-4">
        <p className="text-sm font-bold text-[#131B2E]">No trapped balance. You paid only for actual charging usage.</p>
      </section>

      <div className="mt-4 grid gap-3">
        <Button variant="ghost" onClick={() => window.alert("Receipt download prepared.")}>
          <MobileIcon name="download" />
          Download Receipt
        </Button>
        <Button variant="secondary" onClick={() => window.alert("Receipt sent to company finance.")}>
          <MobileIcon name="forward_to_inbox" />
          Send to Company
        </Button>
        <Button onClick={onDone}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}

function ReceiptRow({ label, value, strong = false }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-[#C3C6D7]/40 py-3 last:border-b-0">
      <span className="text-sm font-normal text-[#434655]">{label}</span>
      <span className={`max-w-[58%] text-right text-sm ${strong ? "font-bold text-[#2563EB]" : "font-semibold text-[#131B2E]"}`}>
        {value}
      </span>
    </div>
  );
}
