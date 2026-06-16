import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { Badge } from "../../components/ui/Badge.jsx";
import {
  chargingSessions,
  drivers,
  invoices,
  monthlyInvoice,
  vehicles,
  weeklyChargingCost
} from "../../data/mockData.js";
import { formatCurrency, formatNumber } from "../../utils/formatters.js";

const sidebarItems = ["Overview", "Vehicles", "Drivers", "Transactions", "Monthly Invoice", "Settings"];

const kpis = [
  {
    label: "Total Charging Cost",
    value: formatCurrency(monthlyInvoice.totalChargingCost),
    detail: `${monthlyInvoice.billingPeriod} fleet usage`,
    tone: "blue"
  },
  {
    label: "Total kWh",
    value: formatNumber(monthlyInvoice.totalKwh, " kWh"),
    detail: "Measured across all sessions",
    tone: "mint"
  },
  {
    label: "Charging Sessions",
    value: formatNumber(monthlyInvoice.totalSessions),
    detail: "Completed charging records",
    tone: "navy"
  },
  {
    label: "Active Vehicles",
    value: formatNumber(vehicles.filter((vehicle) => vehicle.status !== "Maintenance").length),
    detail: `${vehicles.length} EVs in fleet registry`,
    tone: "amber"
  }
];

const recentTransactions = chargingSessions.slice(0, 5);
const topVehicles = [...vehicles].sort((a, b) => b.totalCost - a.totalCost).slice(0, 5);

