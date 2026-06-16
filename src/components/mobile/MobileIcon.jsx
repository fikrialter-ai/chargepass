export function MobileIcon({ name, className = "", filled = false }) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{ fontVariationSettings: filled ? '"FILL" 1, "wght" 500, "GRAD" 0, "opsz" 24' : undefined }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
