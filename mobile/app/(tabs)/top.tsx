import { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import CroissantCard from '@/components/CroissantCard';
import { getTopCroissantsOfWeek } from '@/services/croissants';
import { ThemedText } from '@/components/ThemedText';

interface Croissant {
  id: string;
  name: string;
  like_count: number;
}

export default function TopScreen() {
  const { t } = useTranslation();
  const [list, setList] = useState<Croissant[]>([]);

  useEffect(() => {
    getTopCroissantsOfWeek().then(setList).catch(console.error);
  }, []);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <ThemedText type="title">{t('top.title')}</ThemedText>
      <View style={{ marginTop: 8 }}>
        {list.map((c) => (
          <CroissantCard key={c.id} croissantId={c.id} name={c.name} />
        ))}
      </View>
    </ScrollView>
  );
}
