import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import userAuth from '../hooks/userAuth'
import { useNavigation } from '@react-navigation/native';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import { getFirestore, onSnapshot, collection, query, orderBy } from '@firebase/firestore';

export default function ChatRow({ matchDetails }) {
  const { user } = userAuth();
  const navigation = useNavigation();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState("");
  const db = getFirestore();

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
  }, [matchDetails, user])

  useEffect(() => {
    onSnapshot(query(collection(db, 'matches', matchDetails.id, 'messages'), orderBy('timestamp', 'desc')),
      snapshot => setLastMessage(snapshot.docs[0]?.data()?.message)
    )
  }, [matchDetails, db])

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={() => navigation.navigate('Message', { matchDetails })}>
      <Image source={{ uri: matchedUserInfo?.pic }} style={{ height: 50, width: 50, borderRadius: 50 / 2 }} />
      <View style={{ marginLeft: 20 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{matchedUserInfo?.displayName}</Text>
        <Text style={{ fontSize: 12, fontWeight: '400' }}>{lastMessage || "Say Hi!"}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
});