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
import { Button } from "../../components/ui/Button.jsx";
import { Card } from "../../components/ui/Card.jsx";
import { spkluLocations } from "../../data/mockData.js";
import { formatCurrency } from "../../utils/formatters.js";

const filters = ["Available", "Fast Charging", "CCS2", "Type 2", "DC Charger"];

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
    return <DriverLoginScreen onContinue={() => window.alert("Driver login accepted in prototype mode.")} />;
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

  if (["scan", "payment", "charging", "receipt"].includes(activeScreen)) {
    return "Scan";
  }

  return "Home";
}

function DriverLoginScreen({ onContinue }) {
  return (
    <div className="min-h-full bg-cloud px-4 pb-5">
      <section className="-mx-4 -mt-1 overflow-hidden px-4 pb-7 pt-4 fintech-gradient text-white">
        <div className="flex items-center justify-between">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-lg font-black ring-1 ring-white/15">
            CP
          </div>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black ring-1 ring-white/15">Driver App</span>
        </div>
        <h2 className="mt-8 text-3xl font-black leading-9">Charge without prepaid balance.</h2>
        <p className="mt-3 text-sm leading-6 text-blue-100">
          Login prototype for drivers using a Corporate Billing Account, QRIS, card, or bank rails.
        </p>
      </section>

      <Card className="-mt-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-electric">Driver Login</p>
        <h3 className="mt-2 text-2xl font-black text-navy">Welcome back, Raka</h3>
        <p className="mt-2 text-sm leading-6 text-slate-500">Hyundai Ioniq 5 - L 2187 EV</p>

        <div className="mt-5 grid gap-3">
          <label className="grid gap-2 text-sm font-bold text-slate-600">
            Company email
            <input className="h-12 rounded-2xl border border-line bg-slate-50 px-4 text-sm font-semibold text-navy outline-none transition focus:border-blue-electric focus:bg-white" defaultValue="raka@nusantaralogistics.co.id" />
          </label>
          <label className="grid gap-2 text-sm font-bold text-slate-600">
            Driver PIN
            <input className="h-12 rounded-2xl border border-line bg-slate-50 px-4 text-sm font-semibold text-navy outline-none transition focus:border-blue-electric focus:bg-white" defaultValue="123456" type="password" />
          </label>
        </div>

        <Button className="mt-5 w-full" onClick={onContinue}>Continue</Button>
      </Card>

      <section className="mt-4 grid grid-cols-3 gap-2">
        <ProfileStat label="No top-up" value="Active" />
        <ProfileStat label="Receipt" value="Auto" />
        <ProfileStat label="Billing" value="Fleet" />
      </section>
    </div>
  );
}

function DriverHomeScreen({ onViewDetail }) {
  return (
    <div className="min-h-full soft-surface px-4 pb-5">
      <MobileScreenHeader
        title="Hi, Driver"
        subtitle="Find nearby SPKLU without top-up"
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

      <section className="mt-5 overflow-hidden rounded-[28px] p-5 text-white shadow-glow fintech-gradient">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan">ChargePass charging pass</p>
        <h3 className="mt-3 text-3xl font-black leading-9">Pay actual kWh. No trapped balance.</h3>
        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-100">This month</p>
            <p className="mt-1 text-3xl font-black">{formatCurrency(367800)}</p>
          </div>
          <div className="rounded-2xl bg-white/12 px-3 py-2 text-right ring-1 ring-white/15">
            <p className="text-xs text-blue-100">Charged</p>
            <p className="font-black">148.6 kWh</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <TrustPill label="No top-up" />
          <TrustPill label="Usage only" />
          <TrustPill label="Auto receipt" />
        </div>
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

function ProfileStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-line/70">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-black text-navy">{value}</p>
    </div>
  );
}
