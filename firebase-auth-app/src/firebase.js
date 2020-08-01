import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { functions } from "firebase";

const firebaseConfig={
    apiKey: "AIzaSyAQgCk9JBG5h_xJ2Zaoa7UrxOL3EQmo808",
    authDomain: "madweek4.firebaseapp.com",
    databaseURL: "https://madweek4.firebaseio.com",
    projectId: "madweek4",
    storageBucket: "madweek4.appspot.com",
    messagingSenderId: "462146617752",
    appId: "1:462146617752:web:0ca8ec8e02df517ed8ebed",
    measurementId: "G-L4MYBK22B1"
};

firebase.initializeApp(firebaseConfig);
export const auth=firebase.auth();
export const firestore=firebase.firestore();
const provider=new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle=()=>{
    auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, displayName, photoURL } = user;
      try {
        await userRef.set({
          displayName,
          email,
          photoURL,
          ...additionalData
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    }
    return getUserDocument(user.uid);
  };

  const getUserDocument = async uid => {
    if (!uid) return null;
    try {
      const userDocument = await firestore.doc(`users/${uid}`).get();
      return {
        uid,
        ...userDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };
