import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Application from "./components/Application";
import UserProvider from "./providers/UserProvider";
import ProfilePage from "./components/ProfilePage";
import { UserContext } from "./providers/UserProvider";
import Calendar from 'react-calendar';
import calendar from './components/Calendar/Calendar'
import CalendarView from './components/CalendarView'
import GroupCard from './components/Group/GroupCard'
import FriendGroup from './components/Friends/FriendsCard'

function App() {
  return (
    <UserProvider>
      <Application />
      <GroupCard />
      <FriendGroup/>
    </UserProvider>
  );
}
export default App;