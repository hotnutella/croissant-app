"use client";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression, divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTranslation } from 'react-i18next';
import CroissantCard from './CroissantCard';

const icon = divIcon({ html: '🥐', className: '', iconSize: [24, 24] });

export default function CroissantMap() {
  const position: LatLngExpression = [48.8584, 2.2945];
  const { t } = useTranslation();
  return (
    <MapContainer center={position} zoom={13} style={{ height: '60vh', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position} icon={icon}>
        <Popup>
          <CroissantCard croissantId="example-id" name="Eiffel Croissant" />
          <button className="mt-2 bg-blue-500 text-white px-2 py-1 rounded w-full">
            {t('map.go')}
          </button>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
