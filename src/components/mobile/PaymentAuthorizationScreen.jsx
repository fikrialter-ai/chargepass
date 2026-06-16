import { useState } from "react";
import { Button } from "../ui/Button.jsx";
import { formatCurrency } from "../../utils/formatters.js";

const paymentMethods = ["Corporate Billing Account", "QRIS", "Debit/Credit Card", "Bank Virtual Account"];

export function PaymentAuthorizationScreen({ location, onBack, onAuthorize }) {
  const chargerId = `${location.id.toUpperCase().replace("SPKLU-", "CHG-")}-01`;
  const connectorType = location.connectorTypes[0] ?? "CCS2";
  const [activeMethod, setActiveMethod] = useState(paymentMethods[0]);

  return (
    <div className="min-h-full bg-cloud px-4 pb-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          className="grid h-10 w-10 place-items-center rounded-2xl border border-line bg-white text-lg font-black text-navy shadow-card"
          aria-label="Back to SPKLU detail"
        >
          &lt;
        </button>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-electric">Authorization</p>
          <h2 className="text-lg font-black text-navy">Payment Authorization</h2>
        </div>
      </div>

      <section className="mt-5 rounded-[28px] p-5 text-white shadow-glow fintech-gradient">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan">Usage authorization</p>
        <h3 className="mt-2 text-xl font-black leading-6">{location.name}</h3>
        <p className="mt-2 text-sm leading-6 text-blue-100">{location.address}</p>
        <div className="mt-4 rounded-2xl bg-white/10 p-3 text-xs font-bold text-white ring-1 ring-white/10">
          No top-up. Final charge is based on completed kWh.
        </div>
      </section>

      <section className="mt-4 rounded-[24px] border border-line bg-white p-4 shadow-card">
        <h3 className="font-black text-navy">Session details</h3>
        <div className="mt-4 space-y-3 text-sm">
          <AuthorizationRow label="Charger ID" value={chargerId} />
          <AuthorizationRow label="Connector type" value={connectorType} />
          <AuthorizationRow label="Price per kWh" value={formatCurrency(location.pricePerKwh)} />
          <AuthorizationRow label="Estimated max cost" value={formatCurrency(location.estimatedCost)} />
        </div>
      </section>

      <section className="mt-4 rounded-[24px] border border-line bg-white p-4 shadow-card">
        <h3 className="font-black text-navy">Payment method</h3>
        <div className="mt-3 space-y-2">
          {paymentMethods.map((method, index) => (
            <button
              key={method}
              type="button"
              onClick={() => setActiveMethod(method)}
              className={`flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left text-sm font-black transition ${
                activeMethod === method
                  ? "border-blue-electric bg-blue-pale text-blue-deep"
                  : "border-line bg-white text-navy hover:border-blue-electric"
              }`}
            >
              <span>{method}</span>
              <span
                className={`grid h-5 w-5 place-items-center rounded-full border ${
                  activeMethod === method ? "border-blue-electric bg-blue-electric" : "border-slate-300"
                }`}
              >
                {activeMethod === method ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-[24px] border border-blue-electric/20 bg-blue-pale p-4">
        <p className="text-sm font-black leading-6 text-blue-deep">
          No top-up. We only charge your actual usage after charging is complete.
        </p>
      </section>

      <Button className="mt-4 w-full" onClick={onAuthorize}>
        Authorize Payment
      </Button>
    </div>
  );
}

function AuthorizationRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-3 py-3 ring-1 ring-line/70">
      <span className="font-semibold text-slate-500">{label}</span>
      <span className="text-right font-black text-navy">{value}</span>
    </div>
  );
}
