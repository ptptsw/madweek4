import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Application from "./components/Application";
import UserProvider from "./providers/UserProvider";
import ProfilePage from "./components/ProfilePage";
import { UserContext } from "./providers/UserProvider";
import Calendar from 'react-calendar';
import calendar from './components/Calendar/Calendar';
import CalendarView from './components/CalendarView';
import MyCalendar from './components/FullCalendar/MyCalendar'
import {FullCalendar} from '@fullcalendar/react';
import {dayGridPlugin} from '@fullcalendar/daygrid';

function App() {
  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}
export default App;