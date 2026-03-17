export function StormBackdrop() {
  return (
    <div aria-hidden="true" className="storm-backdrop">
      <div className="storm-backdrop__rain" />
      <div className="storm-backdrop__rain storm-backdrop__rain--delayed" />
      <div className="storm-backdrop__flash" />
      <div className="storm-backdrop__glow" />
    </div>
  );
}
