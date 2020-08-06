import React, {Component, useContext, useState} from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import LoginState from '../ProfilePage';
import GroupCard from '../Group/GroupCard'
import { UserContext } from '../../providers/UserProvider';
import Addschedule from './AddSchedule';
import '../../firebase';
import { Router } from "@reach/router";
import {Button, Card, Icon} from 'semantic-ui-react';
import Month from './Month';
import {Link} from 'react-router-dom';


function GetGroupSchedule(){
    const user = useContext(UserContext);
    const {displayName,email}= user;
    const calendar = user.events;
    const [error, setError] = useState(null);    
    const [GroupName,setGroupName] = useState('');
    var events = new Object();
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
            <Router>
                <Month path = '/'></Month>
            </Router>
        </div>
    )
}

export default GetGroupSchedule;