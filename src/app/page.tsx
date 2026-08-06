import Link from "next/link";
import type { ReactNode } from "react";
import { MarketComparisonExample } from "~/components/market-comparison-example";
import { SkincareIllustration } from "~/components/skincare-illustration";
import { buttonVariants } from "~/components/ui/button-variants";
import { cn } from "~/lib/utils";

const steps = [
  {
    number: "01",
    title: "Paste your draft",
    description:
      "Add the caption or product description you are planning to post, choose the content type, and optionally upload the image that goes with it.",
  },
  {
    number: "02",
    title: "Say who it is for, and where",
    description:
      "Set the age group, the platform, the location you are posting into, and a short description of your target customer.",
  },
  {
    number: "03",
    title: "See how it lands",
    description:
      "Get an audience fit score out of 100, along with strengths, weaknesses, potential issues, and specific edits you can make before publishing.",
  },
];

const features = [
  {
    title: "Audience fit score",
    description:
      "A single score out of 100 showing how well the post matches the people you are trying to reach.",
  },
  {
    title: "Market aware feedback",
    description:
      "Set a location and the analysis accounts for local advertising norms, tone, directness, and language expectations, not just translation.",
  },
  {
    title: "Strengths, weaknesses, and issues",
    description:
      "A structured read on what is working, what is not, and what could create a problem once published.",
  },
  {
    title: "Specific recommended edits",
    description:
      "Concrete suggestions you can apply directly, including alternative phrasings and visual direction.",
  },
];

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
      <span className="size-1.5 rounded-full bg-primary" />
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="relative mx-auto grid w-full max-w-3xl grid-cols-1 items-center gap-10 overflow-hidden px-4 pt-24 pb-20 sm:grid-cols-[1.2fr_1fr]">
        <div
          aria-hidden="true"
          className="-z-10 pointer-events-none absolute top-[-6rem] right-[-4rem] size-72 rounded-full bg-primary/10 blur-3xl"
        />
        <div className="flex flex-col gap-6">
          <Eyebrow>ContentScope</Eyebrow>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Know how your post will land, in any market.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            ContentScope scores a draft post against the audience and the market
            you are targeting, then tells you exactly what to change before you
            publish.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <Link
              href="/analyze"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Get started
            </Link>
            <a
              href="#how-it-works"
              className={cn(buttonVariants({ size: "lg", variant: "ghost" }))}
            >
              See how it works
            </a>
          </div>
        </div>
        <SkincareIllustration className="hidden w-full max-w-[340px] justify-self-end sm:block" />
      </section>

      <section
        id="how-it-works"
        className="mx-auto w-full max-w-3xl border-t border-border px-4 py-20"
      >
        <Eyebrow>How it works</Eyebrow>
        <div className="mt-8 flex flex-col">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={cn(
                "flex gap-6 py-8",
                index !== steps.length - 1 && "border-b border-border",
              )}
            >
              <span className="font-mono text-sm text-muted-foreground">
                {step.number}
              </span>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-medium">{step.title}</h3>
                <p className="max-w-lg text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl border-t border-border px-4 py-20">
        <Eyebrow>See it in action</Eyebrow>
        <MarketComparisonExample />
      </section>

      <section className="mx-auto w-full max-w-3xl border-t border-border px-4 py-20">
        <Eyebrow>What you get</Eyebrow>
        <div className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-1.5">
              <h3 className="font-medium">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl border-t border-border px-4 py-20">
        <div className="flex flex-col items-start gap-5">
          <h2 className="max-w-md text-2xl font-semibold tracking-tight text-balance">
            Publish with confidence, not guesswork.
          </h2>
          <Link href="/analyze" className={cn(buttonVariants({ size: "lg" }))}>
            Get started
          </Link>
        </div>
      </section>
    </main>
  );
}
