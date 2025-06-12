import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';
import en from './locales/en/translation.json';
import ru from './locales/ru/translation.json';
import uk from './locales/uk/translation.json';
import fr from './locales/fr/translation.json';

const resources = {
  en: { translation: en },
  ru: { translation: ru },
  uk: { translation: uk },
  fr: { translation: fr },
};

const availableLanguages = Object.keys(resources);
const deviceLanguage =
  Localization.getLocales?.()[0]?.languageCode ||
  Localization.locale.split('-')[0];

const lng = availableLanguages.includes(deviceLanguage)
  ? deviceLanguage
  : 'en';

i18n.use(initReactI18next).init({
  resources,
  lng,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
