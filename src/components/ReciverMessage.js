import { View, Text, Image } from 'react-native'
import React from 'react'

export default function ReciverMessage({ message }) {
  return (
    <View style={{ alignSelf: 'flex-start', flexDirection: 'row', marginLeft: 10, justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
      <Image source={{ uri: message.pic }} style={{ height: 50, width: 50, borderRadius: 50 / 2 }} />
      <View style={{ backgroundColor: '#EF9F9F', borderRadius: 5, alignSelf: 'flex-start', padding: 10, marginLeft: 5, borderTopLeftRadius: 0 }}>
        <Text style={{ color: '#fff', fontSize: 15 }}>{message.message}</Text>
      </View>
    </View>
  )
}