'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useTranslation } from 'react-i18next';

export default function ProfilePage() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState<string[]>([]);
  const [liked, setLiked] = useState<string[]>([]);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('submitted_croissants, liked_items, badges')
        .eq('id', 'current')
        .single();
      if (data) {
        setSubmitted(data.submitted_croissants || []);
        setLiked(data.liked_items || []);
        setBadges(data.badges || []);
      }
    };

    fetchData();
  }, []);

  const renderList = (title: string, items: string[]) => (
    <section>
      <h2 className="font-semibold">{title}</h2>
      <ul className="list-disc list-inside">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </section>
  );

  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">{t('profile.title')}</h1>
      {renderList(t('profile.submitted'), submitted)}
      {renderList(t('profile.liked'), liked)}
      {renderList(t('profile.badges'), badges)}
    </main>
  );
}
