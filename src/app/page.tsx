import Link from "next/link";
import { BeforeActionAfter } from "~/components/before-action-after";
import { SkincareIllustration } from "~/components/skincare-illustration";
import { buttonVariants } from "~/components/ui/button-variants";
import { cn } from "~/lib/utils";

const steps = [
  {
    number: "01",
    title: "Connect your content",
    description:
      "Drop in a draft post, caption, or image and tell us which platform it's headed for.",
  },
  {
    number: "02",
    title: "Get an audience fit score",
    description:
      "ContentScope compares the post against your brand's audience — tone, claims, ingredients, and visuals — and scores how well it lands.",
  },
  {
    number: "03",
    title: "Fix it before you post",
    description:
      "Get specific, actionable edits to copy and visuals so the post resonates before it ever goes live.",
  },
];

const features = [
  {
    title: "Audience fit analysis",
    description:
      "See how a post reads to your actual followers — skin concerns, age range, and buying intent — not just generic engagement guesses.",
  },
  {
    title: "Pre-publish recommendations",
    description:
      "Every post comes back with concrete suggestions: tighten the hook, reorder claims, swap a visual, adjust the CTA.",
  },
  {
    title: "Ingredient & claims awareness",
    description:
      "Flags language that may overstate results or clash with how your audience talks about actives and routines.",
  },
  {
    title: "Built for skincare brands",
    description:
      "Tuned on skincare social content specifically, so recommendations reflect how the category actually performs.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col">
      <section className="mx-auto grid w-full max-w-3xl grid-cols-1 items-center gap-10 px-4 pt-24 pb-20 sm:grid-cols-[1.2fr_1fr]">
        <div className="flex flex-col gap-6">
          <p className="text-sm font-medium text-muted-foreground">
            ContentScope
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Know if a post will land — before you publish it.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            ContentScope analyzes your skincare brand's social posts for
            audience fit and recommends changes before they go live, so every
            post is built to resonate.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <Link href="/notes" className={cn(buttonVariants({ size: "lg" }))}>
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
        <SkincareIllustration className="hidden w-full max-w-[280px] justify-self-end sm:block" />
      </section>

      <section
        id="how-it-works"
        className="mx-auto w-full max-w-3xl border-t border-border px-4 py-20"
      >
        <h2 className="text-sm font-medium text-muted-foreground">
          How it works
        </h2>
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
        <h2 className="text-sm font-medium text-muted-foreground">
          See it in action
        </h2>
        <BeforeActionAfter />
      </section>

      <section className="mx-auto w-full max-w-3xl border-t border-border px-4 py-20">
        <h2 className="text-sm font-medium text-muted-foreground">
          What you get
        </h2>
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
          <Link href="/notes" className={cn(buttonVariants({ size: "lg" }))}>
            Get started
          </Link>
        </div>
      </section>
    </main>
  );
}
