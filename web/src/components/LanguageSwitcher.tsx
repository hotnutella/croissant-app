"use client";
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'uk', label: 'UK' },
  { code: 'fr', label: 'FR' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="flex gap-2">
      {languages.map((lng) => (
        <button
          key={lng.code}
          onClick={() => i18n.changeLanguage(lng.code)}
          className="px-2 py-1 border rounded"
        >
          {lng.label}
        </button>
      ))}
    </div>
  );
}
