import { View, SafeAreaView, TextInput, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, FlatList, Dimensions } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Header from '../components/Header';
import { useNavigation, useRoute } from '@react-navigation/native';
import userAuth from '../hooks/userAuth'
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import SenderMessage from '../components/SenderMessage';
import ReciverMessage from '../components/ReciverMessage';
import { getFirestore, onSnapshot, collection, query, addDoc, orderBy } from '@firebase/firestore';

export default function Message(props) {

    const navigation = useNavigation();
    const { user } = userAuth();
    const { params } = useRoute();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const { matchDetails } = params;
    const db = getFirestore();

    useEffect(() => {
        onSnapshot(query(collection(db, 'matches', matchDetails.id, 'messages'), orderBy('timestamp', 'desc')),
            snapshot => setMessages(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        )
    }, [matchDetails, db])

    const sendMessage = () => {
        addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
            timestamp: new Date(),
            userId: user.uid,
            displayName: user.displayName,
            pic: matchDetails.users[user.uid].pic,
            message: input
        })
        setInput("");
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title={getMatchedUserInfo(matchDetails.users, user.uid).displayName} callEnabled />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={10}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList
                        data={messages}
                        style={{ flex: 1, margin: 5 }}
                        inverted={-1}
                        keyExtractor={item => item.id}
                        renderItem={({ item: message }) =>
                            message.userId === user.uid ? (
                                <SenderMessage key={message.id} message={message} />
                            ) : (
                                <ReciverMessage key={message.id} message={message} />
                            )
                        }
                    />
                </TouchableWithoutFeedback>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', margin: 10 }}>
                    <TextInput
                        style={{ height: 40, fontSize: 15, padding: 5, width: Dimensions.get('window').width - 70 }}
                        placeholder='Send Message...'
                        value={input}
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                    />
                    <Button onPress={sendMessage} title='Send' color='#ff5864' />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}