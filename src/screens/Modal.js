import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import userAuth from '../hooks/userAuth';
import { getFirestore, doc, setDoc } from '@firebase/firestore';

export default function Modal() {

    const { user } = userAuth();
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [job, setJob] = useState(null);
    const [age, setAge] = useState(null);
    const db = getFirestore();

    const inCompleteForm = !image || !job || !age;

    const updateProfile = () => {
        setDoc(doc(db, 'users', user.uid), {
            id: user.uid,
            displayName: 'dfdf',
            pic: image,
            job: job,
            age: age,
            timestamp: new Date()
        })
            .then(() => navigation.navigate('Home'))
            .catch((error) => console.log("error ---> ", error))
    }

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={{ uri: 'https://1000logos.net/wp-content/uploads/2018/07/Tinder-logo.png' }} resizeMode="contain" style={{ height: 100, width: '100%' }} />
            <Text style={{ fontSize: 20, color: 'gray' }}>Welcome {user.providerData[0].displayName}</Text>
            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '400', color: 'red', marginTop: 10 }}>Step 1: The profile pic</Text>
            <TextInput
                style={{ marginTop: 10 }}
                placeholder='Enter profile pic url here'
                value={image}
                onChangeText={setImage}
            />
            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '400', color: 'red', marginTop: 10 }}>Step 2: The job</Text>
            <TextInput
                style={{ marginTop: 10 }}
                placeholder='Enter a job'
                value={job}
                onChangeText={setJob}
            />
            <Text style={{ textAlign: 'center', fontSize: 15, fontWeight: '400', color: 'red', marginTop: 10 }}>Step 1: The age</Text>
            <TextInput
                style={{ marginTop: 10 }}
                placeholder='Enter your age'
                maxLength={2}
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
            />
            <TouchableOpacity disabled={inCompleteForm} onPress={updateProfile} style={{ flex: 1, position: 'absolute', bottom: 50, backgroundColor: inCompleteForm ? 'gray' : '#EF9F9F', padding: 10, borderRadius: 10 }}>
                <Text style={{ textAlign: 'center', color: '#fff', fontSize: 15 }}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    )
}