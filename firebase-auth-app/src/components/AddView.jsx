import React, { useContext, useState } from 'react';
import GroupAdd from './Group/GroupAdd';
import FriendsAdd from './Friends/FriendsAdd';
import {List} from 'semantic-ui-react';


function AddFunction(){
    return(
        <div className="p-6 border border-black-400 mx-2 rounded py-4 px-4 my-4">
            <p className="text-2xl font-black">Add Group,Friend</p>
            <div className='.sm\:flex'>
                <FriendsAdd/>
                <GroupAdd/>
            </div>          
        </div>
    )
}

export default AddFunction;