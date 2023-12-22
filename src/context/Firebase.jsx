import React, { createContext, useContext } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, orderBy, collection, query, where, getDocs } from 'firebase/firestore';
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

export const db = getFirestore(app);

export const auth = getAuth(app);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

    // Fetch data from db
    const getData = () => {
        const ref = query(collection(db, "jobs"));
        const q = query(ref, orderBy("posted", "desc"));
        return getDocs(q);
    }

    // Make custom req based on query
    const searchData = (search) => {
        const ref = query(collection(db, "jobs"));
        const q = query(ref, where("type", "==", search.type), where("title", "==", search.title), where("experience", "==", search.experience), where("location", "==", search.location), orderBy("posted", "desc"))
        return getDocs(q);
    }

    // For signup in case of new user
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // For logging in
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    // log out user
    const logout = () => {
        return signOut(auth);
    }

    return (
        <FirebaseContext.Provider value={{ signup, login, logout, getData, searchData }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}
