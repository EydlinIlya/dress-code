export type Locale = "en" | "ru";

export const LOCALES: Locale[] = ["en", "ru"];

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
};

export const LOCALE_FULL_LABELS: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
};

const en = {
  "brand": "Code Dress",

  "home.hero.title": "Create your event's dress code.",
  "home.hero.subtitle": "Pick colors and share a link with your guests. No accounts needed.",
  "home.palette.title": "Your Palette",
  "home.palette.count": "{count}/{max} colors",
  "home.palette.countShort": "{count}/{max}",
  "home.continue": "Continue",
  "home.loading": "Loading…",

  "share.back": "Back to color picker",
  "share.title": "Your dress code is ready.",
  "share.subtitle": "Customize your settings and share the link with your guests.",
  "share.palette": "Your Palette",
  "share.heading": "Share Your Link",
  "share.description": "Send this link to your guests. They'll be able to upload a photo and instantly check if their outfit matches your palette.",
  "share.yourName": "Your name",
  "share.optional": "(optional)",
  "share.guestsWillSee": "Guests will see \u201C{text}\u201D",
  "share.invitesSuffix": "invites",
  "share.inviteSuffix": "invite",
  "share.defaultGreeting": "You're invited to an event with a dress code",
  "share.namePlaceholder": "e.g. Emma & James",
  "share.copied": "Copied!",
  "share.copyLink": "Copy Link",
  "share.previewAsGuest": "Preview as Guest",
  "share.shareLink": "Share Link",

  "preview.back": "Back to settings",
  "preview.label": "Preview",

  "notFound.title": "Page not found",
  "notFound.message": "This link doesn't look right. If you're a guest, ask the host for a new link.",
  "notFound.home": "Go to home page",

  "guest.greeting.personal": "{host} {verb} you to check your outfit.",
  "guest.invite.verb.singular": "invites",
  "guest.invite.verb.plural": "invite",
  "guest.greeting.default": "You're invited to an event with a dress code.",
  "guest.instructions": "Upload a photo to see if your outfit matches.",
  "guest.encouragement": "We'll analyze your color match instantly.",
  "guest.addPhoto": "Add photo",
  "guest.takePhoto": "Take photo",
  "guest.pickFromScreen": "Pick from screen",
  "guest.hostsPalette": "Host's Palette",

  "uploader.title": "Upload Photo",
  "uploader.hint": "Tap to browse gallery or drag & drop",
  "uploader.takePhoto": "Take a photo",

  "canvas.instruction": "Tap or click on your outfit to check the color",
  "canvas.reCheck": "Tap a different spot to re-check",

  "photos.alt": "Photo {n}",

  "match.yourPick": "Your pick",
  "match.closest": "Closest",
  "match.vs": "vs",
  "match.good": "Good choice!",
  "match.ask": "Better ask the host",
  "match.no": "Not a match, try something else",

  "playful.1": "It\u2019s a pleasure to have you as a guest. In some dresses, more pleasure than in others.",
  "playful.2": "Looking good is optional. Looking right is not.",
  "playful.3": "The host picked the colors. You pick the outfit. Let\u2019s see if it\u2019s a match.",
  "playful.4": "Your style, their palette. Let\u2019s make sure they agree.",

  "picker.hexCode": "Hex Code",
  "picker.pickFromScreen": "Pick color from screen",
  "picker.addColor": "Add Color",

  "suggestions.matches": "Matches",
  "suggestions.presets": "Presets",
  "suggestions.complementary": "Complementary",
  "suggestions.analogous": "Analogous",
  "suggestions.triadic": "Triadic",
  "suggestions.splitComplementary": "Split Comp.",
  "suggestions.addAll": "Add all",
  "suggestions.addColor": "Add {color}",

  "preset.anastasia": "Anastasia\u2019s Wedding",
  "preset.stPatrick": "St. Patrick\u2019s Day",
  "preset.barcelona": "Barcelona Game",
  "preset.monochrome": "Monochrome",

  "list.showSuggestions": "Show suggestions for {color}",
  "list.removeColor": "Remove color {color}",

  "strictness.label": "How strict?",
  "strictness.strict.label": "Exact match",
  "strictness.strict.desc": "Uniform \u2014 colors must be spot-on",
  "strictness.default.label": "Photo-ready",
  "strictness.default.desc": "Close enough for nice photos",
  "strictness.relaxed.label": "General vibe",
  "strictness.relaxed.desc": "Right ballpark is fine",

  "style.label": "Guest page style",
  "style.desc": "Choose how your guests will see the page.",
  "style.wedding.label": "Wedding",
  "style.wedding.desc": "Soft and romantic",
  "style.party.label": "Party",
  "style.party.desc": "Bold and fun",
  "style.gala.label": "Gala",
  "style.gala.desc": "Elegant black-tie",

  "swatch.aria": "Color {color}",

  "lang.switchTo": "Switch to {lang}",
} as const;

export type TranslationKey = keyof typeof en;

