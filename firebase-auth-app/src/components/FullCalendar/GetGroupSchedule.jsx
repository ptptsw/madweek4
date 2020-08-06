import React, {Component, useContext, useState} from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import LoginState from '../ProfilePage';
import GroupCard from '../Group/GroupCard'
import { UserContext } from '../../providers/UserProvider';
import timeGridPlugin from '@fullcalendar/timegrid'
import '../../firebase';
import { Router } from "@reach/router";
import {Button, Card, Icon} from 'semantic-ui-react';
import Month from './Month';
import {Link} from 'react-router-dom';
import GroupMonth from './GroupMonth';


function GetGroupSchedule(){
    const user = useContext(UserContext);
    const {displayName,email}= user;
    const calendar = user.events;
    const [error, setError] = useState(null);    
    const [GroupName,setGroupName] = useState('');
    var [events, setEvent] = useState(null);
    console.log("test1",events);


    return (
        <div>
            <Card>
            <form>
                <label>그룹 일정 확인:</label>
                <input
                    type="email"
                    className="mt-1 mb-3 p-1 w-full"
                    placeholder="Enter Group Name"
                    value={GroupName}
                    onChange={({target : {value}})=>
                        {
                            setGroupName(value);
                        }}
                />
            </form>
            <Button color="green" onClick={event=>{
                    console.log("logg",GroupName);
                    // return <li><Link to = '/GroupName'></Link></li>
            }}>
                    그룹 일정
            </Button>
            </Card>
                {/* <div className = 'body text-center py-8 px-4 md:px-8 mx-auto w-11/12' styles = {{flex:1, flexDirection:'row'}}>
                    <div className = 'Month max-w-4xl text-center py-8 px-4 md:px-8'>
                        <FullCalendar defaultView = "dayGridMonth" plugins = {[dayGridPlugin]} events = {events}></FullCalendar>
                    </div>
                    <div className = 'week-wrapper max-w-4xl'>
                        <FullCalendar initialView = "dayGridWeek" plugins = {[dayGridPlugin]} events = {events} />
                    </div>
                    <div className = 'week-wrapper max-w-4xl'>
                        <FullCalendar initialView = "timeGridWeek" plugins = {[timeGridPlugin]} events = {events} />
                    </div>
                </div> */}
            <Month></Month>
            {/* <Router>
                <Month path = '/'></Month>
            </Router> */}
        </div>
    )
}

export default GetGroupSchedule;