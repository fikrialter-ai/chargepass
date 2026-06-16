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
import { MobileIcon } from "../../components/mobile/MobileIcon.jsx";
import { Button } from "../../components/ui/Button.jsx";
import { spkluLocations } from "../../data/mockData.js";
import { formatCurrency } from "../../utils/formatters.js";

const filters = ["Available", "Fast Charging", "CCS2", "Type 2"];

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
    <section className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_20%_0%,rgba(87,223,254,0.18),transparent_26%),radial-gradient(circle_at_82%_8%,rgba(37,99,235,0.14),transparent_30%),#FAF8FF] px-0 py-8 sm:px-4">
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
    return <ChargingHistoryScreen onOpenProfile={() => setActiveScreen("profile")} />;
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

  return <DriverHomeScreen onViewDetail={openDetail} onOpenProfile={() => setActiveScreen("profile")} />;
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
    <div className="min-h-full px-4 pb-5">
      <section className="-mx-4 -mt-1 overflow-hidden px-4 pb-8 pt-5 driver-mesh">
        <div className="flex items-center justify-center">
          <div className="grid h-24 w-24 place-items-center overflow-hidden rounded-[24px] bg-white/82 text-[#2563EB] shadow-card ring-1 ring-white/80 backdrop-blur-xl">
            <MobileIcon name="bolt" filled className="text-[46px]" />
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2563EB]">ChargePass Indonesia</p>
          <h2 className="mt-2 text-[28px] font-bold leading-8 text-[#131B2E]">Welcome back</h2>
          <p className="mx-auto mt-3 max-w-[300px] text-base leading-6 text-[#434655]">
            One app. Any SPKLU. No trapped balance.
          </p>
        </div>
      </section>

      <section className="driver-glass -mt-6 rounded-[24px] p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#2563EB]">Driver Login</p>
        <h3 className="mt-2 text-xl font-semibold text-[#131B2E]">Sign in to charge</h3>
        <p className="mt-1 text-sm leading-6 text-[#434655]">Use your company driver access.</p>

        <div className="mt-5 grid gap-3">
          <label className="grid gap-2 text-sm font-semibold text-[#434655]">
            Company email
            <div className="relative">
              <MobileIcon name="mail" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#434655]/55" />
              <input className="min-h-12 w-full rounded-2xl border border-[#C3C6D7]/70 bg-white/78 py-3 pl-12 pr-4 text-sm font-semibold text-[#131B2E] outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/10" defaultValue="raka@nusantaralogistics.co.id" />
            </div>
          </label>
          <label className="grid gap-2 text-sm font-semibold text-[#434655]">
            Driver PIN
            <div className="relative">
              <MobileIcon name="lock" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#434655]/55" />
              <input className="min-h-12 w-full rounded-2xl border border-[#C3C6D7]/70 bg-white/78 py-3 pl-12 pr-4 text-sm font-semibold text-[#131B2E] outline-none transition focus:border-[#2563EB] focus:bg-white focus:ring-4 focus:ring-[#2563EB]/10" defaultValue="123456" type="password" />
            </div>
          </label>
        </div>

        <Button className="mt-5 w-full" onClick={onContinue}>
          Continue
          <MobileIcon name="arrow_forward" />
        </Button>

        <div className="my-5 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#C3C6D7]/50" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#434655]/70">or continue with</span>
          <span className="h-px flex-1 bg-[#C3C6D7]/50" />
        </div>

        <button
          type="button"
          onClick={() => window.alert("Google login opened in prototype mode.")}
          className="flex min-h-12 w-full items-center justify-center gap-3 rounded-2xl border border-[#C3C6D7]/70 bg-white/82 px-4 py-3 text-sm font-semibold text-[#131B2E] transition hover:bg-white hover:shadow-card"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-[#EAEDFF] text-xs font-bold text-[#2563EB]">G</span>
          Continue with Google
        </button>
      </section>

      <section className="mt-4 grid grid-cols-3 gap-2">
        <ProfileStat label="No top-up" value="Active" />
        <ProfileStat label="Automatic receipt" value="On" />
        <ProfileStat label="Billing" value="Fleet" />
      </section>
    </div>
  );
}

function DriverHomeScreen({ onViewDetail, onOpenProfile }) {
  return (
    <div className="min-h-full px-4 pb-5">
      <MobileScreenHeader
        title="Hi, Driver"
        subtitle="Find nearby SPKLU and pay actual usage"
        action={
          <button
            type="button"
            onClick={onOpenProfile}
            className="grid h-12 w-12 place-items-center rounded-2xl bg-[#131B2E] text-sm font-bold text-white shadow-card"
            aria-label="Driver profile summary"
          >
            RP
          </button>
        }
      />

      <section className="mt-5 overflow-hidden rounded-[24px] p-5 text-white shadow-glow driver-primary-panel">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#57DFFE]">Active charging access</p>
          <MobileIcon name="bolt" filled className="text-[#57DFFE]" />
        </div>
        <h3 className="mt-3 text-[28px] font-bold leading-8">Pay only for actual usage. No trapped balance.</h3>
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_138px] items-stretch gap-3">
          <div className="min-w-0 rounded-[22px] bg-white/10 px-3 py-4 ring-1 ring-white/15 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-100">This month</p>
            <p className="mt-2 whitespace-nowrap text-[27px] font-bold leading-none tracking-normal">{formatCurrency(367800)}</p>
            <p className="mt-2 text-xs font-medium text-blue-100/90">Charging cost</p>
          </div>
          <div className="flex min-w-0 flex-col justify-between rounded-[22px] bg-white/14 px-4 py-4 text-left ring-1 ring-white/15 backdrop-blur">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/18 text-[#57DFFE] ring-1 ring-white/10">
              <MobileIcon name="electric_bolt" filled />
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-100">Charged</p>
              <p className="mt-1 whitespace-nowrap text-[21px] font-bold leading-7 text-white">148.6 kWh</p>
            </div>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          <TrustPill label="No top-up" />
          <TrustPill label="Usage only" />
          <TrustPill label="Automatic receipt" />
        </div>
      </section>

      <label className="driver-glass mt-5 flex min-h-12 items-center gap-3 rounded-2xl px-4 text-sm font-semibold text-[#434655]">
        <MobileIcon name="search" className="text-[#434655]/65" />
        <input
          type="search"
          placeholder="Search SPKLU"
          className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-[#131B2E] outline-none placeholder:text-[#434655]/55"
        />
      </label>

      <FilterChips filters={filters} />
      <MapPlaceholder />

      <section className="mt-5">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-electric">Nearby Network</p>
            <h2 className="mt-1 text-xl font-semibold text-[#131B2E]">SPKLU around you</h2>
          </div>
          <span className="rounded-full bg-white/82 px-3 py-1 text-xs font-semibold text-[#434655] shadow-card ring-1 ring-white/70">{spkluLocations.length} stations</span>
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
    <div className="rounded-2xl border border-white/10 bg-white/12 px-2 py-3 text-center text-[11px] font-semibold text-white backdrop-blur">
      {label}
    </div>
  );
}

function ProfileStat({ label, value }) {
  return (
    <div className="driver-card rounded-2xl p-4">
      <p className="text-xs font-semibold text-[#434655]">{label}</p>
      <p className="mt-1 text-sm font-bold text-[#131B2E]">{value}</p>
    </div>
  );
}
