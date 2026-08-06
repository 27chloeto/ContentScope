import type { CSSProperties } from "react";
import { cn } from "~/lib/utils";

const results = [
  {
    market: "United States",
    score: 72,
    feedback: "Feedback focuses on the hook and audience framing.",
  },
  {
    market: "Japan",
    score: 58,
    feedback:
      "Flags the comparative claim as potentially crude, notes the copy is English only, and recommends a softer call to action.",
  },
];

function ResultCard({
  market,
  score,
  feedback,
  style,
}: {
  market: string;
  score: number;
  feedback: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className="animate-fade-in-up flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-shadow duration-300 hover:shadow-sm"
      style={style}
    >
      <div className="flex items-baseline gap-2">
        <span className="font-medium">{market}</span>
        <span className="text-sm text-muted-foreground">
          {score} out of 100
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{feedback}</p>
    </div>
  );
}

export function MarketComparisonExample() {
  return (
    <div className="mt-8 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold tracking-tight">
          Same caption. Two markets.
        </h3>
        <p className="text-muted-foreground">
          The same words do not land the same way everywhere.
        </p>
      </div>

      <p className="rounded-lg border border-border bg-card p-4 text-sm italic">
        "Finally, a protein bar that does not taste like cardboard. 20g protein,
        200 calories, and it actually fits in your macros. Grab a 12 pack and
        thank yourself later."
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {results.map((result, index) => (
          <ResultCard
            key={result.market}
            market={result.market}
            score={result.score}
            feedback={result.feedback}
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>

      <p
        className={cn("animate-fade-in-up text-sm font-medium text-foreground")}
        style={{ animationDelay: "200ms" }}
      >
        One caption, two markets, fourteen points apart.
      </p>
    </div>
  );
}
