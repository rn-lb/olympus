# Discord Vietnamese Translator

A small Discord bot that translates text into Vietnamese through a LibreTranslate-compatible API.

## Capabilities

- `/translate text:<content> source:<optional language code>`
- Automatic translation in an allowlist of channels
- Ignores bots and Vietnamese messages to prevent loops
- Per-user cooldown, input limit, request timeout, and safe mention handling
- No message database and no credentials committed to the repository

## Requirements

- Node.js 20 or newer
- A Discord application and bot token
- A LibreTranslate-compatible service; self-hosting is recommended

## Discord setup

1. Create an application in the Discord Developer Portal.
2. Open **Bot**, create the bot, and enable **Message Content Intent** only if automatic channel translation is needed.
3. Under OAuth2 URL Generator, choose `bot` and `applications.commands`.
4. Give the bot only these permissions: View Channels, Send Messages, Read Message History.
5. Invite it to your server.

## Local setup

```bash
cd bot
npm install
cp .env.example .env
npm start
```

Fill in `DISCORD_TOKEN` and `DISCORD_CLIENT_ID`. Set `AUTO_TRANSLATE_CHANNEL_IDS` to comma-separated Discord channel IDs, or leave it empty and use only `/translate`.

## Translation service

The default endpoint is `http://localhost:5000`. Point `TRANSLATE_API_URL` at a LibreTranslate instance. If that instance requires a key, set `TRANSLATE_API_KEY`.

Do not use an unknown public translation endpoint for private conversations. Its operator may be able to observe submitted text.

## Privacy and moderation

The bot sends text to the configured translation service but does not store messages itself. Server administrators should tell members which service is used and should avoid auto-translating sensitive channels.
