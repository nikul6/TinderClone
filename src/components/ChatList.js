import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFirestore, onSnapshot, collection, query, where } from '@firebase/firestore';
import userAuth from '../hooks/userAuth'
import ChatRow from './ChatRow';

export default function ChatList() {
    const [matches, setMatches] = useState([]);
    const { user } = userAuth();
    const db = getFirestore();

    useEffect(() => {
        onSnapshot(query(collection(db, 'matches'), where('userMatched', 'array-contains', user.uid)), snapshot => {
            setMatches(snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })))
        })
    }, [user])

    return matches.length > 0 ? (
        <FlatList
            data={matches}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ChatRow matchDetails={item} />}
        />
    ) : (
        <View>
            <Text>No macthes as the moments</Text>
        </View>
    )
}