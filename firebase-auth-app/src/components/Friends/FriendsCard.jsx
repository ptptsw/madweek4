import React, { useContext, useState } from 'react';
import {Image, List, ListItem, ListContent,Button, Popup} from 'semantic-ui-react';
import { UserContext } from "../../providers/UserProvider";
import {auth, GetFriendsList,FindFriendUID} from "../../firebase";
import { navigate } from "@reach/router";
import {useCollection,useDocument} from 'react-firebase-hooks/firestore';
import firebase from "firebase/app";
import {AddFriends} from "../Friends/FriendsAdd"


function HandlerGroupList(user,setEvent){
    GetFriendsList(user).then(function(v){
        //console.log(v);
        try{
            setEvent(v);
        }catch(error){

        }
        
        //console.log(names);
    });
}

const ListExampleHorizontal = () => {
    const user=useContext(UserContext);
    const [names, setNames]=useState([]);
    const [nextID, setNextID]=useState(1000);
    const [emails, setNextEmails]=useState([]);

    if(names.length==0){
        HandlerGroupList(user,setNames);
    }else{
        console.log(names);
        if(emails.length==0){
            for (var i=0; i<names.length; i++){
                console.log(names[i]);
                const nextEmails=emails.push({
                    number:nextID+i,
                    email:names[i].toString()
                });
            }
        }
        
    }
 
   
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
        <List horizontal>
            {emailList}
        </List>
        </div>
    )
};

export default ListExampleHorizontal
