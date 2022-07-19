import React, { createContext, useContext, useMemo, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider, signInWithCredential, onAuthStateChanged, signOut } from '@firebase/auth';

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  // const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: '832839594080-62ooe4picq0cd54e85f6d19tn1jsiltr.apps.googleusercontent.com',
    },
  );

  if (response?.type === 'success') {
    const { id_token } = response.params;

    const provider = GoogleAuthProvider.credential(id_token);
    signInWithCredential(auth, provider);
  }

  const logout = () => {
    signOut(auth).catch((error) => console.log("error ---> ", error))
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoadingInitial(false);
    })
  }, []);
  
  return (
    <AuthContext.Provider value={{
      user,
      promptAsync,
      logout
    }}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export default function userAuth() {
  return useContext(AuthContext);
}