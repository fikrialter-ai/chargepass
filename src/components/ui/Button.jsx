const variantClasses = {
  primary: "border-transparent bg-blue-electric text-white shadow-card hover:bg-blue-deep hover:shadow-raised",
  secondary: "border-blue-electric/20 bg-blue-pale text-blue-deep hover:border-blue-electric/40 hover:shadow-card",
  ghost: "border-line bg-white text-navy hover:bg-slate-50 hover:shadow-card",
  danger: "border-transparent bg-danger text-white shadow-card hover:bg-red-600 hover:shadow-raised"
};

const sizeClasses = {
  sm: "min-h-10 px-3 py-2 text-xs",
  md: "min-h-12 px-4 py-3 text-sm",
  lg: "min-h-14 px-5 py-3.5 text-base"
};

export function Button({ children, className = "", variant = "primary", size = "md", ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-2xl border font-black transition duration-200 active:scale-[0.98] ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
