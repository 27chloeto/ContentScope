import { z } from "zod";

export const CONTENT_TYPES = [
  { value: "instagram_post", label: "Instagram post" },
  { value: "tiktok_caption", label: "TikTok caption" },
  { value: "product_description", label: "Product description" },
  { value: "general_caption", label: "General caption" },
] as const;

export const AGE_GROUPS = [
  "13-17",
  "18-24",
  "25-34",
  "35-44",
  "45-54",
  "55+",
] as const;

export const PLATFORMS = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "facebook", label: "Facebook" },
] as const;

export const audienceInputSchema = z.object({
  ageGroup: z.enum(AGE_GROUPS),
  location: z.string().min(1).max(120),
  targetCustomer: z.string().min(1).max(500),
  platform: z.enum(PLATFORMS.map((p) => p.value) as [string, ...string[]]),
});

export const analysisRequestSchema = z.object({
  contentType: z.enum(
    CONTENT_TYPES.map((c) => c.value) as [string, ...string[]],
  ),
  text: z.string().min(1).max(4000),
  image: z
    .object({
      base64: z.string().min(1),
      mediaType: z.enum(["image/jpeg", "image/png", "image/gif", "image/webp"]),
    })
    .optional(),
  audience: audienceInputSchema,
});

export type AnalysisRequest = z.infer<typeof analysisRequestSchema>;
export type AudienceInput = z.infer<typeof audienceInputSchema>;

export const analysisResultSchema = z.object({
  fitScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "Overall audience fit score from 0-100, where 100 means the content is perfectly tailored to the target audience, platform, and region.",
    ),
  strengths: z
    .array(z.string())
    .max(6)
    .describe("What the content already does well for this audience."),
  weaknesses: z
    .array(z.string())
    .max(6)
    .describe("Where the content falls short for this audience."),
  issues: z
    .array(z.string())
    .max(6)
    .describe(
      "Specific potential problems, e.g. overstated product claims, cultural mismatches, tone issues, or platform norm violations.",
    ),
  recommendations: z
    .array(z.string())
    .min(1)
    .max(8)
    .describe(
      "Specific, actionable edits the brand should make before publishing, tailored to the target platform's format and conventions.",
    ),
});

export type AnalysisResult = z.infer<typeof analysisResultSchema>;
