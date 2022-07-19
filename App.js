import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Router from './src/navigation/Router';
import { AuthProvider } from './src/hooks/userAuth';
import { initializeApp } from 'firebase/app';

export default function App() {

  const firebaseConfig = {
    apiKey: "AIzaSyAEWnyCCQliwgGWx4GhTaqdmMwmIH2juv0",
    authDomain: "tinderclone-d4373.firebaseapp.com",
    projectId: "tinderclone-d4373",
    storageBucket: "tinderclone-d4373.appspot.com",
    messagingSenderId: "832839594080",
    appId: "1:832839594080:web:7f594b51d1e083b31d9305",
    measurementId: "G-ZYGZ7FLW0V"
  };

  initializeApp(firebaseConfig);

  return (
    <AuthProvider>
      <View style={styles.container}>
        <Router />
      </View>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
