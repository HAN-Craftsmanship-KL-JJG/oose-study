// The code languages of the site.
// Add a language here and add files with its extension to examples/.

export const LANGUAGES = [
  { id: "java", label: "Java", ext: "java", shiki: "java" },
  { id: "cpp", label: "C++", ext: "cpp", shiki: "cpp" },
] as const;

export type LanguageId = (typeof LANGUAGES)[number]["id"];

// Java is the default.
export const DEFAULT_LANGUAGE: LanguageId = "java";

export function isLanguageId(value: unknown): value is LanguageId {
  return LANGUAGES.some((l) => l.id === value);
}
