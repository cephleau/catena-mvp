/**
 * Catena Logo Symbol
 * Clean teal-to-blue gradient chain link mark
 * Used in header, hero, and branding contexts
 */

interface CatenaLogoSymbolProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  opacity?: number;
  className?: string;
}

const sizeMap = {
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
  '2xl': 'w-48 h-48',
};

export function CatenaLogoSymbol({
  size = 'md',
  opacity = 1,
  className = '',
}: CatenaLogoSymbolProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeMap[size]} ${className}`}
      style={{ opacity }}
    >
      <defs>
        <linearGradient
          id="catenaGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#1ED4D4" />
          <stop offset="100%" stopColor="#2B7B9B" />
        </linearGradient>
      </defs>

      {/* First link */}
      <circle
        cx="35"
        cy="50"
        r="15"
        fill="none"
        stroke="url(#catenaGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Second link */}
      <circle
        cx="65"
        cy="50"
        r="15"
        fill="none"
        stroke="url(#catenaGradient)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Connecting line */}
      <line
        x1="50"
        y1="50"
        x2="50"
        y2="75"
        stroke="url(#catenaGradient)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
