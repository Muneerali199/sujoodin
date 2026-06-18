interface ArabicWatermarkProps {
  text?: string;
  className?: string;
  opacity?: number;
}

export function ArabicWatermark({
  text = "SUJOOD",
  className,
  opacity = 0.12,
}: ArabicWatermarkProps) {
  return (
    <span
      className={className}
      style={{
        opacity,
        fontFamily: "var(--font-display)",
        direction: "rtl",
      }}
    >
      {text}
    </span>
  );
}
