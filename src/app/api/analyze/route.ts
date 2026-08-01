import type Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import {
  ANALYSIS_TOOL_NAME,
  analysisRequestSchema,
  analysisResultSchema,
  analysisToolInputSchema,
  CONTENT_TYPES,
} from "~/lib/analysis-schema";
import { anthropic } from "~/lib/anthropic";
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

  if (!anthropic) {
    return NextResponse.json(
      {
        error:
          "Analysis isn't configured yet. Set ANTHROPIC_API_KEY in .env.local.",
      },
      { status: 500 },
    );
  }

  const { contentType, text, image, audience } = parsed.data;
  const contentTypeLabel =
    CONTENT_TYPES.find((c) => c.value === contentType)?.label ?? contentType;

  const content: Anthropic.MessageParam["content"] = [
    {
      type: "text",
      text: [
        `Content type: ${contentTypeLabel}`,
        `Target age group: ${audience.ageGroup}`,
        `Target location: ${audience.location}`,
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
      source: {
        type: "base64",
        media_type: image.mediaType,
        data: image.base64,
      },
    });
  }

  let response: Awaited<ReturnType<typeof anthropic.messages.create>>;
  try {
    response = await anthropic.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 1500,
      system:
        "You are ContentScope, an expert social media content analyst for skincare brands. " +
        "Evaluate the given post against the described target audience for messaging and tone, " +
        "visual appeal (if an image is provided), audience fit, cultural relevance, and product claims. " +
        "Be specific and concrete — reference exact phrases or visual details rather than generic advice. " +
        "Flag any claims that may overstate results or lack substantiation. " +
        "Call the provide_content_analysis tool with your findings.",
      tools: [
        {
          name: ANALYSIS_TOOL_NAME,
          description:
            "Report the audience fit analysis for a skincare brand's social media post.",
          input_schema: analysisToolInputSchema,
        },
      ],
      tool_choice: { type: "tool", name: ANALYSIS_TOOL_NAME },
      messages: [{ role: "user", content }],
    });
  } catch (error) {
    console.error("Anthropic request failed", error);
    return NextResponse.json(
      { error: "Analysis service is unavailable. Please try again." },
      { status: 502 },
    );
  }

  const toolUse = response.content.find(
    (block) => block.type === "tool_use" && block.name === ANALYSIS_TOOL_NAME,
  );

  if (!toolUse || toolUse.type !== "tool_use") {
    return NextResponse.json(
      { error: "Analysis service returned an unexpected response." },
      { status: 502 },
    );
  }

  const result = analysisResultSchema.safeParse(toolUse.input);

  if (!result.success) {
    console.error("Analysis result failed validation", result.error);
    return NextResponse.json(
      { error: "Analysis service returned an unexpected response." },
      { status: 502 },
    );
  }

  const { error: insertError } = await supabase.from("analyses").insert({
    user_id: user.id,
    content_type: contentType,
    post_text: text,
    age_group: audience.ageGroup,
    location: audience.location,
    target_customer: audience.targetCustomer,
    fit_score: result.data.fitScore,
    strengths: result.data.strengths,
    weaknesses: result.data.weaknesses,
    issues: result.data.issues,
    recommendations: result.data.recommendations,
  });

  if (insertError) {
    console.error("Failed to save analysis", insertError);
  }

  return NextResponse.json(result.data);
}
