import React, {useContext,useState} from 'react';
import GroupCard from './Group/GroupCard';
import GroupAdd from './Group/GroupAdd';

function MyGroups(){
    return(
        <div className="p-6 border border-black-400 mx-2 rounded py-4 px-4 my-4">
            <p className="text-2xl font-black">My Groups</p>
            <GroupCard/>
        </div>
    )
}

export default MyGroups;