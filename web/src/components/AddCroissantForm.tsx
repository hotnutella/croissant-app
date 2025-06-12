'use client';
import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function AddCroissantForm() {
  const [name, setName] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleSubmit = async () => {
    if (!name || !lat || !lng) return;
    await supabase.from('croissant_locations').insert({
      name,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    });
    setName('');
    setLat('');
    setLng('');
  };

  return (
    <div className="flex flex-col gap-2">
      <input className="border p-1" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="border p-1" placeholder="Lat" value={lat} onChange={(e) => setLat(e.target.value)} />
      <input className="border p-1" placeholder="Lng" value={lng} onChange={(e) => setLng(e.target.value)} />
      <button className="bg-blue-500 text-white px-2 py-1" onClick={handleSubmit}>Add</button>
    </div>
  );
}
