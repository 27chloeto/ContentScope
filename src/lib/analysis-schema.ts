import type Anthropic from "@anthropic-ai/sdk";
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

export const audienceInputSchema = z.object({
  ageGroup: z.enum(AGE_GROUPS),
  location: z.string().min(1).max(120),
  targetCustomer: z.string().min(1).max(500),
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
  fitScore: z.number().min(0).max(100),
  strengths: z.array(z.string()).max(6),
  weaknesses: z.array(z.string()).max(6),
  issues: z.array(z.string()).max(6),
  recommendations: z.array(z.string()).min(1).max(8),
});

export type AnalysisResult = z.infer<typeof analysisResultSchema>;

export const ANALYSIS_TOOL_NAME = "provide_content_analysis";

export const analysisToolInputSchema: Anthropic.Tool.InputSchema = {
  type: "object",
  properties: {
    fitScore: {
      type: "integer",
      minimum: 0,
      maximum: 100,
      description:
        "Overall audience fit score from 0-100, where 100 means the content is perfectly tailored to the target audience.",
    },
    strengths: {
      type: "array",
      items: { type: "string" },
      description: "What the content already does well for this audience.",
    },
    weaknesses: {
      type: "array",
      items: { type: "string" },
      description: "Where the content falls short for this audience.",
    },
    issues: {
      type: "array",
      items: { type: "string" },
      description:
        "Specific potential problems, e.g. overstated product claims, cultural mismatches, tone issues.",
    },
    recommendations: {
      type: "array",
      items: { type: "string" },
      description:
        "Specific, actionable edits the brand should make before publishing.",
    },
  },
  required: [
    "fitScore",
    "strengths",
    "weaknesses",
    "issues",
    "recommendations",
  ],
};
