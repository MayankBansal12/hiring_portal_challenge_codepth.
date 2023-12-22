import React, { createContext, useContext } from 'react';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_DOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGE,
    messagingSenderId: import.meta.env.VITE_SENDERID,
    appId: import.meta.env.VITE_APPID,
    measurementId: import.meta.env.VITE_MEASUREMENT
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

    // For signup in case of new user
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // For logging in
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    return (
        <FirebaseContext.Provider value={{ signup, login }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
