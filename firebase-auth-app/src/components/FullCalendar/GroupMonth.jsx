import React, {Component, useContext, useState} from 'react'
import {Calendar} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import LoginState from '../ProfilePage';
import GroupCard from '../Group/GroupCard'
import { UserContext } from '../../providers/UserProvider';
import '../../firebase';
import {getSchedule, FindGroupUID, generateUserDocument} from '../../firebase';

var check = 0;

function getEvents(user,setEvent){
    getSchedule(user.uid).then(
        function(data){
            try{
                setEvent(data);
            }catch(error){
                console.error("Error",error);
            }
    });
}

function getGroupMonth(user){
    FindGroupUID("dfl").then(
        function(data){
            try{
                console.log("testing18",data.data());
                console.log("testing19",generateUserDocument(user,));
            }catch(error){
                console.error("Error",error);
            }
        }
    )
}

function GroupMonth(){
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

    getGroupMonth(user);
    
    return (
        <div className = 'body text-center py-8 px-4 md:px-8 mx-auto w-11/12' styles = {{flex:1, flexDirection:'row'}}>
            <div className = 'Month max-w-4xl text-center py-8 px-4 md:px-8'>
                <FullCalendar defaultView = "dayGridMonth" plugins = {[dayGridPlugin]} events = {events}></FullCalendar>
            </div>
            <div className = 'week-wrapper max-w-4xl'>
                <FullCalendar initialView = "dayGridWeek" plugins = {[dayGridPlugin]} events = {events} />
            </div>
            <div className = 'week-wrapper max-w-4xl'>
                <FullCalendar initialView = "timeGridWeek" plugins = {[timeGridPlugin]} events = {events} />
            </div>
        </div>)
}

export default GroupMonth;


