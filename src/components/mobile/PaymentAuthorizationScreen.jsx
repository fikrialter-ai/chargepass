import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { MobileIcon } from "./MobileIcon.jsx";
import { formatCurrency } from "../../utils/formatters.js";

const paymentMethods = [
  { label: "Corporate Billing Account", icon: "business_center" },
  { label: "QRIS", icon: "qr_code_2" },
  { label: "Debit/Credit Card", icon: "credit_card" },
  { label: "E-Wallet", icon: "payments" }
];

export function PaymentAuthorizationScreen({ location, onBack, onAuthorize }) {
  const chargerId = `${location.id.toUpperCase().replace("SPKLU-", "CHG-")}-01`;
  const connectorType = location.connectorTypes[0] ?? "CCS2";
  const [activeMethod, setActiveMethod] = useState(paymentMethods[0].label);

  return (
    <div className="min-h-full px-4 pb-5">
      <ScreenTopBar eyebrow="Authorization" title="Payment Authorization" onBack={onBack} />

      <section className="mt-5 rounded-[24px] p-5 text-white shadow-glow driver-primary-panel">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#57DFFE]">Estimated max cost</p>
        <p className="mt-2 text-[40px] font-bold leading-none">{formatCurrency(location.estimatedCost)}</p>
        <h3 className="mt-5 text-xl font-semibold leading-6">{location.name}</h3>
        <p className="mt-2 text-sm leading-6 text-blue-100">{location.address}</p>
      </section>

      <section className="driver-card mt-4 rounded-[24px] p-4">
        <h3 className="text-xl font-semibold text-[#131B2E]">Session details</h3>
        <div className="mt-4 space-y-3 text-sm">
          <AuthorizationRow icon="tag" label="Charger ID" value={chargerId} />
          <AuthorizationRow icon="cable" label="Connector type" value={connectorType} />
          <AuthorizationRow icon="payments" label="Price per kWh" value={formatCurrency(location.pricePerKwh)} />
        </div>
      </section>

      <section className="driver-card mt-4 rounded-[24px] p-4">
        <h3 className="text-xl font-semibold text-[#131B2E]">Payment method</h3>
        <div className="mt-3 space-y-2">
          {paymentMethods.map((method) => (
            <button
              key={method.label}
              type="button"
              onClick={() => setActiveMethod(method.label)}
              className={`flex min-h-12 w-full items-center justify-between rounded-2xl border px-3 py-3 text-left text-sm font-semibold transition ${
                activeMethod === method.label
                  ? "border-[#2563EB] bg-[#EAEDFF] text-[#2563EB] shadow-card"
                  : "border-[#C3C6D7]/55 bg-white/70 text-[#131B2E] hover:border-[#2563EB]/55"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={`grid h-9 w-9 place-items-center rounded-xl ${activeMethod === method.label ? "bg-white text-[#2563EB]" : "bg-[#EAEDFF] text-[#434655]"}`}>
                  <MobileIcon name={method.icon} />
                </span>
                {method.label}
              </span>
              <span
                className={`grid h-5 w-5 place-items-center rounded-full border ${
                  activeMethod === method.label ? "border-[#2563EB] bg-[#2563EB]" : "border-[#C3C6D7]"
                }`}
              >
                {activeMethod === method.label ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="driver-glass mt-4 rounded-[24px] p-4">
        <div className="flex gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-[#EAEDFF] text-[#2563EB]">
            <MobileIcon name="verified_user" />
          </div>
          <p className="text-sm font-bold leading-6 text-[#131B2E]">
            No top-up. We only charge your actual usage after charging is complete.
          </p>
        </div>
      </section>

      <Button className="mt-4 w-full" onClick={onAuthorize}>
        Authorize Payment
        <MobileIcon name="arrow_forward" />
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
        aria-label="Back to SPKLU detail"
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

function AuthorizationRow({ icon, label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/72 px-3 py-3 ring-1 ring-[#C3C6D7]/35">
      <span className="flex items-center gap-2 font-normal text-[#434655]">
        <MobileIcon name={icon} className="text-[#57DFFE]" />
        {label}
      </span>
      <span className="text-right font-bold text-[#131B2E]">{value}</span>
    </div>
  );
}
