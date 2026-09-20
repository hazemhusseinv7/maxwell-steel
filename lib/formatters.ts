const AR_LOCALE = "ar-EG-u-nu-arab";

const dateTimeFmt = new Intl.DateTimeFormat(AR_LOCALE, {
  dateStyle: "medium",
  timeStyle: "short",
});

const dateFmt = new Intl.DateTimeFormat(AR_LOCALE, { dateStyle: "long" });

const numberFmt = new Intl.NumberFormat(AR_LOCALE);

const yearFmt = new Intl.DateTimeFormat(AR_LOCALE, { year: "numeric" });

export function formatDateTimeAr(value: string | Date): string {
  return dateTimeFmt.format(new Date(value));
}

export function formatDateAr(value: string | Date): string {
  return dateFmt.format(new Date(value));
}

export function formatNumberAr(value: number): string {
  return numberFmt.format(value);
}

/** Full year in Arabic-Indic digits, e.g. "٢٠٢٦". */
export function formatYearAr(value: string | Date): string {
  return yearFmt.format(new Date(value));
}

export interface ArabicCountForms {
  /** Singular, e.g. "مقال". */
  one: string;
  /** Dual, e.g. "مقالان". */
  two: string;
  /** Plural for 3–10, e.g. "مقالات". */
  few: string;
  /** Accusative singular for 11–99, e.g. "مقالًا". */
  many: string;
}

export const ARTICLE_FORMS: ArabicCountForms = {
  one: "مقال",
  two: "مقالان",
  few: "مقالات",
  many: "مقالًا",
};

export const TICKET_FORMS: ArabicCountForms = {
  one: "تذكرة",
  two: "تذكرتان",
  few: "تذاكر",
  many: "تذكرةً",
};

export const SUBSCRIBER_FORMS: ArabicCountForms = {
  one: "مشترك",
  two: "مشتركان",
  few: "مشتركين",
  many: "مشتركًا",
};

/**
 * Count + noun with CLDR Arabic plural rules, e.g. "لا مقالات"، "مقال
 * واحد"، "مقالان"، "٣ مقالات"، "١١ مقالًا"، "١٠٠ مقال".
 */
export function formatCountAr(value: number, forms: ArabicCountForms): string {
  const n = Math.max(0, Math.floor(value));
  if (n === 0) return `لا ${forms.few}`;
  if (n === 1) return `${forms.one} واحد`;
  if (n === 2) return forms.two;
  const mod100 = n % 100;
  if (mod100 <= 2) return `${formatNumberAr(n)} ${forms.one}`;
  if (mod100 <= 10) return `${formatNumberAr(n)} ${forms.few}`;
  return `${formatNumberAr(n)} ${forms.many}`;
}

/** Estimated reading time in Arabic, e.g. "٥ دقائق قراءة". */
export function readingTimeAr(wordCount: number, wpm = 200): string {
  const minutes = Math.max(1, Math.ceil(wordCount / wpm));
  return `${formatNumberAr(minutes)} ${minutes === 1 ? "دقيقة" : minutes === 2 ? "دقيقتان" : "دقائق"} قراءة`;
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}
