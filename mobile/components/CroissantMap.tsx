import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Button } from 'react-native';
import { useTranslation } from 'react-i18next';

export default function CroissantMap() {
  const { t } = useTranslation();
  const region = {
    latitude: 48.8584,
    longitude: 2.2945,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        <Marker coordinate={region} title="Eiffel Croissant" description="🥐" />
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
