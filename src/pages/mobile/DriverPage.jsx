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
import { spkluLocations } from "../../data/mockData.js";

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
    return <PlaceholderScreen title="Profile" subtitle="Driver profile prototype coming next." />;
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

function PlaceholderScreen({ title, subtitle }) {
  return (
    <div className="min-h-full bg-cloud px-4 pb-5">
      <MobileScreenHeader title={title} subtitle={subtitle} />
      <section className="mt-5 rounded-[28px] border border-line bg-white p-5 shadow-card">
        <div className="grid h-16 w-16 place-items-center rounded-2xl bg-navy text-xl font-black text-white">RP</div>
        <h3 className="mt-4 text-xl font-black text-navy">Raka Pratama</h3>
        <p className="mt-1 text-sm font-semibold text-slate-500">B 2187 EV - Hyundai Ioniq 5</p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <ProfileStat label="No top-up" value="Active" />
          <ProfileStat label="Billing" value="Fleet" />
        </div>
      </section>
    </div>
  );
}

function DriverHomeScreen({ onViewDetail }) {
  return (
    <div className="min-h-full bg-cloud px-4 pb-5">
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

      <section className="mt-5 overflow-hidden rounded-[28px] bg-navy p-5 text-white shadow-soft">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-cyan">ChargePass balance model</p>
        <h3 className="mt-3 text-3xl font-black leading-9">Pay actual kWh. No trapped balance.</h3>
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
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-black text-navy">{value}</p>
    </div>
  );
}
