import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useLayoutEffect } from 'react'
import userAuth from '../hooks/userAuth';
import { useNavigation } from '@react-navigation/native';

export default function Login() {

  const navigation = useNavigation();
  const { promptAsync } = userAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  })

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={{ uri: 'https://tinder.com/static/tinder.png' }} resizeMode="cover" style={{ flex: 1 }}>
        <TouchableOpacity style={styles.loginButton} onPress={() => {
          promptAsync();
        }}>
          <Text style={{ textAlign: 'center' }}>Sign in & get swiping</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  loginButton: {
    position: 'absolute', bottom: 80, backgroundColor: '#fff', borderRadius: 10, width: 50, marginHorizontal: '30%', justifyContent: 'center'
  },
});