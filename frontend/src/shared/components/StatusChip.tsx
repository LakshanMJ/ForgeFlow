interface StatusChipProps {
  label: string;
  background: string;
  color: string;
}

export default function StatusChip({
  label,
  background,
  color,
}: StatusChipProps) {
  return (
    <span
      className="status-chip"
      style={{
        background,
        color,
      }}
    >
      {label}
    </span>
  );
}