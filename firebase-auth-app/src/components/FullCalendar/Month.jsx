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

var check = 0;

function getEvents(user,setEvent){
    getSchedule(user.uid).then(
        function(data){
            try{
                setEvent(data);
                console.log("testing");
                console.log("testing",JSON.parse(data));
            }catch(error){
                console.error("Error",error);
            }
    });
}

function Month(){
    const user = useContext(UserContext);
    const {displayName,email}= user;
    const calendar = user.events;
    const [error, setError] = useState(null);
    var [events,setEvent]  = useState(null);
    if(events==null){
        getEvents(user,setEvent);
    }else{
        console.log("test1234",events);
        console.log("test12345",events.json.events[0]);
        events = events.json;

    }
    
    return (
        <div className = 'body'>
            <div className = 'Month'>
                <FullCalendar defaultView = "dayGridMonth" plugins = {[dayGridPlugin]} events = {events}
                />
            </div>
            <div className = 'week-wrapper'>
                <FullCalendar initialView = "dayGridWeek" plugins = {[dayGridPlugin]} events = {events}/>
            </div>
        </div>)
}

export default Month;


