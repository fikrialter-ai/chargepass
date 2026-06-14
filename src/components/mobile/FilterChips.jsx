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
          className={`shrink-0 rounded-full border px-3.5 py-2.5 text-xs font-bold transition duration-200 ${
            activeFilter === filter
              ? "border-navy bg-navy text-white shadow-card"
              : "border-line bg-white text-slate-600 shadow-sm hover:border-blue-electric hover:text-blue-electric"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
