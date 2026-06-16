export function Card({ children, className = "", as: Component = "section" }) {
  return <Component className={`cp-card rounded-[24px] p-5 transition duration-200 ${className}`}>{children}</Component>;
}
