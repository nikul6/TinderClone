import { View, Text } from 'react-native'
import React from 'react'

export default function SenderMessage({ message }) {
  return (
    <View style={{ backgroundColor: 'purple', borderRadius: 5, alignSelf: 'flex-end', padding: 10, marginRight: 10, marginTop: 2, borderTopRightRadius: 0 }}>
      <Text style={{ color: '#fff', fontSize: 15 }}>{message.message}</Text>
    </View>
  )
}