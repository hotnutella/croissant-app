'use client';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CroissantCard from '../../components/CroissantCard';
import { getTopCroissantsOfWeek } from '../../services/croissants';

interface Croissant {
  id: string;
  name: string;
  like_count: number;
}

export default function TopPage() {
  const { t } = useTranslation();
  const [croissants, setCroissants] = useState<Croissant[]>([]);

  useEffect(() => {
    getTopCroissantsOfWeek().then(setCroissants).catch(console.error);
  }, []);

  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">{t('top.title')}</h1>
      {croissants.map((c) => (
        <CroissantCard key={c.id} croissantId={c.id} name={c.name} />
      ))}
    </main>
  );
}
