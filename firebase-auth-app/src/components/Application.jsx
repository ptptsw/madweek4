import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserProvider from "../providers/UserProvider";
import ProfilePage from "./ProfilePage";
import { UserContext } from "../providers/UserProvider";
import PasswordReset from "./PasswordReset";
import Calendar from "./CalendarView"
import MyCalendar from "./FullCalendar/MyCalendar"

function Application(){
    const user = useContext(UserContext);
    return (
        user ?
        <MyCalendar path="calendar" value={user} />
        :
        <Router>
            <SignUp path="signUp"/>
            <SignIn path = "/" />
            <PasswordReset path= "passwordReset"/>
        </Router>
    );
}

export default Application;