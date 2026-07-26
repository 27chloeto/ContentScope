import type { CSSProperties, ReactNode } from "react";
import { cn } from "~/lib/utils";

function Panel({
  label,
  className,
  style,
  children,
}: {
  label: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("animate-fade-in-up flex flex-col gap-3", className)}
      style={style}
    >
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div className="flex flex-1 flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-shadow duration-300 hover:shadow-sm">
        {children}
      </div>
    </div>
  );
}

function Arrow({ style }: { style?: CSSProperties }) {
  return (
    <div
      className="animate-fade-in-up flex items-center justify-center text-muted-foreground"
      style={style}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        className="shrink-0 rotate-90 sm:rotate-0"
      >
        <path
          d="M3 10h13M11 5l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function BeforeActionAfter() {
  return (
    <div className="mt-8 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
      <Panel label="Before" style={{ animationDelay: "0ms" }}>
        <p className="text-sm">
          "Clears your skin in just 3 days. Shop now 🧴"
        </p>
      </Panel>

      <Arrow style={{ animationDelay: "100ms" }} />

      <Panel
        label="ContentScope"
        className="sm:max-w-[200px]"
        style={{ animationDelay: "150ms" }}
      >
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold tracking-tight">58</span>
          <span className="text-xs text-muted-foreground">audience fit</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Overstated claim, weak hook
        </p>
      </Panel>

      <Arrow style={{ animationDelay: "250ms" }} />

      <Panel label="After" style={{ animationDelay: "300ms" }}>
        <p className="text-sm">
          "2% salicylic acid, formulated to visibly reduce breakouts over 4
          weeks."
        </p>
        <span className="text-xs font-medium text-foreground">
          89 audience fit
        </span>
      </Panel>
    </div>
  );
}
