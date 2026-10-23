export default function AvailabilityIndicator({ compact = false }) {
  return <span className="availability"><span className="availability-dot" aria-hidden="true" />{compact ? "Available" : "Available for opportunities"}</span>;
}
