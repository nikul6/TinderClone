import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, Foundation } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Header({ title, callEnabled }) {
    const navigation = useNavigation();
    return (
        <View style={styles.mainContainer}>
            <View style={styles.iconConatiner}>
                <TouchableOpacity style={styles.arrowConatiner} onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-outline" size={34} color="#ff5864" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title}</Text>
            </View>

            {callEnabled && (
                <TouchableOpacity style={styles.callConatiner}>
                    <Foundation name="telephone" size={20} color="red" />
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', margin: 5
    },
    iconConatiner: {
        flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8
    },
    arrowConatiner: {
        padding: 5
    },
    callConatiner: {
        backgroundColor: '#EF9F9F',
        padding: 10,
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        justifyContent: 'center',
        alignItems: 'center'
    }
});