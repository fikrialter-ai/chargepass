import { useState } from "react";
import { FilterChips } from "../../components/mobile/FilterChips.jsx";
import { MapPlaceholder } from "../../components/mobile/MapPlaceholder.jsx";
import { MobileScreenHeader } from "../../components/mobile/MobileScreenHeader.jsx";
import { MobileShell } from "../../components/mobile/MobileShell.jsx";
import { ChargingHistoryScreen } from "../../components/mobile/ChargingHistoryScreen.jsx";
import { ChargingProgressScreen } from "../../components/mobile/ChargingProgressScreen.jsx";
import { PaymentAuthorizationScreen } from "../../components/mobile/PaymentAuthorizationScreen.jsx";
import { QrScanScreen } from "../../components/mobile/QrScanScreen.jsx";
import { ReceiptScreen } from "../../components/mobile/ReceiptScreen.jsx";
import { SpkluCard } from "../../components/mobile/SpkluCard.jsx";
import { SpkluDetailScreen } from "../../components/mobile/SpkluDetailScreen.jsx";
import { chargingSessions, spkluLocations } from "../../data/mockData.js";
import { formatCurrency } from "../../utils/formatters.js";

const filters = ["Available", "Fast Charging", "CCS2", "Type 2", "DC Charger"];
const monthlyDriverCost = chargingSessions.reduce((total, session) => total + session.cost, 0);
const monthlyDriverKwh = chargingSessions.reduce((total, session) => total + session.kWh, 0);

export function DriverPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeScreen, setActiveScreen] = useState("home");

  function openDetail(location) {
    setSelectedLocation(location);
    setActiveScreen("detail");
  }

  function backToHome() {
    setSelectedLocation(null);
    setActiveScreen("home");
  }

  function backToDetail() {
    setActiveScreen("detail");
  }

  function handleNavChange(label) {
    if (label === "Home") {
      backToHome();
      return;
    }

    if (label === "Scan") {
      setSelectedLocation(selectedLocation ?? spkluLocations[0]);
      setActiveScreen("scan");
      return;
    }

    if (label === "History") {
      setSelectedLocation(null);
      setActiveScreen("history");
      return;
    }

    if (label === "Profile") {
      setSelectedLocation(null);
      setActiveScreen("profile");
    }
  }

  const screen = getDriverScreen({
    activeScreen,
    selectedLocation,
    openDetail,
    backToHome,
    backToDetail,
    setActiveScreen
  });

  return (
    <section className="dashboard-grid grid min-h-[calc(100vh-73px)] place-items-center px-0 py-8 sm:px-4">
      <div className="w-full">
        <MobileShell activeNav={getActiveNav(activeScreen)} onNavChange={handleNavChange}>
          {screen}
        </MobileShell>
      </div>
    </section>
  );
}

function getDriverScreen({ activeScreen, selectedLocation, openDetail, backToHome, backToDetail, setActiveScreen }) {
  if (activeScreen === "history") {
    return <ChargingHistoryScreen />;
  }

  if (activeScreen === "profile") {
    return <LoginScreen />;
  }

  if (activeScreen === "scan" && selectedLocation) {
    return (
      <QrScanScreen
        location={selectedLocation}
        onBack={backToDetail}
        onContinue={() => setActiveScreen("payment")}
      />
    );
  }

  if (activeScreen === "payment" && selectedLocation) {
    return (
      <PaymentAuthorizationScreen
        location={selectedLocation}
        onBack={backToDetail}
        onAuthorize={() => setActiveScreen("charging")}
      />
    );
  }

  if (activeScreen === "charging" && selectedLocation) {
    return (
      <ChargingProgressScreen
        location={selectedLocation}
        onBack={() => setActiveScreen("payment")}
        onStopCharging={() => setActiveScreen("receipt")}
      />
    );
  }

  if (activeScreen === "receipt" && selectedLocation) {
    return <ReceiptScreen location={selectedLocation} onDone={backToHome} />;
  }

  if (activeScreen === "detail" && selectedLocation) {
    return (
      <SpkluDetailScreen
        location={selectedLocation}
        onBack={backToHome}
        onScanQr={() => setActiveScreen("scan")}
        onStartCharging={() => setActiveScreen("payment")}
      />
    );
  }

  return <DriverHomeScreen onViewDetail={openDetail} />;
}

function getActiveNav(activeScreen) {
  if (activeScreen === "history") {
    return "History";
  }

  if (activeScreen === "profile") {
    return "Profile";
  }

  if (activeScreen === "scan") {
    return "Scan";
  }

  return "Home";
}

