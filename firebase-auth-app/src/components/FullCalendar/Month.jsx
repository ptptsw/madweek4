import React, {Component, useContext, useState} from 'react'
import {Calendar} from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import LoginState from '../ProfilePage';
import GroupCard from '../Group/GroupCard'
import { UserContext } from '../../providers/UserProvider';
import {getSchedule, FindGroupUID, generateUserDocument, FindFriendUID} from '../../firebase';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
var check = 0;


const responsive={
    desktop:{
        breakpoint:{max:3000, min:1024},
        items:1,
        slidesToSlide:1
    },
    mobile : {
        breakpoint:{max:464, min:0},
        items:1,
        slidesToSlide:1
    }
};

function Month(){
    const user = useContext(UserContext);
    const {displayName,email}= user;
    const calendar = user.events;
    var [groupEvents, setGroupEvents] = useState([]);
    const [inputText, setInputText]=useState('');
    const [MembersUID, setMembersUID]=useState('');
    var [events,setEvent]  = useState();

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
                        for(var i=0; i<schedule.json.events.length; i++){
                            GroupSchedule.push(schedule.json.events[i]);
                        }
                        console.log("group1",schedule);
                        //GroupSchedule.push(schedule.json.events);
                        console.log("group2",GroupSchedule);                  
                        // GroupSchedule.push(schedule.json);
                    }catch(error){
                        console.error("Error", error)
                    }
                }
            )
        }
        setGroupEvents({events: GroupSchedule});
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
        <div className="p-6 border border-black-400 mx-2 rounded py-4 px-4 my-4">
        <p className="text-3xl font-black">Schedule</p>
        <label className="text-1xl font-black">Enter GroupName:</label>
        <input name="groupname" value={inputText} placeholder="enter groupname" onChange={onChange} className="mt-1 mb-3 p-1"/>
        <button className="hover:bg-green-200 py-2 px-2 border border-gray-700 text-gray rounded" onClick={onClick}>Show Schedule of Groups</button>
            <Carousel
                swipeable={true}
                draggable={true}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-10-px"
                className=" mx-auto w-full md:w-6/12 rounded py-8 px-4 md:px-8"
            >
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
            </Carousel>
        </div>
        )
}

export default Month;


