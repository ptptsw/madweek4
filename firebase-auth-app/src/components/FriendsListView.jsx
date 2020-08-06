import React, {useContext,useState} from 'react';
import FriendsCard from './Friends/FriendsCard';
import FrendsAdd from './Friends/FriendsAdd';

function MyFriends(){

    return(
        <div className="p-6 border border-black-400 mx-2 rounded py-4 px-4 my-4">
            <p className="text-2xl font-black">My Friends</p>
            <FriendsCard/>
        </div>
    )

}

export default MyFriends;
