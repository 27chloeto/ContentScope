import { generateObject } from "ai";
import { NextResponse } from "next/server";
import {
  analysisRequestSchema,
  analysisResultSchema,
  CONTENT_TYPES,
  PLATFORMS,
} from "~/lib/analysis-schema";
import { createClient } from "~/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "You must be signed in to analyze a post." },
      { status: 401 },
    );
  }

  const body = await request.json();
  const parsed = analysisRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const { contentType, text, image, audience } = parsed.data;
  const contentTypeLabel =
    CONTENT_TYPES.find((c) => c.value === contentType)?.label ?? contentType;
  const platformLabel =
    PLATFORMS.find((p) => p.value === audience.platform)?.label ??
    audience.platform;

  const content: Array<
    { type: "text"; text: string } | { type: "image"; image: string }
  > = [
    {
      type: "text",
      text: [
        `Content type: ${contentTypeLabel}`,
        `Target platform: ${platformLabel}`,
        `Target age group: ${audience.ageGroup}`,
        `Target region: ${audience.location}`,
        `Target customer: ${audience.targetCustomer}`,
        "",
        "Post content:",
        text,
      ].join("\n"),
    },
  ];

  if (image) {
    content.push({
      type: "image",
      image: `data:${image.mediaType};base64,${image.base64}`,
    });
  }

  try {
    const { object: result } = await generateObject({
      model: "openai/gpt-5.4-mini",
      schema: analysisResultSchema,
      system:
        "You are ContentScope, an expert social media content strategist for skincare brands. " +
        "Evaluate the given post against the described target audience, region, and platform for " +
        "messaging and tone, visual appeal (if an image is provided), audience fit, cultural relevance, " +
        "product claims, and fit with that platform's format and norms (e.g. TikTok favors casual/short-form " +
        "hooks, Instagram favors polished visuals, Facebook skews toward an older audience and longer copy). " +
        "Be specific and concrete — reference exact phrases or visual details rather than generic advice. " +
        "Flag any claims that may overstate results or lack substantiation.",
      messages: [{ role: "user", content }],
    });

    const { error: insertError } = await supabase.from("analyses").insert({
      user_id: user.id,
      content_type: contentType,
      post_text: text,
      age_group: audience.ageGroup,
      location: audience.location,
      target_customer: audience.targetCustomer,
      platform: audience.platform,
      fit_score: result.fitScore,
      strengths: result.strengths,
      weaknesses: result.weaknesses,
      issues: result.issues,
      recommendations: result.recommendations,
    });

    if (insertError) {
      console.error("Failed to save analysis", insertError);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("AI Gateway request failed", error);
    return NextResponse.json(
      { error: "Analysis service is unavailable. Please try again." },
      { status: 502 },
    );
  }
}
