import { useState } from "react"

type TranslationSection = {
  ru: Record<string, string>;
  en: Record<string, string>;
}

type LanguageResources = {
  [key: string]: TranslationSection;
}

const languageResources: LanguageResources = {
  navigation: {
    ru: {
      home: "Главная",
      channels: "Каналы",
      advertisers: "Рекламодатели",
      deals: "Сделки"
    },
    en: {
      home: "Home",
      channels: "Channels",
      advertisers: "Advertisers",
      deals: "Deals"
    }
  }
} 

const getTranslation = (section: string, key: string, lang: "ru" | "en"): string => {
  const resource = languageResources[section];
  return resource?.[lang]?.[key] || key;
}

export const useTranslation = <T extends keyof LanguageResources>(section: T) => {
  const [lang, setLang] = useState<"ru" | "en">("ru")

  return {
  }
}