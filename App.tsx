import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  useColorScheme,
  StatusBar,
  Button,
  View
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import GeoComponent from './GeolocationComponent';


function AppContent() {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = isDarkMode ? 'white' : 'black';
  const [showGeo, setShowGeo] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={{ color: textColor, fontSize: 24 }}>Android POC</Text>
      <Text style={{ color: textColor, fontSize: 16, marginBottom: 20 }}>
        Obter localização usando o dispositivo
      </Text>
      {showGeo ? (
        <View style={{ flex: 1, width: '100%' }}>
          <GeoComponent />
          <Button title="Fechar" onPress={() => setShowGeo(false)} />
        </View>
      ) : (
        <Button title="Iniciar geolocalização" onPress={() => setShowGeo(true)} />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
