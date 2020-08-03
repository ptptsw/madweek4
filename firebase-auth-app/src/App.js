import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Application from "./components/Application";
import UserProvider from "./providers/UserProvider";
import ProfilePage from "./components/ProfilePage";
import { UserContext } from "./providers/UserProvider";
import Calendar from 'react-calendar';
<<<<<<< HEAD
import calendar from './components/Calendar/Calendar'
import CalendarView from './components/CalendarView'
import GroupCard from './components/Group/GroupCard'
import FriendGroup from './components/Friends/FriendsCard'
=======
import calendar from './components/Calendar/Calendar';
import CalendarView from './components/CalendarView';
import MyCalendar from './components/FullCalendar/MyCalendar'
import {FullCalendar} from '@fullcalendar/react';
import {dayGridPlugin} from '@fullcalendar/daygrid';
>>>>>>> 3bd52c0eb283472f103992ed66e81fa176f54c04

function App() {
  return (
    <UserProvider>
      <Application />
<<<<<<< HEAD
      <GroupCard />
      <FriendGroup/>
=======
>>>>>>> 3bd52c0eb283472f103992ed66e81fa176f54c04
    </UserProvider>
  );
}
export default App;