export function DashboardPage() {
  const [activePage, setActivePage] = useState("Overview");
  const [invoiceStatus, setInvoiceStatus] = useState(invoices[0]?.status ?? "Pending approval");

  function showAlert(message) {
    window.setTimeout(() => window.alert(message), 0);
  }

  function markInvoiceAsPaid() {
    setInvoiceStatus("Paid");
    showAlert("Invoice marked as paid.");
  }

  return (
    <section className="min-h-screen bg-cloud text-slate-700">
      <div className="mx-auto flex min-h-screen max-w-[1680px] bg-cloud">
        <DashboardSidebar activePage={activePage} onPageChange={setActivePage} />

        <div className="min-w-0 flex-1">
          <DashboardHeader activePage={activePage} onPageChange={setActivePage} onAction={showAlert} />

          <div className="min-h-[calc(100vh-80px)] bg-cloud px-5 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-6">
              {activePage === "Vehicles" ? (
                <VehiclesPage onAction={showAlert} />
              ) : activePage === "Drivers" ? (
                <DriversPage onAction={showAlert} />
              ) : activePage === "Transactions" ? (
                <TransactionsPage onExport={showAlert} />
              ) : activePage === "Monthly Invoice" ? (
                <InvoicePage invoiceStatus={invoiceStatus} onAction={showAlert} onMarkPaid={markInvoiceAsPaid} />
              ) : activePage === "Settings" ? (
                <PlaceholderPage title="Settings" body="Company settings will be configured in a later prototype pass." />
              ) : (
                <OverviewPage
                  onExport={showAlert}
                  onReviewInvoice={() => setActivePage("Monthly Invoice")}
                  onViewTransactions={() => setActivePage("Transactions")}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewPage({ onExport, onReviewInvoice, onViewTransactions }) {
  return (
    <>
      <OverviewHero onExport={onExport} onReviewInvoice={onReviewInvoice} />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} {...kpi} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.55fr)]">
        <WeeklyCostChart />
        <TopVehicles />
      </section>

      <RecentTransactions onViewAll={onViewTransactions} />
    </>
  );
}

function PlaceholderPage({ title, body }) {
  return (
    <section className="cp-card rounded-[24px] bg-white p-8">
      <Badge tone="gray">{title}</Badge>
      <h2 className="mt-3 text-3xl font-black text-navy">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{body}</p>
    </section>
  );
}

function EmptyState({ title, body }) {
  return (
    <div className="rounded-[24px] border border-dashed border-line bg-slate-50 px-6 py-10 text-center">
      <p className="text-base font-black text-navy">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{body}</p>
    </div>
  );
}

function VehiclesPage({ onAction }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const statusOptions = ["All", ...new Set(vehicles.map((vehicle) => vehicle.status))];

  const filteredVehicles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return vehicles.filter((vehicle) => {
      const matchesStatus = statusFilter === "All" || vehicle.status === statusFilter;
      const matchesSearch =
        !query ||
        [
          vehicle.vehicleId,
          vehicle.plateNumber,
          vehicle.model,
          vehicle.assignedDriver,
          vehicle.status
        ].some((value) => value.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }, [searchQuery, statusFilter]);

  return (
    <>
      <section className="cp-card rounded-[24px] bg-white p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge tone="blue">Vehicles</Badge>
            <h2 className="mt-3 text-3xl font-black text-navy">Fleet vehicles</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Search and monitor vehicle charging totals, assignment, cost, last session, and operating status.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onAction("Add vehicle form opened in prototype.")}
            className="rounded-2xl bg-blue-electric px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-deep hover:shadow-card"
          >
            Add vehicle
          </button>
        </div>
      </section>

      <section className="cp-card rounded-[24px] bg-white p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex h-11 w-full items-center gap-3 rounded-2xl border border-line bg-slate-50 px-3 text-sm text-slate-500 lg:max-w-md">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-slate-400" />
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="min-w-0 flex-1 bg-transparent font-semibold text-navy outline-none placeholder:text-slate-400"
              placeholder="Search vehicle, plate, model, driver"
            />
          </label>

          <label className="flex h-11 items-center gap-3 rounded-2xl border border-line bg-white px-3 text-sm font-bold text-slate-600 shadow-sm">
            Status
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="bg-transparent font-black text-navy outline-none"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 overflow-x-auto rounded-[20px] border border-line bg-white shadow-sm">
          <table className="table-readable w-full min-w-[980px] text-left text-sm">
            <thead className="border-b border-line bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                {[
                  "Vehicle ID",
                  "Plate Number",
                  "Model",
                  "Assigned Driver",
                  "Total kWh",
                  "Total Cost",
                  "Last Charging",
                  "Status"
                ].map((header) => (
                  <th key={header} className="px-4 py-3 font-black">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.vehicleId}>
                  <td className="px-4 py-3 font-black text-navy">{vehicle.vehicleId}</td>
                  <td className="px-4 py-3 font-bold text-navy">{vehicle.plateNumber}</td>
                  <td className="px-4 py-3 text-slate-600">{vehicle.model}</td>
                  <td className="px-4 py-3 text-slate-600">{vehicle.assignedDriver}</td>
                  <td className="px-4 py-3 font-bold text-navy">{formatNumber(vehicle.totalKwh, " kWh")}</td>
                  <td className="px-4 py-3 font-bold text-navy">{formatCurrency(vehicle.totalCost)}</td>
                  <td className="px-4 py-3 text-slate-600">{vehicle.lastCharging}</td>
                  <td className="px-4 py-3">
                    <Badge tone={vehicle.status === "Charging" ? "green" : vehicle.status === "On route" ? "blue" : vehicle.status === "Maintenance" ? "amber" : "gray"}>
                      {vehicle.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredVehicles.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="No vehicles found" body="Try a different search term or status filter." />
          </div>
        ) : null}

        <p className="mt-4 text-sm font-semibold text-slate-500">
          Showing {filteredVehicles.length} of {vehicles.length} vehicles
        </p>
      </section>
    </>
  );
}

