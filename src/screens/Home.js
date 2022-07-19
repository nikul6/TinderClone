import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import userAuth from '../hooks/userAuth'
import { useNavigation } from '@react-navigation/native';
import { Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import Swiper from 'react-native-deck-swiper';
import { getFirestore, onSnapshot, doc, setDoc, collection, getDocs, query, where, getDoc } from '@firebase/firestore';
import generatedId from '../lib/generatedId';

export default function Home() {
  const { user, logout } = userAuth();
  const navigation = useNavigation();
  const swipeRef = useRef(null);
  const [profiles, setProfiles] = useState([]);
  const db = getFirestore();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
    onSnapshot(doc(db, 'users', user.uid), snapshot => {
      if (!snapshot.exists()) {
        navigation.navigate('Modal');
      }
    })
  })

  useEffect(() => {
    let unsub;
    const fetchCard = async () => {
      const passes = await getDocs(collection(db, 'users', user.uid, 'passes')).then((snapshot) => snapshot.docs.map((doc) => doc.id));
      const swipes = await getDocs(collection(db, 'users', user.uid, 'swipes')).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ['test'];
      const swipedUserIds = swipes.length > 0 ? swipes : ['test'];

      unsub = onSnapshot(query(collection(db, 'users'), where('id', 'not-in', [...passedUserIds, ...swipedUserIds])), snapshot => {
        setProfiles(snapshot.docs.filter(doc => doc.id !== user.uid).map((doc) => ({
          id: doc.id,
          ...doc.data()
        })))
      })
    }
    fetchCard();
    return unsub;
  }, [])

  const swipeLeft = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log("swipe left ", userSwiped.displayName);
    setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id), userSwiped)
  }

  const swipeRight = async (cardIndex) => {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];

    const loggedInProfile = await (await getDoc(doc(db, 'users', user.uid))).data();

    getDoc(doc(db, 'users', userSwiped.id, 'swipes', user.uid)).then((documentSnapshot) => {
      if (documentSnapshot.exists()) {
        console.log("match ", userSwiped.displayName);
        setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped);
        setDoc(doc(db, 'matches', generatedId(user.uid, userSwiped.id)), {
          users: {
            [user.uid]: loggedInProfile,
            [userSwiped.id]: userSwiped,
          },
          userMatched: [user.uid, userSwiped.id],
          timestamp: new Date()
        });
        navigation.navigate('Match', {
          loggedInProfile,
          userSwiped
        });
      } else {
        console.log("swipe right ", userSwiped.displayName);

        setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped);
      }
    })
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? 25 : 0 }}>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={logout} >
          <Image source={{ uri: user.photoURL }} style={{ height: 40, width: 40, borderRadius: 40 / 2 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Modal')}>
          <Image source={require('../../logo.png')} style={{ height: 50, width: 50 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons name="chatbubbles" size={30} color="#ff5864" />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1, marginTop: 5 }}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: 'transparent' }}
          cards={profiles}
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  textAlign: 'right',
                  color: 'green'
                }
              }
            },
            right: {
              title: 'Match',
              style: {
                label: {
                  // textAlign:'left',
                  color: 'green'
                }
              }
            }
          }}
          backgroundColor={'#4fd0e9'}
          onSwipedLeft={(cardIndex) => { console.log("left"), swipeLeft(cardIndex) }}
          onSwipedRight={(cardIndex) => { console.log("right"), swipeRight(cardIndex) }}
          renderCard={(card) => card ? (
            <View style={styles.cardConatiner}>
              <Image source={{ uri: card.pic }} style={styles.cardImage} />
              <View style={styles.cardShedow}>
                <View>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{card.displayName}</Text>
                  <Text>{card.job}</Text>
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{card.age}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.cardConatiner}>
              <Text>No profiles</Text>
            </View>
          )
          }
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          stackSize={5}>
        </Swiper>
      </View>
      <View style={styles.bottomConatiner}>
        <TouchableOpacity style={[styles.bottomIocn, { backgroundColor: '#EF9F9F' }]} onPress={() => swipeRef.current.swipeLeft()}>
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.bottomIocn, { backgroundColor: '#B4E197' }]} onPress={() => swipeRef.current.swipeRight()}>
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', position: 'relative',
    margin: 5
  },
  cardConatiner: {
    backgroundColor: '#fff', height: 500, borderRadius: 15
  },
  cardImage: {
    position: 'absolute', top: 0, height: '100%', width: '100%', borderRadius: 15
  },
  cardShedow: {
    position: 'absolute', bottom: 0, backgroundColor: '#fff', height: 50, width: '100%', flexDirection: 'row', justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  bottomIocn: {
    justifyContent: 'center', alignItems: 'center', height: 60, width: 60, borderRadius: 60 / 2, backgroundColor: '#EF9F9F'
  },
  bottomConatiner: {
    flexDirection: 'row', justifyContent: 'space-evenly'
  }
});