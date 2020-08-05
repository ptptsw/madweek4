import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { navigate } from "@reach/router";
import {auth} from "../firebase";
import { Menu ,Button} from 'semantic-ui-react'

const ProfilePage = () => {
    const user=useContext(UserContext);
    const {displayName,email}= user;
    console.log(user);
  return (
    <Menu inverted>
      <Menu.Item
        name="Calendar"
      />
      <Menu.Item
        name={displayName}
      />
      <Menu.Item>
        {email}
      </Menu.Item>
      <Menu.Item>
        <Button color="red" onClick = {() => {auth.signOut().then(()=>{navigate("/");})}}> Sign Out </Button>
      </Menu.Item>
    </Menu>
  ) 
};
export default ProfilePage;