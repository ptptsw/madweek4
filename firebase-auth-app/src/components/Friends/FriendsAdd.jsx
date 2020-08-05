import React, {useContext, useState,Component,createContext} from "react";
import {Button} from 'semantic-ui-react';
import { auth, AddFriendstoFirebase } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";
import "firebase/firestore";



const AddFriends = () => {
    
    const user=useContext(UserContext);
    const [friendemail,setEmail] = useState('');
    const [error, setError] = useState(null);
    const AddFriendsHandler=(event, friendemail) =>{
        event.preventDefault();
    };
    return(
        <div>
        <form>
            <input
                type="email"
                placeholder="Enter friendsEmail"
                value={friendemail}
                onChange={({target : {value}})=>setEmail(value)}
            />
        </form>
        <button onClick={event=>{
            AddFriendstoFirebase(event,user,friendemail);
        }}>
                Add Friends
        </button>
        </div>
    )
}
export default AddFriends;