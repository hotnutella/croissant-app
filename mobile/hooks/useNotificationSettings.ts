import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'notifications-enabled';

export function useNotificationSettings() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(KEY).then(value => {
      if (value !== null) {
        setEnabled(value === 'true');
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(KEY, String(enabled));
  }, [enabled]);

  return { enabled, setEnabled };
}
