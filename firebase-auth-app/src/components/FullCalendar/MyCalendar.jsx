import React, {Component, useContext, useState} from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import LoginState from '../ProfilePage';
import GroupCard from '../Group/GroupCard'
import { UserContext } from '../../providers/UserProvider';
import Addschedule from './AddSchedule';
import '../../firebase';
import FriendsCard from '../Friends/FriendsCard';
import FriendsAdd from '../Friends/FriendsAdd';
import GroupdAdd from "../Group/GroupAdd";
import {getSchedule} from '../../firebase';
import Month from './Month';
import FriendsListView from '../FriendsListView';
import GroupListView from '../GroupListView';
import AddView from '../AddView';

var check = 0;

// function getEvents(user){
//     getSchedule(user.uid).then(
//         function(data){
//             check = 1;
//             return data;
//     });

// }

function MyCalendar(){
    const user = useContext(UserContext);
    const {displayName,email}= user;
    const calendar = user.events;
    const [error, setError] = useState(null);
    var events = new Object();
    // events = getEvents(user);
    console.log("test1",events);
    // console.

    return(
                <div className = 'mypage-body'>
                    <LoginState/>
                    <FriendsListView/>
                    <GroupListView/>
                    <AddView/>
                    <div className = 'body-wrapper box'>
                        <div className = 'body-info-container'>
                            <Addschedule value={user}></Addschedule>
                            <Month></Month>
                        </div>
                    </div>                   
                </div>
    )   
}


export default MyCalendar;
