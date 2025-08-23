import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


export const AppTitle = "Telegram Connect"

const resources = {
  ru: {
    translation: {
      navigation: {
        home: "Главная",
        channels: "Каналы",
        advertisers: "Рекламодатели",
        deals: "Сделки"
      },
      common: {
        save: "Сохранить",
        cancel: "Отмена",
        loading: "Загрузка..."
      }
    },

  },
  en: {
    translation: {
      navigation: {
        home: "Home",
        channels: "Channels", 
        advertisers: "Advertisers",
        deals: "Deals"
      },
      common: {
        save: "Save",
        cancel: "Cancel",
        loading: "Loading..."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
