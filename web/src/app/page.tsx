'use client';
import CroissantMap from '../components/CroissantMap';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import AddCroissantForm from '../components/AddCroissantForm';

export default function Home() {
  const { t } = useTranslation();
  return (
    <main className="flex flex-col items-center p-4 gap-4">
      <LanguageSwitcher />
      <h1 className="text-2xl font-bold">{t('map.title')}</h1>
      <CroissantMap />
      <AddCroissantForm />
    </main>
  );
}
