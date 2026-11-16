// Kartu putih dasar dengan bayangan lembut yang menebal saat hover.
// eslint-disable-next-line no-unused-vars
export default function SpotlightCard({ children, className = "", tilt, ...rest }) {
  return (
    <div className={`spot-card ${className}`} {...rest}>
      {children}
    </div>
  );
}
