import React, {Component} from 'react'
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

class MyCalendar extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className = 'mypage-body'>
                <div className = 'body-wrapper box'>
                    <div className = 'body-info-container'>
                        <div className = 'Month'>
                            <FullCalendar defaultView = "dayGridMonth" plugins = {[dayGridPlugin]} events={[{title:'event 1', date: '2020-08-02'}]} 
                                dataClick = {this.handleDateClick}/>
                        </div>
                        <div className = 'week-wrapper'>
                            <FullCalendar initialView = "dayGridWeek" plugins = {[dayGridPlugin]} events={[{title:'event 1', date: '2020-08-02'}]}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    handleDateClick = (arg) => {
        alert(arg.dateStr)
    }

}
export default MyCalendar;
