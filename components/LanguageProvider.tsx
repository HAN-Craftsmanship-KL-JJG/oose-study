"use client";

import { DEFAULT_LANGUAGE, isLanguageId, type LanguageId } from "@/lib/languages";
import { createStoredValue } from "@/lib/storage";

// The chosen code language for the whole site, remembered in the browser.
const store = createStoredValue<LanguageId>("oose-lang", DEFAULT_LANGUAGE, isLanguageId);

export function useLanguage(): { lang: LanguageId; setLang: (lang: LanguageId) => void } {
  return { lang: store.useValue(), setLang: store.set };
}
