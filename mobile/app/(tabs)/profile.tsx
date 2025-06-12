import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/supabaseClient';

export default function ProfileScreen() {
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
    <View style={{ marginBottom: 12 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
      {items.map((item, idx) => (
        <Text key={idx}>{item}</Text>
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 }}>
        {t('profile.title')}
      </Text>
      {renderList(t('profile.submitted'), submitted)}
      {renderList(t('profile.liked'), liked)}
      {renderList(t('profile.badges'), badges)}
    </View>
  );
}
