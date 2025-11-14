import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  Button,
  Alert,
  View,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  CameraPermissionStatus,
  useCodeScanner,
} from 'react-native-vision-camera';

function Cam({ onClose }: { onClose: () => void }) {
  const device = useCameraDevice('back');
  const [permission, setPermission] = useState<CameraPermissionStatus>('not-determined');
  const [isActive, setIsActive] = useState(true);

  const codeScanner = useCodeScanner({
    // Selecionei apenas QR codes, códigos de barras EAN-13 e EAN-8.
    // Existem outros tipos de códigos suportados, veja a documentação oficial
    // aqui: https://react-native-vision-camera.com/docs/guides/code-scanning
    codeTypes: ['qr', 'ean-13', 'ean-8'],
    onCodeScanned: (codes) => {
      setIsActive(false);
      console.log(`Scanned ${codes.length} codes!`, codes);
      const title = codes.length === 1 ? 'Código digitalizado' : `Códigos digitalizados (${codes.length})`;
      Alert.alert(
        title,
        codes.map((code, index) => `\n${index + 1}. Tipo: ${code.type}, Dado: ${code.value}`).join('\n'),
        [
          {
            text: 'Ok',
            onPress: () => {
              onClose();
            },
          },
        ],
      );
    },
  });

  useEffect(() => {
    async function getPermission() {
      const status = await Camera.requestCameraPermission();
      setPermission(status);
    }
    getPermission();
  }, []);

  if (permission !== 'granted') {
    return (
      <>
        <Text>Sem permissão para câmera</Text>
        <Button
          title="Pedir permissão para acessar câmera"
          onPress={async () => {
            const status = await Camera.requestCameraPermission();
            setPermission(status);
          }}
        />
      </>
    );
  }

  if (device == null) return <Text>Nenhum dispositivo de câmera encontrado</Text>;

  // Renderiza a câmera e o overlay de texto e botão "Fechar"
  return isActive ? (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        codeScanner={codeScanner}
      />
      {/* Overlay texto e botão */}
      <View style={styles.overlayContainer}>
        <Text style={styles.overlayText}>Foque em algum QR Code{'\n'}ou Código de Barras...</Text>
        <Button title="Fechar sem ler código" onPress={() => {
          setIsActive(false);
          onClose();
        }} />
      </View>
    </>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    padding: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlayText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
    textAlign: 'center',
  },
});

export default Cam;
