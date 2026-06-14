export function PhoneFrame({ children }) {
  return (
    <div className="mx-auto w-full max-w-[390px] rounded-[36px] border-[10px] border-ink bg-ink shadow-soft">
      <div className="relative overflow-hidden rounded-[26px] bg-cloud">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-28 -translate-x-1/2 rounded-full bg-ink" />
        <div className="phone-screen h-[760px] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
