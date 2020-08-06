import React, {useContext, useState,Component,createContext} from "react";
import {Button, Card, Popup} from 'semantic-ui-react';
import { auth, AddFriendstoFirebase } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";
import "firebase/firestore";



const AddFriends = () => {
    
    const user=useContext(UserContext);
    const [friendemail,setEmail] = useState('');
    const [error, setError] = useState(null);
    const AddFriendsHandler=(event, user,friendemail) =>{
        if(friendemail==''){
            alert("Enter friendsEmail!")
        }{
            AddFriendstoFirebase(event, user,friendemail);
        }
        
        //event.preventDefault();
    };
    return(
        <>
        
        <Card>
        <form>
            <label>Friends Email:</label>
            <input
                type="email"
                className="mt-1 mb-3 p-1 w-full"
                placeholder="Enter friendsEmail"
                value={friendemail}
                onChange={({target : {value}})=>setEmail(value)}
            />
        </form>
        <Button color="green" onClick={event=>{
            AddFriendsHandler(event,user,friendemail);
        }}>
                Add Friends
        </Button>
        </Card>
        
        </>
    )
};
export default AddFriends;