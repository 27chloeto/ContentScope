import type * as React from "react";

export function SkincareIllustration(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 320 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* jar */}
      <rect
        x="24"
        y="120"
        width="96"
        height="80"
        rx="10"
        className="fill-muted stroke-border"
        strokeWidth="1.5"
      />
      <rect
        x="24"
        y="120"
        width="96"
        height="20"
        rx="10"
        className="fill-card stroke-border"
        strokeWidth="1.5"
      />
      <circle cx="72" cy="164" r="18" className="fill-card" />
      <path
        d="M62 164c0-6 5-11 11-11"
        className="stroke-muted-foreground"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* pump bottle */}
      <rect
        x="140"
        y="70"
        width="70"
        height="130"
        rx="12"
        className="fill-muted stroke-border"
        strokeWidth="1.5"
      />
      <rect
        x="164"
        y="46"
        width="22"
        height="26"
        rx="4"
        className="fill-card stroke-border"
        strokeWidth="1.5"
      />
      <rect
        x="172"
        y="24"
        width="8"
        height="24"
        rx="3"
        className="fill-foreground"
      />
      <line
        x1="155"
        y1="110"
        x2="195"
        y2="110"
        className="stroke-muted-foreground"
        strokeWidth="1.5"
      />
      <line
        x1="155"
        y1="122"
        x2="185"
        y2="122"
        className="stroke-muted-foreground"
        strokeWidth="1.5"
      />

      {/* dropper bottle */}
      <rect
        x="230"
        y="96"
        width="58"
        height="104"
        rx="10"
        className="fill-muted stroke-border"
        strokeWidth="1.5"
      />
      <rect
        x="246"
        y="70"
        width="26"
        height="28"
        rx="4"
        className="fill-card stroke-border"
        strokeWidth="1.5"
      />
      <path
        d="M259 40v34"
        className="stroke-foreground"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="259" cy="150" r="4" className="fill-foreground" />

      {/* baseline */}
      <line
        x1="8"
        y1="200"
        x2="304"
        y2="200"
        className="stroke-border"
        strokeWidth="1.5"
      />
    </svg>
  );
}
