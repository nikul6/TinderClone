import { SafeAreaView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native';
import ChatList from '../components/ChatList';
import userAuth from '../hooks/userAuth';

export default function Chat() {
  const { user } = userAuth();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  })

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  )
}