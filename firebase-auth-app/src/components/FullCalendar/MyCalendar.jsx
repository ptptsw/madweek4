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

function MyCalendar(){
    const user = useContext(UserContext);
    const {displayName,email}= user;
    const calendar = user.calendar;
    const [error, setError] = useState(null);
    
        return(
            <div className = 'mypage-body'>
                <LoginState/>
                <FriendsAdd/>
                <FriendsCard/>
                <GroupdAdd/>
                <GroupCard/>
                <div className = 'body-wrapper box'>
                    <div className = 'body-info-container'>
                        <Addschedule value={user}></Addschedule>
                        <div className = 'Month'>
                            <FullCalendar defaultView = "dayGridMonth" plugins = {[dayGridPlugin]}
                            events={user.calendar} />
                        </div>
                        <div className = 'week-wrapper'>
                            <FullCalendar initialView = "dayGridWeek" plugins = {[dayGridPlugin]} events={user.calendar}/>
                        </div>
                    </div>
                </div>
            </div>
        )


}

// class MyCalendar extends React.Component {
//     constructor(props){
//         super(props);
//     }
//     render(){
//         return(
//             <div className = 'mypage-body'>
//                 <LoginState/>
//                 <FriendsCard/>
//                 <GroupCard/>
//                 <div className = 'body-wrapper box'>
//                     <div className = 'body-info-container'>
//                         <div className = 'Month'>
//                             <FullCalendar defaultView = "dayGridMonth" plugins = {[dayGridPlugin]} events={[{title:{LoginState}, date: '2020-08-02'}]} 
//                                 dataClick = {this.handleDateClick}/>
//                         </div>
//                         <div className = 'week-wrapper'>
//                             <FullCalendar initialView = "dayGridWeek" plugins = {[dayGridPlugin]} events={[{title:'event 1', date: '2020-08-02'}]}/>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
//     handleDateClick = (arg) => {
//         alert(arg.dateStr)
//     }

// }
export default MyCalendar;
