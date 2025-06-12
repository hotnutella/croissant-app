import { View, Text, Switch } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNotificationSettings } from '@/hooks/useNotificationSettings';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { enabled, setEnabled } = useNotificationSettings();

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        {t('settings.title')}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text>{t('notifications.enable')}</Text>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>
    </View>
  );
}