function DriversPage({ onAction }) {
  const totalDrivers = drivers.length;
  const activeDrivers = drivers.filter((driver) => driver.totalSessions > 0).length;
  const pendingReceipts = drivers.filter((driver) => driver.receiptStatus.toLowerCase().includes("pending")).length;

  return (
    <>
      <section className="cp-card rounded-[24px] bg-white p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge tone="blue">Drivers</Badge>
            <h2 className="mt-3 text-3xl font-black text-navy">Driver charging activity</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Monitor assigned vehicles, charging volume, total cost, and receipt readiness by driver.
            </p>
          </div>
            <button
              type="button"
              onClick={() => onAction("Driver invitation prepared in prototype.")}
              className="rounded-2xl bg-blue-electric px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-deep hover:shadow-card"
            >
              Invite driver
            </button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <DriverSummaryCard label="Total Drivers" value={formatNumber(totalDrivers)} detail="Drivers in company fleet" />
        <DriverSummaryCard label="Active Drivers" value={formatNumber(activeDrivers)} detail="With recorded charging sessions" />
        <DriverSummaryCard label="Pending Receipts" value={formatNumber(pendingReceipts)} detail="Need finance review" tone="amber" />
      </section>

      <section className="cp-card rounded-[24px] bg-white p-5">
        <DashboardSectionHeader eyebrow="Driver Table" title="Charging totals by driver" />
        <div className="mt-5 overflow-x-auto">
          <table className="table-readable w-full min-w-[860px] text-left text-sm">
            <thead className="border-b border-line bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                {[
                  "Driver Name",
                  "Assigned Vehicle",
                  "Total Sessions",
                  "Total kWh",
                  "Total Cost",
                  "Receipt Status"
                ].map((header) => (
                  <th key={header} className="px-4 py-3 font-black">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {drivers.map((driver) => (
                <tr key={driver.name}>
                  <td className="px-4 py-3 font-black text-navy">{driver.name}</td>
                  <td className="px-4 py-3 font-bold text-navy">{driver.assignedVehicle}</td>
                  <td className="px-4 py-3 text-slate-600">{formatNumber(driver.totalSessions)}</td>
                  <td className="px-4 py-3 font-bold text-navy">{formatNumber(driver.totalKwh, " kWh")}</td>
                  <td className="px-4 py-3 font-bold text-navy">{formatCurrency(driver.totalCost)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={driver.receiptStatus.toLowerCase().includes("pending") ? "amber" : "green"}>
                      {driver.receiptStatus}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function TransactionsPage({ onExport }) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("All");
  const [driverFilter, setDriverFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");

  const vehicleOptions = ["All", ...new Set(chargingSessions.map((session) => session.vehicle))];
  const driverOptions = ["All", ...new Set(chargingSessions.map((session) => session.driver))];
  const paymentOptions = ["All", ...new Set(chargingSessions.map((session) => session.paymentStatus))];

  const filteredTransactions = useMemo(() => {
    return chargingSessions.filter((session) => {
      const sessionDate = session.date.slice(0, 10);
      const matchesDateFrom = !dateFrom || sessionDate >= dateFrom;
      const matchesDateTo = !dateTo || sessionDate <= dateTo;
      const matchesVehicle = vehicleFilter === "All" || session.vehicle === vehicleFilter;
      const matchesDriver = driverFilter === "All" || session.driver === driverFilter;
      const matchesPayment = paymentFilter === "All" || session.paymentStatus === paymentFilter;

      return matchesDateFrom && matchesDateTo && matchesVehicle && matchesDriver && matchesPayment;
    });
  }, [dateFrom, dateTo, vehicleFilter, driverFilter, paymentFilter]);

  return (
    <>
      <section className="cp-card rounded-[24px] bg-white p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge tone="blue">Transactions</Badge>
            <h2 className="mt-3 text-3xl font-black text-navy">Charging transactions</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Review every charging session by driver, vehicle, SPKLU location, payment status, and receipt readiness.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex">
            <button
              type="button"
              onClick={() => onExport("Excel export prepared for the filtered transactions.")}
              className="rounded-2xl border border-blue-electric bg-white px-4 py-2.5 text-sm font-bold text-blue-electric transition hover:bg-blue-pale hover:shadow-card"
            >
              Export Excel
            </button>
            <button
              type="button"
              onClick={() => onExport("PDF export prepared for the filtered transactions.")}
              className="rounded-2xl bg-blue-electric px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-deep hover:shadow-card"
            >
              Export PDF
            </button>
          </div>
        </div>
      </section>

      <section className="cp-card rounded-[24px] bg-white p-5">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <FilterField label="Date from">
            <input
              type="date"
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
              className="h-10 rounded-2xl border border-line bg-white px-3 text-sm font-bold text-navy outline-none"
            />
          </FilterField>
          <FilterField label="Date to">
            <input
              type="date"
              value={dateTo}
              onChange={(event) => setDateTo(event.target.value)}
              className="h-10 rounded-2xl border border-line bg-white px-3 text-sm font-bold text-navy outline-none"
            />
          </FilterField>
          <FilterField label="Vehicle">
            <SelectFilter value={vehicleFilter} onChange={setVehicleFilter} options={vehicleOptions} />
          </FilterField>
          <FilterField label="Driver">
            <SelectFilter value={driverFilter} onChange={setDriverFilter} options={driverOptions} />
          </FilterField>
          <FilterField label="Payment status">
            <SelectFilter value={paymentFilter} onChange={setPaymentFilter} options={paymentOptions} />
          </FilterField>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="table-readable w-full min-w-[1080px] text-left text-sm">
            <thead className="border-b border-line bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                {[
                  "Date",
                  "Driver",
                  "Vehicle",
                  "SPKLU Location",
                  "kWh Used",
                  "Duration",
                  "Cost",
                  "Payment Status",
                  "Receipt"
                ].map((header) => (
                  <th key={header} className="px-4 py-3 font-black">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filteredTransactions.map((session) => (
                <tr key={session.id}>
                  <td className="px-4 py-3 text-slate-600">{session.date}</td>
                  <td className="px-4 py-3 font-bold text-navy">{session.driver}</td>
                  <td className="px-4 py-3 text-slate-600">{session.vehicle}</td>
                  <td className="px-4 py-3 font-bold text-navy">{session.location}</td>
                  <td className="px-4 py-3 font-bold text-navy">{formatNumber(session.kWh, " kWh")}</td>
                  <td className="px-4 py-3 text-slate-600">{session.duration}</td>
                  <td className="px-4 py-3 font-bold text-navy">{formatCurrency(session.cost)}</td>
                  <td className="px-4 py-3">
                    <Badge tone={session.paymentStatus.includes("Paid") ? "green" : "amber"}>{session.paymentStatus}</Badge>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{session.receiptStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTransactions.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="No transactions match these filters" body="Adjust the date range, vehicle, driver, or payment status." />
          </div>
        ) : null}

        <p className="mt-4 text-sm font-semibold text-slate-500">
          Showing {filteredTransactions.length} of {chargingSessions.length} transactions
        </p>
      </section>
    </>
  );
}

function InvoicePage({ invoiceStatus, onAction, onMarkPaid }) {
  const currentInvoice = invoices[0];

  return (
    <>
      <section className="cp-card rounded-[24px] bg-white p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Badge tone="blue">Monthly Invoice</Badge>
            <h2 className="mt-3 text-3xl font-black text-navy">Monthly invoice</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Consolidated EV charging usage, service fee, and payable amount for finance review.
            </p>
          </div>
          <div className="grid gap-2 sm:flex sm:flex-wrap">
            <button
              type="button"
              onClick={() => onAction("Invoice download prepared.")}
              className="rounded-2xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-navy transition hover:bg-slate-50 hover:shadow-card"
            >
              Download Invoice
            </button>
            <button
              type="button"
              onClick={() => onAction("Invoice sent to Finance.")}
              className="rounded-2xl border border-blue-electric bg-white px-4 py-2.5 text-sm font-bold text-blue-electric transition hover:bg-blue-pale hover:shadow-card"
            >
              Send to Finance
            </button>
            <button
              type="button"
              onClick={onMarkPaid}
              className="rounded-2xl bg-blue-electric px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-deep hover:shadow-card"
            >
              Mark as Paid
            </button>
          </div>
        </div>
      </section>

      <section className="cp-card overflow-hidden rounded-[24px] bg-white">
        <div className="border-b border-line p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-electric">ChargePass Monthly Invoice</p>
              <h3 className="mt-2 text-2xl font-black text-navy">{currentInvoice.id}</h3>
              <p className="mt-2 text-sm text-slate-500">Issued for {monthlyInvoice.billingPeriod}</p>
            </div>
            <div className="text-left lg:text-right">
              <Badge tone={invoiceStatus === "Paid" ? "green" : "amber"}>{invoiceStatus}</Badge>
              <p className="mt-3 text-sm font-bold text-slate-500">Grand total</p>
              <p className="mt-1 text-3xl font-black text-navy">{formatCurrency(monthlyInvoice.grandTotal)}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-5 border-b border-line p-6 lg:grid-cols-2">
          <InvoiceParty title="Billed to" name={monthlyInvoice.companyName} lines={["Fleet Operations", "Surabaya, Indonesia"]} />
          <InvoiceParty title="From" name="ChargePass Indonesia" lines={["EV charging payment platform", "Surabaya, Indonesia"]} />
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="table-readable w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-line bg-slate-50 text-xs uppercase text-slate-500">
                <tr>
                  {["Description", "Quantity", "Rate", "Amount"].map((header) => (
                    <th key={header} className="px-4 py-3 font-black">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                <InvoiceLine
                  description="Charging sessions"
                  quantity={`${monthlyInvoice.totalSessions} sessions`}
                  rate="Actual kWh usage"
                  amount={formatCurrency(monthlyInvoice.totalChargingCost)}
                />
                <InvoiceLine
                  description="Energy consumed"
                  quantity={formatNumber(monthlyInvoice.totalKwh, " kWh")}
                  rate="Blended station tariffs"
                  amount="Included"
                />
                <InvoiceLine
                  description="ChargePass service fee"
                  quantity="1 monthly service"
                  rate="Platform fee"
                  amount={formatCurrency(monthlyInvoice.serviceFee)}
                />
              </tbody>
            </table>
          </div>

          <div className="ml-auto mt-6 max-w-md rounded-[22px] bg-slate-50 p-5 ring-1 ring-line/70">
            <InvoiceTotalRow label="Total sessions" value={formatNumber(monthlyInvoice.totalSessions)} />
            <InvoiceTotalRow label="Total kWh" value={formatNumber(monthlyInvoice.totalKwh, " kWh")} />
            <InvoiceTotalRow label="Total charging cost" value={formatCurrency(monthlyInvoice.totalChargingCost)} />
            <InvoiceTotalRow label="ChargePass service fee" value={formatCurrency(monthlyInvoice.serviceFee)} />
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <span className="text-base font-black text-navy">Grand total</span>
              <span className="text-xl font-black text-blue-electric">{formatCurrency(monthlyInvoice.grandTotal)}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-500">Payment status</span>
              <Badge tone={invoiceStatus === "Paid" ? "green" : "amber"}>{invoiceStatus}</Badge>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function InvoiceParty({ title, name, lines }) {
  return (
    <div className="rounded-[22px] bg-slate-50 p-4 ring-1 ring-line/70">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{title}</p>
      <p className="mt-2 font-black text-navy">{name}</p>
      {lines.map((line) => (
        <p key={line} className="mt-1 text-sm text-slate-500">
          {line}
        </p>
      ))}
    </div>
  );
}

function InvoiceLine({ description, quantity, rate, amount }) {
  return (
    <tr>
      <td className="px-4 py-4 font-bold text-navy">{description}</td>
      <td className="px-4 py-4 text-slate-600">{quantity}</td>
      <td className="px-4 py-4 text-slate-600">{rate}</td>
      <td className="px-4 py-4 text-right font-black text-navy">{amount}</td>
    </tr>
  );
}

function InvoiceTotalRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm font-semibold text-slate-500">{label}</span>
      <span className="text-sm font-black text-navy">{value}</span>
    </div>
  );
}

function FilterField({ label, children }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-slate-600">
      {label}
      {children}
    </label>
  );
}

function SelectFilter({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 min-w-0 rounded-2xl border border-line bg-white px-3 text-sm font-black text-navy outline-none"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function DriverSummaryCard({ label, value, detail, tone = "blue" }) {
  const accent = tone === "amber" ? "bg-amber" : "bg-blue-electric";

  return (
    <article className="cp-card rounded-[24px] bg-white p-5 transition duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-black text-navy">{value}</p>
        </div>
        <span className={`h-3 w-3 rounded-full ${accent}`} />
      </div>
      <p className="mt-4 text-xs font-semibold text-slate-500">{detail}</p>
    </article>
  );
}

function OverviewHero({ onExport, onReviewInvoice }) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-white/10 p-6 text-white shadow-glow fintech-gradient">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-black text-white ring-1 ring-white/15">Overview</span>
          <h2 className="mt-3 text-3xl font-black text-white">Fleet charging overview</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-100">
            Monitor charging cost, kWh consumption, vehicle activity, automatic receipts, and monthly billing controls across the company EV fleet.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => onExport("Overview report export prepared.")}
            className="rounded-2xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/15 hover:shadow-card"
          >
            Export report
          </button>
          <button
            type="button"
            onClick={onReviewInvoice}
            className="rounded-2xl bg-white px-4 py-2.5 text-sm font-bold text-navy transition hover:bg-blue-pale hover:shadow-card"
          >
            Review invoice
          </button>
        </div>
      </div>
    </section>
  );
}

function KpiCard({ label, value, detail, tone }) {
  const accent = {
    blue: "bg-blue-electric",
    mint: "bg-cyan",
    navy: "bg-navy",
    amber: "bg-amber"
  }[tone];

  return (
    <article className="cp-card rounded-[24px] bg-white p-5 transition duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500">{label}</p>
          <p className="mt-3 text-2xl font-black text-navy">{value}</p>
        </div>
        <span className={`h-3 w-3 rounded-full ${accent}`} />
      </div>
      <p className="mt-4 text-xs font-semibold text-slate-500">{detail}</p>
    </article>
  );
}

function WeeklyCostChart() {
  return (
    <section className="cp-card rounded-[24px] bg-white p-5">
      <DashboardSectionHeader
        eyebrow="Weekly Trend"
        title="Weekly charging cost"
        action={<Badge tone="green">Actual usage only</Badge>}
      />
      <div className="mt-6 h-80 rounded-[22px] bg-[linear-gradient(180deg,#F8FAFC_0%,#FFFFFF_100%)] p-3 ring-1 ring-line/70">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyChargingCost} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="#E2E8F0" vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
              tickFormatter={(value) => `${Math.round(value / 1000)}K`}
            />
            <Tooltip
              cursor={{ fill: "rgba(22, 119, 255, 0.08)" }}
              formatter={(value, name) => [name === "cost" ? formatCurrency(value) : value, name === "cost" ? "Cost" : name]}
              labelStyle={{ color: "#0F172A", fontWeight: 800 }}
              contentStyle={{
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                boxShadow: "0 18px 44px rgba(15, 23, 42, 0.10)"
              }}
            />
            <Bar dataKey="cost" fill="#2563EB" radius={[8, 8, 0, 0]} maxBarSize={54} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function RecentTransactions({ onViewAll }) {
  return (
    <section className="cp-card rounded-[24px] bg-white p-5">
      <DashboardSectionHeader
        eyebrow="Transactions"
        title="Recent charging transactions"
        action={
          <button type="button" onClick={onViewAll} className="text-sm font-black text-blue-electric">
            View all
          </button>
        }
      />
      <div className="mt-4 overflow-x-auto">
        <table className="table-readable w-full min-w-[880px] text-left text-sm">
          <thead className="border-b border-line bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              {["SPKLU location", "Date", "Vehicle", "kWh", "Duration", "Cost", "Payment", "Receipt"].map((header) => (
                <th key={header} className="px-4 py-3 font-black">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {recentTransactions.map((session) => (
              <tr key={session.id}>
                <td className="px-4 py-3 font-bold text-navy">{session.location}</td>
                <td className="px-4 py-3 text-slate-600">{session.date}</td>
                <td className="px-4 py-3 text-slate-600">{session.vehicle}</td>
                <td className="px-4 py-3 font-bold text-navy">{session.kWh}</td>
                <td className="px-4 py-3 text-slate-600">{session.duration}</td>
                <td className="px-4 py-3 font-bold text-navy">{formatCurrency(session.cost)}</td>
                <td className="px-4 py-3">
                  <Badge tone={session.paymentStatus.includes("Paid") ? "green" : "amber"}>{session.paymentStatus}</Badge>
                </td>
                <td className="px-4 py-3 text-slate-600">{session.receiptStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TopVehicles() {
  const highestCost = topVehicles[0]?.totalCost ?? 1;

  return (
    <section className="cp-card rounded-[24px] bg-white p-5">
      <DashboardSectionHeader eyebrow="Cost Drivers" title="Top 5 vehicles" />
      <div className="mt-5 space-y-4">
        {topVehicles.map((vehicle, index) => (
          <article key={vehicle.vehicleId}>
            <div className="mb-2 flex items-start justify-between gap-3">
              <div>
                <p className="font-black text-navy">{vehicle.plateNumber}</p>
                <p className="text-xs text-slate-500">{vehicle.model}</p>
              </div>
              <p className="text-right font-black text-blue-electric">{formatCurrency(vehicle.totalCost)}</p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-electric"
                style={{ width: `${Math.max(12, (vehicle.totalCost / highestCost) * 100)}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>#{index + 1} by cost</span>
              <span>{formatNumber(vehicle.totalKwh, " kWh")}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DashboardSidebar({ activePage, onPageChange }) {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 bg-navy text-white shadow-soft lg:flex lg:flex-col">
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[linear-gradient(135deg,#2563EB,#06B6D4)] text-lg font-black shadow-[0_12px_34px_rgba(37,99,235,0.35)]">CP</div>
          <div>
            <p className="text-lg font-black">ChargePass</p>
            <p className="text-xs font-semibold text-blue-100">Fleet Finance Console</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {sidebarItems.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-bold transition ${
              activePage === item ? "bg-white text-navy shadow-card" : "text-blue-100 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${activePage === item ? "bg-cyan" : "bg-blue-200/50"}`} />
            {item}
          </button>
        ))}
      </nav>

      <div className="m-4 rounded-[24px] bg-white/10 p-4 ring-1 ring-white/10">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan">Fleet cost control</p>
        <p className="mt-2 text-2xl font-black">No top-up</p>
        <p className="mt-1 text-sm text-blue-100">Actual usage billing for Surabaya EV operations</p>
      </div>
    </aside>
  );
}

function DashboardHeader({ activePage, onPageChange, onAction }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/82 px-5 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-electric">Company App</p>
            <h1 className="mt-1 text-xl font-black text-navy">PT Nusantara Logistics Surabaya - {activePage}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex h-10 min-w-[240px] items-center gap-2 rounded-2xl border border-line bg-slate-50 px-3 text-sm text-slate-500 transition focus-within:border-blue-electric focus-within:bg-white">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-slate-400" />
              <input className="min-w-0 flex-1 bg-transparent font-semibold outline-none" placeholder="Search vehicle, driver, receipt" />
            </label>
            {activePage === "Vehicles" ? null : (
              <button
                type="button"
                onClick={() => onAction("Add vehicle form opened in prototype.")}
                className="rounded-2xl bg-blue-electric px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-deep hover:shadow-card"
              >
                Add vehicle
              </button>
            )}
          </div>
        </div>
        <nav className="phone-screen -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 lg:hidden">
          {sidebarItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={`shrink-0 rounded-full border px-3 py-2 text-xs font-black transition ${
                activePage === item
                  ? "border-navy bg-navy text-white"
                  : "border-line bg-white text-slate-600 hover:border-blue-electric hover:text-blue-electric"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

function DashboardSectionHeader({ eyebrow, title, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-electric">{eyebrow}</p>
        <h3 className="mt-1 text-xl font-black text-navy">{title}</h3>
      </div>
      {action}
    </div>
  );
}
