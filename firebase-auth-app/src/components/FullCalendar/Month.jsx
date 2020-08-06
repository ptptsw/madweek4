import React, {Component, useContext, useState} from 'react'
import {Calendar} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import LoginState from '../ProfilePage';
import GroupCard from '../Group/GroupCard'
import { UserContext } from '../../providers/UserProvider';
import {getSchedule, FindGroupUID, generateUserDocument, FindFriendUID} from '../../firebase';

var check = 0;

function Month(){
    const user = useContext(UserContext);
    const {displayName,email}= user;
    const calendar = user.events;
    const [groupEvents, setGroupEvents] = useState([]);
    const [inputText, setInputText]=useState('');
    const [MembersUID, setMembersUID]=useState('');
    var [events,setEvent]  = useState(null);

    const onChange=e=>{
        const{value}=e.currentTarget;
        setInputText(value);
    }

    const onClick=()=>{
        console.log(inputText);
        getGroupMonth(user, inputText, MembersUID, setMembersUID);
        
    }

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
    
    async function getMembersUID(list,SetMembersUID){
        var GroupSchedule = [];
        // const user = useContext(UserContext);
        // const GroupSchedule, SetGroupSchedule] = useState('');
        var membersUID=[];
        for (var i=0; i<list.length; i++){  
            await FindFriendUID(list[i]).then(
                function(MembersData){
                    try{
                         membersUID.push(MembersData.id);
                         console.log("DATA",MembersData.id);
                    }catch(error){
                        console.error("Error", error);
                    }
                }
            )
        }
        
        console.log(membersUID);
        for (var i=0; i<membersUID.length; i++){
            console.log(membersUID[i]);
            await getSchedule(membersUID[i]).then(
                function(schedule){
                    try{
                        console.log("group1",schedule);
                        GroupSchedule.push(schedule.json.events);
                        console.log("group2",GroupSchedule);                  
                        // GroupSchedule.push(schedule.json);
                    }catch(error){
                        console.error("Error", error)
                    }
                }
            )
        }
        setGroupEvents(GroupSchedule);
        return GroupSchedule;
        //return membersUID;
    }
    
    function getGroupMonth(user,groupname,MembersUID, SetMembersUID){
        FindGroupUID(groupname).then(
            function(data){
                try{
                    var list=[];
                    var membersUID=[];
                    console.log("testing18",Object.values(data.data().members));
                    for(var i=0; i<data.data().members.length ;i++){
                        list.push(data.data().members[i].email.toString());
                    }
                    console.log(list);
                    //members의 email 목록 받아옴
                    getMembersUID(list);
                    
    
                }catch(error){
                    console.error("Error",error);
                }
            }
        )
    }


    if(events==null){
        getEvents(user,setEvent);
    }else{
        console.log("test1234",events);
        console.log("test12345",events.json.events[0]);
        events = events.json;
    }

    //getGroupMonth(user);
    return (
        <>
        <label>Enter GroupName:</label>
        <input name="groupname" value={inputText} placeholder="enter groupname" onChange={onChange}/>
        <button className="bg-gray-700 hover:bg-gray-800 py-2 text-white" onClick={onClick}>Show Schedule of Groups</button>
        <div className = 'body text-center py-8 px-4 md:px-8 mx-auto w-11/12' >
            <div className = 'Month max-w-4xl text-center py-8 px-4 md:px-8'>
                <FullCalendar defaultView = "dayGridMonth" plugins = {[dayGridPlugin]} events = {groupEvents} ></FullCalendar>
            </div>
            <div className = 'Month max-w-4xl text-center py-8 px-4 md:px-8'>
                <FullCalendar defaultView = "dayGridMonth" plugins = {[dayGridPlugin]} events = {events} ></FullCalendar>
            </div>
            <div className = 'week-wrapper max-w-4xl'>
                <FullCalendar initialView = "dayGridWeek" plugins = {[dayGridPlugin]} events = {events} />
            </div>
            <div className = 'week-wrapper max-w-4xl'>
                <FullCalendar initialView = "timeGridWeek" plugins = {[timeGridPlugin]} events = {events} />
            </div>
        </div>
        </>
        )
}

export default Month;


