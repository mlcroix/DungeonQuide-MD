import React from 'react';

type LogoProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
};

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 100"  // Increased width and height
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="60%" stopColor="currentColor" />
        </linearGradient>
      </defs>
      <text
        x="250"  // Center of new 500 width
        y="60"   // Adjusted vertical position
        fill="url(#textGradient)"
        fontFamily="Georgia, serif"
        fontSize="48"  // Slightly smaller to ensure it fits
        fontWeight="bold"
        textAnchor="middle"
        letterSpacing="3"
      >
        DungeonGuide
      </text>
    </svg>
  );
}