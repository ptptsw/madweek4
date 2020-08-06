import React, {useContext, useState, Component, createContext} from "react";
import {Button, Card, Segment} from 'semantic-ui-react';
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

    const AddGroupHandler=(event, user,groupname, names) =>{
        if(groupname==''){
            alert("Enter groupname!");
        }else if(names.length==1){
            alert("Enter friendsEmail!");
        }else{
            console.log(names);
            AddGroupFirebase(event,user, groupname, names);
        }
    }

    
    const nameList=names.map(name=><li key={name.id}>{name.email}</li>)
    return(
        <Card className="mx-4">
            <Card className="my-4 py-4">
            <label className="block my-1 mx-1 font-bold">GroupName:</label>
            <input name="groupname" value={groupname} className="mt-1 mb-3 p-1 w-full" placeholder="Add Group Name" onChange={onChange}/>
            <label className="block my-1 mx-1 font-bold" >Add Members:</label>
            <input name="friendslist" value={inputText} className="mt-1 mb-3 p-1 w-full"  placeholder="Members Email" onChange={onChange}/>
            <button className="bg-gray-700 hover:bg-gray-800 w-1xl py-2 text-white" onClick={onClick}>추가</button>
            </Card>
            
            <label className="block mx-1 font-bold">Group Members List:</label>
            <ul className="mx-1 my-1">{nameList}</ul>
            <Button color="green" onClick={event=>{
                AddGroupHandler(event,user, groupname, names);
            }}>
            Add Group
            </Button>
        </Card>
    );
};

export default AddGroup;