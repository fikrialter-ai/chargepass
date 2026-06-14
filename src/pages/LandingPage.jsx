import { Link } from "react-router-dom";
import { Badge } from "../components/ui/Badge.jsx";

export function LandingPage() {
  return (
    <section className="dashboard-grid">
      <div className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl content-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div className="max-w-3xl">
          <Badge tone="blue">ChargePass Prototype</Badge>
          <h2 className="mt-5 text-4xl font-black tracking-normal text-navy sm:text-6xl">
            One charging pass for drivers and fleet finance.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Explore a dummy-data prototype for EV drivers using SPKLU stations and companies controlling charging
            costs, kWh usage, receipts, reports, and monthly invoices.
          </p>
          <div className="mt-8 grid gap-3 sm:flex">
            <Link
              to="/driver"
              className="rounded-2xl bg-blue-electric px-5 py-3 text-center text-sm font-black text-white shadow-card hover:bg-blue-deep"
            >
              Open Driver App
            </Link>
            <Link
              to="/dashboard"
              className="rounded-2xl border border-line bg-white px-5 py-3 text-center text-sm font-black text-navy shadow-card hover:bg-slate-50"
            >
              Open Company Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["No top-up", "Drivers pay through assigned company or card rails without prepaid wallet balance."],
            ["Actual usage", "Settlement is based on completed kWh sessions, station tariff, and receipt data."],
            ["No trapped balance", "Finance avoids stranded wallet funds across multiple SPKLU operators."],
            ["Fleet cost control", "Policies, reports, and monthly invoices keep EV operations accountable."]
          ].map(([title, body]) => (
            <article key={title} className="rounded-[24px] border border-line bg-white p-5 shadow-card">
              <div className="mb-4 h-1.5 w-10 rounded-full bg-blue-electric" />
              <h3 className="text-lg font-black text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
