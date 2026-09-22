import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  escapeMarkdown
} from "discord.js";
import { config } from "./config.js";
import { translateToVietnamese, TranslationError } from "./translator.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const translateCommand = new SlashCommandBuilder()
  .setName("translate")
  .setDescription("Dịch một đoạn văn sang tiếng Việt")
  .addStringOption((option) =>
    option.setName("text").setDescription("Nội dung cần dịch").setRequired(true).setMaxLength(config.maxSourceLength)
  )
  .addStringOption((option) =>
    option.setName("source").setDescription("Mã ngôn ngữ nguồn, ví dụ: en, ja, ko").setRequired(false).setMaxLength(8)
  );

const recentTranslations = new Map();

function isCoolingDown(key) {
  const now = Date.now();
  const previous = recentTranslations.get(key) ?? 0;
  recentTranslations.set(key, now);
  return now - previous < config.cooldownMs;
}

function safeReply(text, sourceLabel) {
  const clipped = text.length > 1800 ? `${text.slice(0, 1797)}…` : text;
  return `**Bản dịch tiếng Việt**${sourceLabel ? ` · nguồn: ${escapeMarkdown(sourceLabel)}` : ""}\n${escapeMarkdown(clipped)}`;
}

async function requestTranslation(text, source = "auto") {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12_000);
  try {
    return await translateToVietnamese({
      text,
      source,
      apiUrl: config.translateApiUrl,
      apiKey: config.translateApiKey,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}

client.once("ready", async (readyClient) => {
  const rest = new REST({ version: "10" }).setToken(config.discordToken);
  await rest.put(Routes.applicationCommands(config.discordClientId), { body: [translateCommand.toJSON()] });
  console.log(`Translator bot connected as ${readyClient.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand() || interaction.commandName !== "translate") return;
  if (isCoolingDown(`command:${interaction.user.id}`)) {
    await interaction.reply({ content: "Vui lòng chờ một chút trước khi dịch tiếp.", ephemeral: true });
    return;
  }

  await interaction.deferReply();
  try {
    const text = interaction.options.getString("text", true);
    const source = interaction.options.getString("source")?.trim() || "auto";
    const result = await requestTranslation(text, source);
    await interaction.editReply(safeReply(result.translatedText, result.detectedLanguage));
  } catch (error) {
    const message = error instanceof TranslationError ? error.message : "Không thể dịch lúc này. Vui lòng thử lại sau.";
    await interaction.editReply(message);
  }
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild || !config.autoTranslateChannelIds.has(message.channelId)) return;
  const text = message.cleanContent.trim();
  if (!text || text.length > config.maxSourceLength || isCoolingDown(`auto:${message.author.id}`)) return;

  try {
    const result = await requestTranslation(text);
    if (result.detectedLanguage === "vi") return;
    await message.reply({
      content: safeReply(result.translatedText, result.detectedLanguage),
      allowedMentions: { repliedUser: false }
    });
  } catch (error) {
    console.error("Automatic translation failed:", error instanceof Error ? error.message : error);
  }
});

client.on("error", (error) => console.error("Discord client error:", error));
client.login(config.discordToken);
