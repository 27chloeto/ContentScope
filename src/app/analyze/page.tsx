"use client";

import { useId, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  AGE_GROUPS,
  type AnalysisResult,
  CONTENT_TYPES,
} from "~/lib/analysis-schema";
import { cn } from "~/lib/utils";

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

type Step = "content" | "audience" | "loading" | "report";

function readFileAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1] ?? "");
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function ScoreDial({ score }: { score: number }) {
  const tone =
    score >= 80
      ? "text-primary"
      : score >= 60
        ? "text-foreground"
        : "text-destructive";

  return (
    <div className="flex items-baseline gap-2">
      <span className={cn("text-5xl font-semibold tracking-tight", tone)}>
        {score}
      </span>
      <span className="text-sm text-muted-foreground">/ 100 audience fit</span>
    </div>
  );
}

function ReportList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <span className="mt-2 size-1 shrink-0 rounded-full bg-muted-foreground" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AnalyzePage() {
  const [step, setStep] = useState<Step>("content");
  const [contentType, setContentType] = useState<
    (typeof CONTENT_TYPES)[number]["value"]
  >(CONTENT_TYPES[0].value);
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ageGroup, setAgeGroup] = useState<(typeof AGE_GROUPS)[number]>(
    AGE_GROUPS[1],
  );
  const [location, setLocation] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const contentTypeId = useId();
  const ageGroupId = useId();

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setError(null);
    if (!file) {
      setImageFile(null);
      setImagePreview(null);
      return;
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Please upload a JPEG, PNG, GIF, or WebP image.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("Image must be smaller than 5MB.");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit() {
    setError(null);
    setStep("loading");
    try {
      const image = imageFile
        ? {
            base64: await readFileAsBase64(imageFile),
            mediaType: imageFile.type,
          }
        : undefined;

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType,
          text,
          image,
          audience: { ageGroup, location, targetCustomer },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setStep("audience");
        return;
      }

      setResult(data as AnalysisResult);
      setStep("report");
    } catch {
      setError("Couldn't reach the analysis service. Please try again.");
      setStep("audience");
    }
  }

  function reset() {
    setStep("content");
    setText("");
    setImageFile(null);
    setImagePreview(null);
    setLocation("");
    setTargetCustomer("");
    setResult(null);
    setError(null);
  }

  return (
    <main className="mx-auto flex w-full max-w-xl flex-col gap-8 px-4 py-16">
      <div className="flex flex-col gap-2">
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <span className="size-1.5 rounded-full bg-primary" />
          {step === "report" ? "Feedback report" : "Analyze a post"}
        </span>
        <h1 className="text-2xl font-semibold tracking-tight">
          {step === "content" && "What are you posting?"}
          {step === "audience" && "Who is it for?"}
          {step === "loading" && "Analyzing your post…"}
          {step === "report" && "Here's how it lands"}
        </h1>
      </div>

      {step === "content" && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor={contentTypeId}>Content type</Label>
            <select
              id={contentTypeId}
              value={contentType}
              onChange={(e) =>
                setContentType(
                  e.target.value as (typeof CONTENT_TYPES)[number]["value"],
                )
              }
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {CONTENT_TYPES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="post-text">Caption or description</Label>
            <textarea
              id="post-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={6}
              placeholder="Paste your caption, product description, or post copy…"
              className="w-full resize-none rounded-md border border-input bg-transparent p-3 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="post-image">Marketing image (optional)</Label>
            <input
              id="post-image"
              type="file"
              accept={ALLOWED_IMAGE_TYPES.join(",")}
              onChange={handleImageChange}
              className="text-sm text-muted-foreground file:mr-3 file:h-8 file:rounded-md file:border file:border-input file:bg-transparent file:px-3 file:text-sm file:font-medium file:text-foreground"
            />
            {imagePreview && (
              // biome-ignore lint/performance/noImgElement: local object URL preview, not a remote asset
              <img
                src={imagePreview}
                alt="Upload preview"
                className="mt-2 h-32 w-32 rounded-md border border-border object-cover"
              />
            )}
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <Button
            size="lg"
            disabled={text.trim().length === 0}
            onClick={() => setStep("audience")}
            className="self-start"
          >
            Continue
          </Button>
        </div>
      )}

      {step === "audience" && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Label htmlFor={ageGroupId}>Age group</Label>
            <select
              id={ageGroupId}
              value={ageGroup}
              onChange={(e) =>
                setAgeGroup(e.target.value as (typeof AGE_GROUPS)[number])
              }
              className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            >
              {AGE_GROUPS.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. United States, urban Gen Z"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="target-customer">Target customer</Label>
            <textarea
              id="target-customer"
              value={targetCustomer}
              onChange={(e) => setTargetCustomer(e.target.value)}
              rows={3}
              placeholder="e.g. Acne-prone teens looking for affordable, gentle solutions"
              className="w-full resize-none rounded-md border border-input bg-transparent p-3 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex items-center gap-3">
            <Button
              size="lg"
              disabled={
                location.trim().length === 0 ||
                targetCustomer.trim().length === 0
              }
              onClick={handleSubmit}
            >
              Get feedback
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => setStep("content")}
            >
              Back
            </Button>
          </div>
        </div>
      )}

      {step === "loading" && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <div className="size-6 animate-spin rounded-full border-2 border-border border-t-primary" />
          <p className="text-sm text-muted-foreground">
            Checking messaging, tone, and audience fit…
          </p>
        </div>
      )}

      {step === "report" && result && (
        <div className="flex flex-col gap-8">
          <ScoreDial score={result.fitScore} />

          <div className="flex flex-col gap-6 rounded-lg border border-border bg-card p-5">
            <ReportList title="Strengths" items={result.strengths} />
            <ReportList title="Weaknesses" items={result.weaknesses} />
            <ReportList title="Potential issues" items={result.issues} />
            <ReportList
              title="Recommendations"
              items={result.recommendations}
            />
          </div>

          <Button size="lg" onClick={reset} className="self-start">
            Analyze another post
          </Button>
        </div>
      )}
    </main>
  );
}
