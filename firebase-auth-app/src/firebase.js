import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/database';
import { functions } from "firebase";
import { navigate } from "@reach/router";

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
//export const firedatabase=firebase.database();
const provider=new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle=()=>{
    auth.signInWithPopup(provider).then(()=>{navigate("calendar");});
};

export const generateUserDocument = async (user, additionalData) => {
    if (!user) return;
    const userRef = firestore.doc(`users/${user.uid}`);
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, displayName} = user;
      try {
        await userRef.set({
          displayName,
          email,
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


  //  const FindFriendUID= async friendemail=>{
  //    console.log(friendemail);
  //    var query= firestore.collection('users').where("email", "==", friendemail);
  //     await query.get().then(function(querySnapshot){
  //     querySnapshot.forEach(function(doc){
  //       return doc.id;
  //       });
  //     });
  //    return null;
  //  };

   function FindFriendUID(friendemail){
     return new Promise(function(resolve,reject){
       var query=firestore.collection('users').where("email", "==", friendemail);
       query.get().then(function(querySnapshot){
         querySnapshot.forEach(function(doc){
           resolve(doc.id);
         });
       });
     });
   }



  export const AddFriendstoFirebase= async(event, user, friendemail) =>{
      if(!user){
        console.log("hihi2");
        return;
      } 
      const userRef = firestore.doc(`users/${user.uid}`);
      console.log(user.uid);
      //console.log(friendemail);
      FindFriendUID(friendemail).then(function(v) {
        var uid=String(v);
        console.log(uid);
        userRef.set({
          FriendsList:{
            [uid] : {friendemail}
          }
        },{merge:true});
      })
    }

    export const newSchedule = async (user, schedule) => {
      if( !getUserDocument(user.uid)) return null;
      try {
        await firestore.doc(`users/${user.uid}/shedule`).add(schedule);
        alert(`일정이 추가되었습니다`);
      } catch(error){
        console.error("Error adding schedule", error);
      }
    }
        

