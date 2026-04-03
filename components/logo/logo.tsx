import React from 'react';

type LogoProps = React.SVGProps<SVGSVGElement> & {
  className?: string;
};

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 400 80"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="currentColor" /> {/* Changed to currentColor */}
          <stop offset="60%" stopColor="currentColor" /> {/* Changed to currentColor */}
        </linearGradient>
      </defs>
      <text
        x="200"
        y="50"
        fill="url(#textGradient)"
        fontFamily="Georgia, serif"
        fontSize="52"
        fontWeight="bold"
        textAnchor="middle"
        letterSpacing="3"
      >
        DungeonGuide
      </text>
    </svg>
  );
}