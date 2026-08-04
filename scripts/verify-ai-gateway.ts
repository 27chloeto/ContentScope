import { streamText } from "ai";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  const result = streamText({
    model: "openai/gpt-5.4-mini",
    prompt: "Say hello in exactly five words.",
  });

  for await (const chunk of result.textStream) {
    process.stdout.write(chunk);
  }

  process.stdout.write("\n");

  const usage = await result.usage;
  console.log("usage:", usage);
}

main();
