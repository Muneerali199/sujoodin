interface IslamicPatternProps {
  className?: string;
  opacity?: number;
}

export function IslamicPattern({ className, opacity = 0.08 }: IslamicPatternProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <pattern
        id="islamic-pattern"
        x="0"
        y="0"
        width="50"
        height="50"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M25 0L50 25L25 50L0 25Z"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <path
          d="M25 10L40 25L25 40L10 25Z"
          stroke="currentColor"
          strokeWidth="0.5"
          fill="none"
        />
        <circle cx="25" cy="25" r="3" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </pattern>
      <rect width="200" height="200" fill="url(#islamic-pattern)" />
    </svg>
  );
}