const ru: Record<TranslationKey, string> = {
  "brand": "Code Dress",

  "home.hero.title": "Создайте дресс-код для вашего события.",
  "home.hero.subtitle": "Выберите цвета и отправьте ссылку гостям. Без регистрации.",
  "home.palette.title": "Ваша палитра",
  "home.palette.count": "{count}/{max} цветов",
  "home.palette.countShort": "{count}/{max}",
  "home.continue": "Продолжить",
  "home.loading": "Загрузка…",

  "share.back": "Назад к выбору цветов",
  "share.title": "Ваш дресс-код готов.",
  "share.subtitle": "Настройте параметры и поделитесь ссылкой с гостями.",
  "share.palette": "Ваша палитра",
  "share.heading": "Ваша ссылка",
  "share.description": "Отправьте эту ссылку гостям. Они смогут загрузить фото и мгновенно проверить, подходит ли их наряд к вашей палитре.",
  "share.yourName": "Ваше имя",
  "share.optional": "(необязательно)",
  "share.guestsWillSee": "Гости увидят: «{text}»",
  "share.invitesSuffix": "приглашает",
  "share.inviteSuffix": "приглашают",
  "share.defaultGreeting": "Вас приглашают на событие с дресс-кодом",
  "share.namePlaceholder": "напр. Эмма и Джеймс",
  "share.copied": "Скопировано!",
  "share.copyLink": "Скопировать ссылку",
  "share.previewAsGuest": "Превью для гостя",
  "share.shareLink": "Ссылка",

  "preview.back": "Назад к настройкам",
  "preview.label": "Превью",

  "notFound.title": "Страница не найдена",
  "notFound.message": "Эта ссылка выглядит некорректной. Если вы гость, попросите у хозяина новую ссылку.",
  "notFound.home": "На главную",

  "guest.greeting.personal": "{host} {verb} вас проверить свой наряд.",
  "guest.invite.verb.singular": "приглашает",
  "guest.invite.verb.plural": "приглашают",
  "guest.greeting.default": "Вас приглашают на событие с дресс-кодом.",
  "guest.instructions": "Загрузите фото, чтобы проверить, подходит ли ваш наряд.",
  "guest.encouragement": "Мы мгновенно проанализируем совпадение цвета.",
  "guest.addPhoto": "Добавить фото",
  "guest.takePhoto": "Сделать фото",
  "guest.pickFromScreen": "Пипетка с экрана",
  "guest.hostsPalette": "Палитра хозяина",

  "uploader.title": "Загрузить фото",
  "uploader.hint": "Нажмите, чтобы выбрать из галереи, или перетащите",
  "uploader.takePhoto": "Сделать фото",

  "canvas.instruction": "Нажмите на свой наряд, чтобы проверить цвет",
  "canvas.reCheck": "Нажмите в другом месте, чтобы перепроверить",

  "photos.alt": "Фото {n}",

  "match.yourPick": "Ваш цвет",
  "match.closest": "Ближайший",
  "match.vs": "vs",
  "match.good": "Отличный выбор!",
  "match.ask": "Лучше спросите у хозяина",
  "match.no": "Не подходит, попробуйте другой",

  "playful.1": "Нам приятно видеть вас в гостях. В некоторых нарядах — приятнее, чем в других.",
  "playful.2": "Выглядеть хорошо — необязательно. Выглядеть правильно — обязательно.",
  "playful.3": "Хозяин выбрал цвета. Вы выбираете наряд. Посмотрим, совпадут ли они.",
  "playful.4": "Ваш стиль, их палитра. Давайте убедимся, что они ладят.",

  "picker.hexCode": "HEX-код",
  "picker.pickFromScreen": "Пипетка с экрана",
  "picker.addColor": "Добавить цвет",

  "suggestions.matches": "Сочетания",
  "suggestions.presets": "Пресеты",
  "suggestions.complementary": "Контрастный",
  "suggestions.analogous": "Родственный",
  "suggestions.triadic": "Триада",
  "suggestions.splitComplementary": "Раздельно-контр.",
  "suggestions.addAll": "Добавить все",
  "suggestions.addColor": "Добавить {color}",

  "preset.anastasia": "Свадьба Анастасии",
  "preset.stPatrick": "День святого Патрика",
  "preset.barcelona": "Матч «Барселоны»",
  "preset.monochrome": "Монохром",

  "list.showSuggestions": "Показать сочетания для {color}",
  "list.removeColor": "Удалить цвет {color}",

  "strictness.label": "Насколько строго?",
  "strictness.strict.label": "Точное совпадение",
  "strictness.strict.desc": "Форма — цвета должны быть точно такими же",
  "strictness.default.label": "Для фото",
  "strictness.default.desc": "Достаточно близко для хороших снимков",
  "strictness.relaxed.label": "Общий вайб",
  "strictness.relaxed.desc": "Главное — попасть в настроение",

  "style.label": "Стиль страницы для гостя",
  "style.desc": "Выберите, как гости будут видеть страницу.",
  "style.wedding.label": "Свадьба",
  "style.wedding.desc": "Мягко и романтично",
  "style.party.label": "Вечеринка",
  "style.party.desc": "Ярко и весело",
  "style.gala.label": "Гала",
  "style.gala.desc": "Элегантный black-tie",

  "swatch.aria": "Цвет {color}",

  "lang.switchTo": "Переключить на {lang}",
};

export const translations: Record<Locale, Record<TranslationKey, string>> = { en, ru };

export function translate(
  locale: Locale,
  key: TranslationKey,
  vars?: Record<string, string | number>
): string {
  const dict = translations[locale] ?? translations.en;
  const str = dict[key] ?? translations.en[key] ?? String(key);
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => {
    const v = vars[k];
    return v === undefined || v === null ? `{${k}}` : String(v);
  });
}

export function normalizeLocale(value: string | null | undefined): Locale | null {
  if (value === "en" || value === "ru") return value;
  return null;
}

export function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "en";
  const lang = (navigator.language || "").toLowerCase();
  if (lang.startsWith("ru")) return "ru";
  return "en";
}
