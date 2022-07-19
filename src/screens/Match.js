import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Match() {
    const navigation = useNavigation();
    const { params } = useRoute();
    const { loggedInProfile, userSwiped } = params;

    return (
        <View style={styles.mainContainer}>
            <View style={styles.matchContainer}>
                <Image source={{ uri: 'https://e9digital.com/love-at-first-website/images/its-a-match.png' }} style={styles.tinderMatchImage} resizeMode="center" />
            </View>
            <Text style={styles.matchText}>You and {userSwiped.displayName} have linked each other.</Text>
            <View style={styles.bothContainer}>
                <Image source={{ uri: loggedInProfile.pic }} style={styles.matchImage} />
                <Image source={{ uri: userSwiped.pic }} style={styles.matchImage} />
            </View>
            <TouchableOpacity style={styles.matchButton} onPress={() => { navigation.goBack(); navigation.navigate('Chat'); }}>
                <Text style={styles.msgText}>Send a Message</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.89,
        backgroundColor: '#EF9F9F'
    },
    matchContainer: {
        justifyContent: 'center',
    },
    matchText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '400'
    },
    matchImage: {
        height: 100,
        width: 100,
        borderRadius: 100 / 2,
        marginHorizontal: 10
    },
    matchButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10
    },
    msgText: {
        textAlign: 'center'
    },
    bothContainer: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-around',
        // backgroundColor:'yellow'
    },
    tinderMatchImage: {
        height: 150,
        width: 350
    }
});