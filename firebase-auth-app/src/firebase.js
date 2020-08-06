import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/database';
import { functions } from "firebase";
import { navigate } from "@reach/router";
import { List } from "semantic-ui-react";

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
    const MapEmailAndUser=firestore.collection('UserAndEmail').doc('map');
    const snapshot = await userRef.get();
    if (!snapshot.exists) {
      const { email, displayName} = user;
      try {
        await userRef.set({
          displayName,
          email,
          ...additionalData
        });
        await MapEmailAndUser.set({
          map:{
            [email]:user.uid
          }
        },{merge:true});
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

  //friends list 에 있는 email에 해당하는 doc 반환, AddFriendsFirebase에 사용
  //uid 사용하면 doc.id, data 사용하려면 doc.data().email
   export function FindFriendUID(friendemail){
     return new Promise(function(resolve,reject){
       var query=firestore.collection('users').where("email", "==", friendemail);
       query.get().then(function(querySnapshot){
         querySnapshot.forEach(function(doc){
           console.log(doc.data().displayName);
           resolve(doc);
         });
       });
     });
   }

  export const AddGroupFirebase= async(event,user,groupname, names)=>{
    const userRef=firestore.collection(`GroupList`).doc();
    console.log("group"+user.uid);
    userRef.set(
      {groupname :groupname,members:names}
    ,{merge:true});
    AddGroupToUsers(user,groupname)
  }

  export function FindGroupUID(groupname){
    return new Promise(function(resolve,reject){
      var query=firestore.collection('GroupList').where("groupname","==", groupname);
      query.get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          //console.log(doc.data());
          resolve(doc);
        });
      });
    });
  }

  const AddGroupToUsers=async(user,groupname)=>{
      FindGroupUID(groupname).then(function(v){
        var GroupUid=v.id;
        var Members=v.data().members;
        //console.log(v.id);
        var ListOfMembers=[];
        for (var i=0; i<Members.length; i++){
          ListOfMembers.push(Members[i].email);
        }
        console.log(ListOfMembers); //멤버의 email 주소만 저장
        firestore.collection('users/')
        for (var i=0; i<ListOfMembers.length;i++){
           FindFriendUID(ListOfMembers[i]).then(function(u){
            var uid=u.id;
            firestore.doc(`users/${uid}`).set({
              MyGroup:{
                [groupname]: GroupUid
              }
            },{merge:true});
          })
        }
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
        var uid=String(v.id);
        var displayname = v.data().displayName;
        console.log(uid);
        userRef.set({
          FriendsList:{
            [friendemail] : {uid}
          }
        },{merge:true});
      })
    }

  export const addSchedule = async (user, title,start_date,start_time,end_date, end_time) => {
      if(!user){
        console.log("hihi2");
        return;
      } 
      try {
        // await firestore.doc(`users/${user.uid}/shedule`).add(schedule);
        const userRef = firestore.doc(`users/${user.uid}`).collection(`events`);

        console.log("checking" + userRef);
        userRef.add({
          title: title,
          start: start_date+`T`+start_time,
          end : end_date+ `T` +end_time
        })

        alert(`일정이 추가되었습니다`);
      } catch(error){
        console.error("Error adding schedule", error);
      }
    }


  export const GetFriendsList=async(user)=>{
    return new Promise(function(resolve, reject){
      firestore.doc(`users/${user.uid}`).onSnapshot(function(doc){
        var map=doc.data().FriendsList;
        if(map!=null){
          var current =Object.keys(map);
          resolve(current);
        }
        
      });
    });
  }

  export function GetGroupList(user){
    return new Promise(function(resolve,reject){
      firestore.doc(`users/${user.uid}`).onSnapshot(function(doc){
        var map=doc.data().MyGroup;
        if(map !=null){
          var GroupName=Object.keys(map);
          resolve(GroupName);
        }
        
      })
    });
  }

  export const GetDetailOfGroup=async(user)=>{
    GetGroupList(user).then(function(v){
      console.log(v);
      var sample=[];
      for (var i=0; i<v.length; i++){
        FindGroupUID(v[i]).then(function(u){
          //console.log(u.data());
          sample.push(u.data().groupname);
        });
      };
      return sample;
    });
    
  }
        

    export const getSchedule = async uid => {
      const result = new Array();
      var jsonData;
      var json = new Object();

      if (!uid) return null;
      try {
        const userDocument =  await firestore.doc(`users/${uid}`).collection(`events`).get().then(function(querySnapshot){
          querySnapshot.forEach(function(doc){
            var data = new Object();
            data.title = doc.data().title;
            data.start = doc.data().start;
            data.end = doc.data().end;
            data.color = doc.data().backgroundColor;
            console.log(doc.id ," =>",doc.data().title);
            result.push(data);
          })
          json.events = result;
          jsonData = JSON.stringify(json);
          console.log(json);
          console.log(jsonData);
        });
        return {
          json
        };
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };
