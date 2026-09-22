import "dotenv/config";

function required(name) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

function positiveInteger(name, fallback) {
  const value = Number.parseInt(process.env[name] ?? String(fallback), 10);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`${name} must be a positive integer`);
  }
  return value;
}

export const config = Object.freeze({
  discordToken: required("DISCORD_TOKEN"),
  discordClientId: required("DISCORD_CLIENT_ID"),
  translateApiUrl: (process.env.TRANSLATE_API_URL ?? "http://localhost:5000").replace(/\/$/, ""),
  translateApiKey: process.env.TRANSLATE_API_KEY?.trim() ?? "",
  autoTranslateChannelIds: new Set(
    (process.env.AUTO_TRANSLATE_CHANNEL_IDS ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
  ),
  maxSourceLength: positiveInteger("MAX_SOURCE_LENGTH", 1500),
  cooldownMs: positiveInteger("TRANSLATION_COOLDOWN_MS", 3000)
});
