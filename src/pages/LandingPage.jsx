import { Link } from "react-router-dom";
import { Badge } from "../components/ui/Badge.jsx";

const productPillars = [
  "No top-up",
  "Pay only for actual usage",
  "No trapped balance",
  "Automatic receipt",
  "Fleet cost control"
];

const appChoices = [
  {
    title: "Driver App",
    body: "Find SPKLU, authorize payment, start charging, and get automatic receipts.",
    to: "/driver",
    cta: "Open Driver App",
    icon: "EV"
  },
  {
    title: "Company Dashboard",
    body:
      "Monitor fleet charging cost, kWh usage, transactions, receipts, and monthly invoices.",
    to: "/company",
    cta: "Open Company Dashboard",
    icon: "CO"
  }
];

export function LandingPage() {
  return (
    <section className="dashboard-grid min-h-[calc(100vh-73px)] overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-16">
        <div className="flex flex-col justify-center">
          <Badge tone="blue">ChargePass Prototype</Badge>
          <h2 className="mt-5 max-w-3xl text-4xl font-black leading-tight tracking-normal text-navy sm:text-6xl">
            One payment layer for all SPKLU.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            ChargePass separates the driver charging experience from the company finance console, while keeping the
            same product logic: actual usage billing, automatic receipts, and fleet cost control.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {productPillars.map((pillar) => (
              <span
                key={pillar}
                className="rounded-full border border-line bg-white/86 px-3 py-2 text-xs font-black text-slate-600 shadow-sm"
              >
                {pillar}
              </span>
            ))}
          </div>
        </div>

        <section className="rounded-[32px] border border-line bg-white/82 p-5 shadow-card backdrop-blur">
          <div className="rounded-[28px] bg-[radial-gradient(circle_at_18%_10%,rgba(87,223,254,0.22),transparent_28%),radial-gradient(circle_at_90%_12%,rgba(37,99,235,0.16),transparent_32%),linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-5 ring-1 ring-white/80">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-blue-electric">Product Demo</p>
            <h3 className="mt-3 text-3xl font-black leading-tight text-navy">Choose your ChargePass experience</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Open the mobile charging flow or the fleet finance console depending on the story you want to present.
            </p>
          </div>

          <div className="mt-5 grid gap-4">
            {appChoices.map((app) => (
              <AppChoiceCard key={app.to} app={app} />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function AppChoiceCard({ app }) {
  return (
    <article className="group rounded-[28px] border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-raised">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,#2563EB,#06B6D4)] text-sm font-black text-white shadow-glow">
            {app.icon}
          </div>
          <div className="min-w-0">
            <h4 className="text-xl font-black text-navy">{app.title}</h4>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-600">{app.body}</p>
          </div>
        </div>
        <Link
          to={app.to}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl bg-blue-electric px-5 text-sm font-black text-white transition hover:bg-blue-deep hover:shadow-card"
        >
          {app.cta}
        </Link>
      </div>
    </article>
  );
}
