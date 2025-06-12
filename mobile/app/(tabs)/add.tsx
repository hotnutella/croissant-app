import { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/supabaseClient';

export default function AddCroissant() {
  const { t } = useTranslation();
  const [photo, setPhoto] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState({ butter: '', crunch: '', price: '', vibe: '' });
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
    });
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, quality: 0.7 });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const submit = async () => {
    if (!location || !photo) return;
    const photoPath = `croissants/${Date.now()}.jpg`;
    const photoData = await fetch(photo);
    const blob = await photoData.blob();
    await supabase.storage.from('croissants').upload(photoPath, blob);
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
    <View style={{ flex: 1, padding: 16 }}>
      <Text className="text-xl font-bold mb-2">{t('map.addCroissant')}</Text>
      {photo && <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />}
      <Button title={t('form.photo')} onPress={pickImage} />
      <TextInput placeholder={t('form.name')} value={name} onChangeText={setName} className="border p-2 mt-2" />
      {['butter', 'crunch', 'price', 'vibe'].map((key) => (
        <TextInput
          key={key}
          placeholder={t(`card.${key}`)}
          value={(ratings as any)[key]}
          onChangeText={(val) => setRatings((r) => ({ ...r, [key]: val }))}
          keyboardType="numeric"
          className="border p-2 mt-2"
        />
      ))}
      <TextInput
        placeholder={t('form.comment')}
        value={comment}
        onChangeText={setComment}
        className="border p-2 mt-2"
      />
      <Button title={t('form.submit')} onPress={submit} />
    </View>
  );
}

