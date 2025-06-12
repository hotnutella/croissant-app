import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export default function CroissantMap() {
  const { t } = useTranslation();
  const region = {
    latitude: 48.8584,
    longitude: 2.2945,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const { data } = await supabase.from('croissant_locations').select('*');
      if (data) setLocations(data as Location[]);
    };
    fetchLocations();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        {locations.map((loc) => (
          <Marker key={loc.id} coordinate={{ latitude: loc.lat, longitude: loc.lng }} title={loc.name} description="🥐" />
        ))}
      </MapView>
      <Button title={t('map.go')} onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
