"use client";
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';
import { supabase } from '../supabaseClient';

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

const icon = divIcon({ html: '🥐', className: '', iconSize: [24, 24] });

export default function CroissantMap() {
  const position: LatLngExpression = [48.8584, 2.2945];
  const { t } = useTranslation();
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await supabase.from('croissant_locations').select('*');
      if (data) setLocations(data as Location[]);
    };
    fetchLocations();
  }, []);

  return (
    <MapContainer center={position} zoom={13} style={{ height: '60vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {locations.map((loc) => (
        <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={icon}>
          <Popup>
            <div className="flex flex-col">
              <strong>{loc.name}</strong>
              <button className="mt-2 bg-blue-500 text-white px-2 py-1 rounded">{t('map.go')}</button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
