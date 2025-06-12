import { useEffect } from 'react';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import i18n from '@/i18n';
import { useNotificationSettings } from './useNotificationSettings';

const CROISSANT_LOCATIONS = [
  { id: 'eiffel', latitude: 48.8584, longitude: 2.2945 },
];

export function useProximityNotifications() {
  const { enabled } = useNotificationSettings();

  useEffect(() => {
    if (!enabled) return;

    let subscription: Location.LocationSubscription;
    const notified = new Set<string>();

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      await Notifications.requestPermissionsAsync();

      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, distanceInterval: 100 },
        ({ coords }) => {
          CROISSANT_LOCATIONS.forEach(loc => {
            if (!notified.has(loc.id)) {
              const dist = Location.getDistance(
                { latitude: coords.latitude, longitude: coords.longitude },
                { latitude: loc.latitude, longitude: loc.longitude }
              );
              if (dist < 200) {
                notified.add(loc.id);
                Notifications.scheduleNotificationAsync({
                  content: {
                    title: i18n.t('notifications.nearbyTitle'),
                    body: i18n.t('notifications.nearbyMessage'),
                  },
                  trigger: null,
                });
              }
            }
          });
        }
      );
    })();

    return () => {
      subscription?.remove();
    };
  }, [enabled]);
}
