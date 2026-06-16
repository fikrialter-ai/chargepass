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
    eyebrow: "Mobile Driver App",
    title: "Charge at any SPKLU without prepaid balance",
    body:
      "A fintech-style mobile flow for finding nearby Surabaya SPKLU, scanning a charger, authorizing payment, tracking charging progress, and sending receipts to the company.",
    to: "/driver",
    cta: "Open Driver App",
    icon: "EV",
    gradient: "from-[#2563EB] via-[#2563EB] to-[#57DFFE]",
    stats: [
      ["Nearby SPKLU", "5"],
      ["Monthly kWh", "148.6"],
      ["Receipt", "Auto"]
    ]
  },
  {
    eyebrow: "Company App",
    title: "Control fleet charging cost and monthly billing",
    body:
      "A B2B SaaS dashboard for finance and fleet teams to monitor vehicles, drivers, transactions, kWh usage, receipts, and monthly invoices.",
    to: "/company",
    cta: "Open Company App",
    icon: "CO",
    gradient: "from-[#0F172A] via-[#1D4ED8] to-[#06B6D4]",
    stats: [
      ["Sessions", "186"],
      ["Fleet kWh", "2,487"],
      ["Invoice", "Ready"]
    ]
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

          <div className="mt-8 rounded-[28px] border border-line bg-white/82 p-5 shadow-card backdrop-blur">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-blue-electric">Prototype split</p>
            <div className="mt-4 grid gap-3 text-sm font-semibold text-slate-600">
              <AppSplitRow label="Driver App" value="/driver" />
              <AppSplitRow label="Company App" value="/company" />
              <AppSplitRow label="Legacy dashboard alias" value="/dashboard" />
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          {appChoices.map((app) => (
            <AppChoiceCard key={app.to} app={app} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AppChoiceCard({ app }) {
  return (
    <article className="group overflow-hidden rounded-[32px] border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-raised">
      <div className={`rounded-[28px] bg-gradient-to-br ${app.gradient} p-5 text-white shadow-glow`}>
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-white/72">{app.eyebrow}</p>
            <h3 className="mt-3 max-w-xl text-2xl font-black leading-8">{app.title}</h3>
          </div>
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/16 text-sm font-black ring-1 ring-white/20">
            {app.icon}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {app.stats.map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white/12 p-3 ring-1 ring-white/12 backdrop-blur">
              <p className="text-[11px] font-bold text-white/68">{label}</p>
              <p className="mt-1 whitespace-nowrap text-lg font-black">{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 pt-5">
        <p className="text-sm leading-6 text-slate-600">{app.body}</p>
        <Link
          to={app.to}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-blue-electric px-5 text-sm font-black text-white transition hover:bg-blue-deep hover:shadow-card"
        >
          {app.cta}
        </Link>
      </div>
    </article>
  );
}

function AppSplitRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3 ring-1 ring-line/70">
      <span>{label}</span>
      <code className="rounded-full bg-white px-3 py-1 text-xs font-black text-blue-electric shadow-sm">{value}</code>
    </div>
  );
}
