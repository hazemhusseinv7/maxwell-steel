export interface ArabicFoldOptions {
  alef?: boolean;
  tehYa?: boolean;
}

export function normalizeArabic(
  input: string,
  opts: ArabicFoldOptions = {},
): string {
  const { alef = true, tehYa = true } = opts;
  let s: string;
  if (alef) {
    s = input.normalize("NFKD").replace(/[\u064B-\u065F\u0670]/g, "");
  } else {
    s = input.replace(/[\u064B-\u0653\u0655-\u065F\u0670]/g, "");
  }
  s = s.replace(/ـ/g, "");
  if (alef) {
    s = s
      .replace(/[أإآٱ]/g, "ا")
      .replace(/ؤ/g, "و")
      .replace(/ئ/g, "ي");
  }
  if (tehYa) {
    s = s.replace(/ة/g, "ه").replace(/ى/g, "ي");
  }
  return s
    .replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)))
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function arabicVariants(input: string): string[] {
  const combos: ArabicFoldOptions[] = [
    {},
    { tehYa: false },
    { alef: false },
    { alef: false, tehYa: false },
  ];
  const seen = new Set<string>();
  const out: string[] = [];
  const raw = input.trim();
  if (raw) {
    seen.add(raw);
    out.push(raw);
  }
  for (const opts of combos) {
    const v = normalizeArabic(input, opts);
    if (v && !seen.has(v)) {
      seen.add(v);
      out.push(v);
    }
  }
  return out;
}
