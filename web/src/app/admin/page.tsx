'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useTranslation } from 'react-i18next';

interface Submission {
  id: number;
  name: string;
  comment: string;
  photo_url: string;
  butter: string;
  crunch: string;
  price: string;
  vibe: string;
}

export default function AdminPage() {
  const { t } = useTranslation();
  const [items, setItems] = useState<Submission[]>([]);
  const fetchItems = async () => {
    const { data } = await supabase
      .from('croissant_submissions')
      .select('*')
      .eq('approved', false);
    setItems(data || []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const approve = async (id: number) => {
    await supabase.from('croissant_submissions').update({ approved: true }).eq('id', id);
    fetchItems();
  };

  const remove = async (id: number) => {
    await supabase.from('croissant_submissions').delete().eq('id', id);
    fetchItems();
  };

  return (
    <main className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">{t('admin.title')}</h1>
      {items.map((s) => (
        <div key={s.id} className="border p-2 flex gap-2">
          <img src={supabase.storage.from('croissants').getPublicUrl(s.photo_url).data.publicUrl} className="w-20 h-20 object-cover" />
          <div className="flex-1">
            <p className="font-semibold">{s.name}</p>
            <p className="text-sm">{s.comment}</p>
          </div>
          <button className="bg-green-500 text-white px-2" onClick={() => approve(s.id)}>
            {t('admin.approve')}
          </button>
          <button className="bg-red-500 text-white px-2" onClick={() => remove(s.id)}>
            {t('admin.reject')}
          </button>
        </div>
      ))}
    </main>
  );
}


