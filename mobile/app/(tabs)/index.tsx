import { View, Text } from 'react-native';
import CroissantMap from '@/components/CroissantMap';
import { useTranslation } from 'react-i18next';
import { useProximityNotifications } from '@/hooks/useProximityNotifications';

export default function HomeScreen() {
  const { t } = useTranslation();
  useProximityNotifications();
  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 16 }}>
        {t('map.title')}
      </Text>
      <CroissantMap />
    </View>
  );
}
