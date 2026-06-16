import { useState } from "react";

export function FilterChips({ filters }) {
  const [activeFilter, setActiveFilter] = useState(filters[0]);

  return (
    <div className="phone-screen -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => setActiveFilter(filter)}
          className={`min-h-10 shrink-0 rounded-full border px-4 py-2 text-xs font-semibold tracking-[0.03em] transition duration-200 ${
            activeFilter === filter
              ? "border-[#2563EB] bg-[#2563EB] text-white shadow-card"
              : "border-[#C3C6D7]/70 bg-white/76 text-[#434655] shadow-sm backdrop-blur hover:border-[#2563EB] hover:text-[#2563EB]"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
