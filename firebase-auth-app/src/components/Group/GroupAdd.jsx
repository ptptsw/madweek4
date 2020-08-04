import React, {useContext, useState, Component, createContext} from "react";
import {Button, Card} from 'semantic-ui-react';
import {auth, AddGroupFirebase} from "../../firebase";
import {UserContext} from "../../providers/UserProvider";
import "firebase/firestore";

const AddGroup= () => {
    const user=useContext(UserContext);

    const [names, setNames]=useState([{id:0, email:user.email}]);
    const[inputText, setInputText]=useState('');
    const[groupname, setGroupName]=useState('');
    const [nextID, setNextID]=useState(1);
    
    const onChange =e=>{
        const{name,value}=e.currentTarget;

        if(name==="groupname"){
            setGroupName(value);
        }else if(name==="friendslist"){
            setInputText(value);
        }
        
    };

    const onClick=()=>{
        const nextNames=names.concat({
            id:nextID,
            email:inputText
        });
        console.log(names);
        setNextID(nextID+1);
        setNames(nextNames);
        setInputText('');
    };

    const arrayToMap=names=>{

    }

    
    const nameList=names.map(name=><li key={name.id}>{name.email}</li>)
    return(
        <Card>
            <input name="groupname" value={groupname} onChange={onChange}/>
            <input name="friendslist" value={inputText} onChange={onChange}/>
            <button onClick={onClick}>추가</button>
            <ul>{nameList}</ul>
            <Button onClick={event=>{
                AddGroupFirebase(event,user, groupname, names);
            }}>
            Add Group
            </Button>
        </Card>
    );
};

export default AddGroup;