interface TagChipProps {
  label: string;
  variant?: string;   // Optional — defaults to neutral
}

export default function TagChip({ label, variant }: TagChipProps) {
  return (
    <span className={`tag-chip tag-chip--${variant}`}>
      {label}
    </span>
  );
}