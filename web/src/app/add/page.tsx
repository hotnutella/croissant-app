'use client';
import { useState, useEffect, ChangeEvent } from 'react';
import { supabase } from '../../supabaseClient';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function AddPage() {
  const { t } = useTranslation();
  const [photo, setPhoto] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState({ butter: '', crunch: '', price: '', vibe: '' });
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
      });
    }
  }, []);

  const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPhoto(file);
  };

  const submit = async () => {
    if (!location || !photo) return;
    const photoPath = `croissants/${Date.now()}_${photo.name}`;
    await supabase.storage.from('croissants').upload(photoPath, photo);
    await supabase.from('croissant_submissions').insert({
      name,
      comment,
      butter: ratings.butter,
      crunch: ratings.crunch,
      price: ratings.price,
      vibe: ratings.vibe,
      latitude: location.latitude,
      longitude: location.longitude,
      photo_url: photoPath,
      approved: false,
    });
    setName('');
    setComment('');
    setRatings({ butter: '', crunch: '', price: '', vibe: '' });
    setPhoto(null);
  };

  return (
    <main className="flex flex-col gap-2 p-4 max-w-md mx-auto">
      <Link href="/">← {t('map.title')}</Link>
      <h1 className="text-xl font-bold">{t('map.addCroissant')}</h1>
      <input type="file" accept="image/*" onChange={handlePhoto} />
      <input className="border p-2" placeholder={t('form.name')!} value={name} onChange={(e) => setName(e.target.value)} />
      {['butter', 'crunch', 'price', 'vibe'].map((key) => (
        <input
          key={key}
          className="border p-2"
          placeholder={t(`card.${key}`)!}
          value={(ratings as any)[key]}
          onChange={(e) => setRatings((r) => ({ ...r, [key]: e.target.value }))}
        />
      ))}
      <textarea className="border p-2" placeholder={t('form.comment')!} value={comment} onChange={(e) => setComment(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2" onClick={submit}>{t('form.submit')}</button>
    </main>
  );
}

