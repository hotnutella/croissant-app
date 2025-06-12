import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
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
    <View style={{ gap: 8 }}>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={{ borderWidth: 1, padding: 4 }} />
      <TextInput placeholder="Lat" value={lat} onChangeText={setLat} style={{ borderWidth: 1, padding: 4 }} />
      <TextInput placeholder="Lng" value={lng} onChangeText={setLng} style={{ borderWidth: 1, padding: 4 }} />
      <Button title="Add" onPress={handleSubmit} />
    </View>
  );
}
