import type * as React from "react";

export function SkincareIllustration(props: React.ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 340 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* shared ground shadow */}
      <ellipse cx="170" cy="284" rx="150" ry="9" className="fill-primary/10" />

      {/* jar */}
      <rect
        x="20"
        y="190"
        width="80"
        height="80"
        rx="10"
        className="fill-card stroke-border"
        strokeWidth="1.5"
      />
      <rect
        x="20"
        y="175"
        width="80"
        height="20"
        rx="8"
        className="fill-muted stroke-border"
        strokeWidth="1.5"
      />
      <circle cx="60" cy="216" r="16" className="fill-background" />
      <path
        d="M50,216c0-6,4-10,10-10"
        className="stroke-muted-foreground"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* pump bottle */}
      <rect
        x="135"
        y="140"
        width="70"
        height="130"
        rx="12"
        className="fill-card stroke-border"
        strokeWidth="1.5"
      />
      <rect
        x="157"
        y="112"
        width="26"
        height="30"
        rx="4"
        className="fill-muted stroke-border"
        strokeWidth="1.5"
      />
      <rect
        x="163"
        y="88"
        width="14"
        height="26"
        rx="3"
        className="fill-foreground"
      />
      <rect
        x="177"
        y="96"
        width="18"
        height="8"
        rx="3"
        className="fill-foreground"
      />
      <line
        x1="149"
        y1="200"
        x2="191"
        y2="200"
        className="stroke-muted-foreground"
        strokeWidth="1.5"
      />
      <line
        x1="149"
        y1="212"
        x2="179"
        y2="212"
        className="stroke-muted-foreground"
        strokeWidth="1.5"
      />

      {/* dropper bottle */}
      <rect
        x="235"
        y="110"
        width="70"
        height="160"
        rx="12"
        className="fill-card stroke-border"
        strokeWidth="1.5"
      />
      <rect
        x="238"
        y="182"
        width="64"
        height="82"
        rx="6"
        className="fill-primary/15"
      />
      <rect
        x="257"
        y="88"
        width="26"
        height="24"
        rx="3"
        className="fill-muted stroke-border"
        strokeWidth="1.5"
      />
      <rect
        x="252"
        y="50"
        width="36"
        height="42"
        rx="18"
        className="fill-foreground"
      />
      <line
        x1="270"
        y1="90"
        x2="270"
        y2="228"
        className="stroke-muted-foreground"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="270" cy="228" r="3.5" className="fill-muted-foreground" />
      <path
        d="M248,132c-2,30-2,90,0,118"
        className="stroke-background"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
