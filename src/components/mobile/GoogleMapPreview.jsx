import { MapPlaceholder } from "./MapPlaceholder.jsx";
import { MobileIcon } from "./MobileIcon.jsx";

const MAP_QUERY = "SPKLU%20Pakuwon%20Mall%20Surabaya";

export function GoogleMapPreview() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim();

  if (!apiKey) {
    return <MapPlaceholder />;
  }

  const mapSrc = `https://www.google.com/maps/embed/v1/search?key=${encodeURIComponent(apiKey)}&q=${MAP_QUERY}`;

  return (
    <section className="driver-card relative mt-5 h-60 overflow-hidden rounded-[24px]" style={{ height: 240 }}>
      <iframe
        title="Google Maps preview for SPKLU Pakuwon Mall Surabaya"
        src={mapSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#131B2E]/20 to-transparent" />

      <button
        type="button"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/92 text-[#2563EB] shadow-card backdrop-blur-xl transition hover:bg-white"
        aria-label="Use current location"
      >
        <MobileIcon name="my_location" />
      </button>

      <div className="absolute bottom-4 left-4 right-4 rounded-[20px] bg-white/90 px-4 py-3 shadow-card backdrop-blur-xl ring-1 ring-white/80">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#2563EB]">Nearest SPKLU</p>
            <p className="mt-1 text-sm font-bold text-[#131B2E]">Pakuwon Mall Surabaya</p>
          </div>
          <div className="rounded-2xl bg-[#EAEDFF] px-3 py-2 text-right">
            <p className="text-[11px] font-semibold text-[#434655]">ETA</p>
            <p className="text-sm font-bold text-[#2563EB]">6 min</p>
          </div>
        </div>
      </div>
    </section>
  );
}
