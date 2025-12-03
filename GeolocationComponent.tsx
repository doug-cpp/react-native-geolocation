import React, { use, useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  Button,
  Alert,
  View,
  PermissionsAndroid,
  Platform,
  useColorScheme,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

function GeoComponent() {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode ? 'white' : 'black';
  const containerBgColor = isDarkMode ? '#222' : 'whitesmoke';
  const locationContainerBgColor = isDarkMode ? '#444' : 'white';
  const [location, setLocation] = useState<any>(null);
  const [watching, setWatching] = useState(false);
  const [watchId, setWatchId] = useState<any>(null);
  const [watchCount, setWatchCount] = useState(0);

  useEffect(() => {
    getCurrentLocation();
  }, []);


  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Permissão de Localização',
            message: 'Este app precisa acessar sua localização.',
            buttonNeutral: 'Perguntar depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Erro', 'Permissão de localização negada');
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position.coords);
        console.log('Nova posição:', position.coords);
      },
      (error) => Alert.alert('Erro', `Falha: ${error.message}`),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const startTracking = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    const id = Geolocation.watchPosition(
      (position) => {
        setLocation(position.coords);
        setWatchCount((count) => count + 1);
        console.log('Rastreamento:', position.coords);
      },
      (error) => console.log('Erro tracking:', error),
      { enableHighAccuracy: true, distanceFilter: 0, interval: 1000 }
    );

    setWatchId(id);
    setWatching(true);
  };

  const stopTracking = () => {
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
      setWatchId(null);
      setWatching(false);
      setWatchCount(0);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: containerBgColor }]}>
      <Text style={[styles.title, { color: textColor }]}>POC Geolocation</Text>
      
        <View style={[styles.locationContainer, { backgroundColor: locationContainerBgColor }]}>
          {location ? (
            <>
              <Text style={[styles.label, { color: textColor }]}>📍 Localização Atual:</Text>
              <Text style={[styles.coord, { color: textColor }]}>Latitude: {location.latitude?.toFixed(6)}</Text>
              <Text style={[styles.coord, { color: textColor }]}>Longitude: {location.longitude?.toFixed(6)}</Text>
              <Text style={[styles.coord, { color: textColor }]}>Altitude: {location.altitude?.toFixed(2)} m</Text>
              <Text style={[styles.coord, { color: textColor }]}>Velocidade: {location.speed?.toFixed(2)} km/h</Text>
              <Text style={[styles.coord, { color: textColor }]}>Precisão: {location.accuracy?.toFixed(2)} m</Text>
              <Text style={[styles.tracking, { color: textColor, opacity: 0.5 }]}>{ watching ? `Rastreando continuamente... (${watchCount})` : '' }</Text>
            </>
          ) : (
          <Text style={[styles.noLocation, { color: textColor, opacity: 0.5 }]}>Aguarde...</Text>
          )}


        </View>
            <View style={styles.buttonContainer}>
        <Button title="📍 Obter Posição Atual" onPress={getCurrentLocation} />
        
        {watching ? (
          <Button title="⏹️ Parar Rastreamento" onPress={stopTracking} />
        ) : (
          <Button title="▶️ Iniciar Rastreamento" onPress={startTracking} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  locationContainer: {
    padding: 20,
    paddingBottom: 12,
    paddingTop: 32,
    width: '80%',
    height: '38%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
    minWidth: 250,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 10,
  },
  coord: {
    fontSize: 16,
    marginVertical: 2,
  },
  tracking: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 0,
    fontStyle: 'italic',
    textAlign: 'right',
  },
  noLocation: {
    fontSize: 18,
    color: '#999',
    marginBottom: 30,
  },
  buttonContainer: {
    gap: 16,
    width: '70%',
  },
});

export default GeoComponent;
