import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Chat from '../screens/Chat';
import Login from '../screens/Login';
import Modal from '../screens/Modal';
import Match from '../screens/Match';
import Message from '../screens/Message';

import userAuth from '../hooks/userAuth';

const Stack = createNativeStackNavigator();

function Router() {
    const { user } = userAuth();
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ?
                    <>
                        <Stack.Group>
                            <Stack.Screen name="Home" component={Home} />
                            <Stack.Screen name="Chat" component={Chat} />
                            <Stack.Screen name="Message" component={Message} />
                        </Stack.Group>
                        <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
                            <Stack.Screen name="Modal" component={Modal} />
                        </Stack.Group>
                        <Stack.Group screenOptions={{ presentation: 'transparentModal', headerShown: false }}>
                            <Stack.Screen name="Match" component={Match} />
                        </Stack.Group>
                    </>
                    :
                    <Stack.Screen name="Login" component={Login} />
                }
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Router;