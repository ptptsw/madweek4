import React, { useContext } from "react";
import { Router } from "@reach/router";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserProvider from "../providers/UserProvider";
import ProfilePage from "./ProfilePage";
import { UserContext } from "../providers/UserProvider";
import PasswordReset from "./PasswordReset";
import Calendar from "./CalendarView"

function Application(){
    const user = useContext(UserContext);
    return (
        user ?
        <ProfilePage />
        :
        <Router>
            <SignUp path="signUp"/>
            <SignIn path = "/" />
            <PasswordReset path= "passwordReset"/>
            <Calendar path="calendar"/>
        </Router>
    );
}

export default Application;