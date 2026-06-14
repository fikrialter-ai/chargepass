import { useState } from "react";
import { formatCurrency } from "../../utils/formatters.js";

const paymentMethods = ["Corporate Account", "QRIS", "Debit/Credit Card", "E-Wallet"];

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

      <section className="mt-5 rounded-[32px] bg-[linear-gradient(145deg,#0F172A_0%,#2563EB_70%,#8B5CF6_135%)] p-5 text-white shadow-soft">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan">Payment authorization</p>
        <h3 className="mt-3 text-3xl font-black leading-none">{formatCurrency(location.estimatedCost)}</h3>
        <p className="mt-2 text-sm font-semibold text-blue-100">Estimated maximum cost before final kWh settlement</p>
        <div className="mt-5 rounded-[24px] bg-white/10 p-4 ring-1 ring-white/10">
          <h4 className="text-base font-black text-white">{location.name}</h4>
          <p className="mt-2 text-xs leading-5 text-blue-100">{location.address}</p>
          <p className="mt-3 text-xs font-black text-cyan">No prepaid wallet. Final charge follows completed usage.</p>
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
        <h3 className="font-black text-navy">Payment rail</h3>
        <div className="mt-3 space-y-2">
          {paymentMethods.map((method, index) => (
            <button
              key={method}
              type="button"
              onClick={() => setActiveMethod(method)}
              className={`flex w-full items-center justify-between rounded-[22px] border px-3 py-3 text-left text-sm font-black transition ${
                activeMethod === method
                  ? "border-blue-electric bg-blue-pale text-blue-deep shadow-card"
                  : "border-line bg-white text-navy hover:border-blue-electric"
              }`}
            >
              <span className="flex items-center gap-3">
                <span className={`grid h-9 w-9 place-items-center rounded-2xl text-[11px] font-black ${
                  activeMethod === method ? "bg-blue-electric text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  CP
                </span>
                {method}
              </span>
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

      <button
        type="button"
        onClick={onAuthorize}
        className="mt-4 w-full rounded-2xl bg-blue-electric px-4 py-3 text-sm font-black text-white shadow-card hover:bg-blue-deep"
      >
        Authorize Payment
      </button>
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
