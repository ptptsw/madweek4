import React, { useContext, useState } from 'react';
import {Image, List, ListItem, ListContent} from 'semantic-ui-react';
import { UserContext } from "../../providers/UserProvider";
import {auth, GetFriendsList,FindFriendUID} from "../../firebase";
import { navigate } from "@reach/router";
import {useCollection,useDocument} from 'react-firebase-hooks/firestore';
import firebase from "firebase/app";

const ListExampleHorizontal = () => {
    const user=useContext(UserContext);
    const [names, setNames]=useState([]);
    const [nextID, setNextID]=useState(1000);
    const [emails, setNextEmails]=useState([]);

    GetFriendsList(user).then(function(v){
        //console.log(v);
        if(names){
            setNames(v);
        }
        
        //console.log(names);
    });
    const [value, loading, error] =useDocument(
        firebase.firestore().doc(`users/${user.uid}`),{
            snapshotListenOptions:{includeMetadataChanges:true},
        }
    );

    const SetArray=()=>{
        console.log(names);
        for (var i=0; i<names.length; i++){
            console.log(names[i]);
            const nextEmails=emails.push({
                number:nextID+i,
                email:names[i].toString()
            });
        }
    };
   
    
    const emailList=emails.map(name=>
        <ListItem>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg' />
            <ListContent>
                <List.Header key={name.number}>{name.email}</List.Header>
            </ListContent>
        </ListItem>
    )
    return(
        <div>
        
        <button onClick={SetArray}>friends</button>
        <List horizontal>
            {emailList}
        </List>
        </div>
    )
};

export default ListExampleHorizontal
