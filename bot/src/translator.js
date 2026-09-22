const SUPPORTED_SOURCE_PATTERN = /^[a-z]{2,3}(-[A-Z]{2})?$/;

export class TranslationError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.name = "TranslationError";
    this.status = status;
  }
}

export async function translateToVietnamese({ text, source = "auto", apiUrl, apiKey, signal }) {
  const cleanText = text.trim();
  if (!cleanText) throw new TranslationError("Không có nội dung để dịch.", 400);
  if (source !== "auto" && !SUPPORTED_SOURCE_PATTERN.test(source)) {
    throw new TranslationError("Mã ngôn ngữ nguồn không hợp lệ.", 400);
  }

  const response = await fetch(`${apiUrl}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      q: cleanText,
      source,
      target: "vi",
      format: "text",
      ...(apiKey ? { api_key: apiKey } : {})
    }),
    signal
  });

  if (!response.ok) {
    throw new TranslationError(`Dịch vụ dịch trả về lỗi ${response.status}.`, response.status);
  }

  const payload = await response.json();
  const translatedText = payload.translatedText?.trim();
  if (!translatedText) throw new TranslationError("Dịch vụ không trả về bản dịch hợp lệ.");

  return {
    translatedText,
    detectedLanguage: payload.detectedLanguage?.language ?? source
  };
}