function LoginScreen() {
  return (
    <div className="min-h-full bg-cloud px-4 pb-5">
      <section className="overflow-hidden rounded-[32px] bg-[linear-gradient(145deg,#0F172A_0%,#1E3A8A_52%,#8B5CF6_130%)] p-6 text-white shadow-soft">
        <div className="flex items-center justify-between">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/12 text-lg font-black ring-1 ring-white/15">
            CP
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-cyan ring-1 ring-white/15">
            Driver Access
          </span>
        </div>
        <h2 className="mt-10 text-4xl font-black leading-tight">Charge without top-up.</h2>
        <p className="mt-4 text-sm font-semibold leading-6 text-blue-100">
          Sign in to authorize SPKLU sessions, pay only for measured usage, and send receipts automatically.
        </p>
        <button
          type="button"
          onClick={() => window.alert("Driver login opened in this prototype.")}
          className="mt-8 w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-navy shadow-card hover:bg-blue-pale"
        >
          Continue with ChargePass ID
        </button>
      </section>

      <section className="mt-4 rounded-[28px] border border-line bg-white p-5 shadow-card">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-electric">Signed-in preview</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-base font-black text-white">RP</div>
          <div>
            <h3 className="font-black text-navy">Raka Pratama</h3>
            <p className="text-sm font-semibold text-slate-500">B 2187 EV - Hyundai Ioniq 5</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <ProfileStat label="Payment mode" value="Actual usage" />
          <ProfileStat label="Receipt" value="Automatic" />
        </div>
      </section>
    </div>
  );
}

function DriverHomeScreen({ onViewDetail }) {
  return (
    <div className="min-h-full bg-cloud px-4 pb-5">
      <MobileScreenHeader
        title="Hello, Raka"
        subtitle="Find nearby SPKLU and pay actual usage"
        action={
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-2xl bg-navy text-sm font-black text-white shadow-card"
            aria-label="Driver profile summary"
          >
            RP
          </button>
        }
      />

      <section className="mt-5 overflow-hidden rounded-[32px] bg-[linear-gradient(145deg,#0F172A_0%,#1D4ED8_58%,#8B5CF6_135%)] p-5 text-white shadow-soft">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan">Monthly charging cost</p>
            <h3 className="mt-3 text-4xl font-black leading-none">{formatCurrency(monthlyDriverCost)}</h3>
            <p className="mt-2 text-sm font-semibold text-blue-100">{monthlyDriverKwh.toFixed(1)} kWh across recent sessions</p>
          </div>
          <span className="rounded-full bg-white/12 px-3 py-1 text-xs font-black text-white ring-1 ring-white/15">Fleet</span>
        </div>
        <div className="mt-5 rounded-[24px] bg-white/10 p-4 ring-1 ring-white/10">
          <div className="flex items-center justify-between">
            <p className="text-sm font-black text-white">Active charging pass</p>
            <span className="text-xs font-black text-cyan">No top-up</span>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            <TrustPill label="Usage only" />
            <TrustPill label="No trapped" />
            <TrustPill label="Receipt" />
          </div>
        </div>
      </section>

      <section className="mt-4 grid grid-cols-3 gap-3">
        <ActionTile label="Scan QR" tone="blue" />
        <ActionTile label="Receipts" tone="purple" />
        <ActionTile label="Analytics" tone="cyan" />
      </section>

      <label className="mt-5 flex h-12 items-center gap-3 rounded-2xl border border-line bg-white px-4 text-sm font-semibold text-slate-400 shadow-card">
        <span className="h-3 w-3 rounded-full border-2 border-blue-electric" />
        <input
          type="search"
          placeholder="Search SPKLU"
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-navy outline-none placeholder:text-slate-400"
        />
      </label>

      <FilterChips filters={filters} />
      <MapPlaceholder />

      <section className="mt-5">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-electric">Nearby Network</p>
            <h2 className="mt-1 text-lg font-black text-navy">SPKLU around you</h2>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 shadow-card">{spkluLocations.length} stations</span>
        </div>
        <div className="space-y-3">
          {spkluLocations.map((location) => (
            <SpkluCard key={location.id} location={location} onViewDetail={onViewDetail} />
          ))}
        </div>
      </section>
    </div>
  );
}

function TrustPill({ label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 px-2 py-3 text-center text-[11px] font-black text-white">
      {label}
    </div>
  );
}

function ActionTile({ label, tone }) {
  const toneClass = {
    blue: "bg-blue-pale text-blue-electric",
    purple: "bg-purple-pale text-purple-soft",
    cyan: "bg-cyan/10 text-cyan"
  }[tone];

  return (
    <div className="rounded-[22px] border border-line bg-white p-3 text-center shadow-card">
      <div className={`mx-auto grid h-10 w-10 place-items-center rounded-2xl text-xs font-black ${toneClass}`}>EV</div>
      <p className="mt-2 text-xs font-black text-navy">{label}</p>
    </div>
  );
}

function ProfileStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-black text-navy">{value}</p>
    </div>
  );
}
