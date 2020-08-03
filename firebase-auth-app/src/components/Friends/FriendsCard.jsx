import React, { useContext } from 'react';
import {Image, List} from 'semantic-ui-react';
import { UserContext } from "../../providers/UserProvider";
import {auth} from "../../firebase";
import { navigate } from "@reach/router";

const ListExampleHorizontal = () => {
    const user=useContext(UserContext);


    return(
        <List horizontal>
        <List.Item>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg' />
            <List.Content>
                <List.Header>SeoWan Lee</List.Header>
            </List.Content>
        </List.Item>
        <List.Item>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/christian.jpg' />
            <List.Content>
                <List.Header>Taehoan Shin</List.Header>
            </List.Content>
        </List.Item>
        <List.Item>
            <Image avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <List.Content>
                <List.Header>hihi</List.Header>
                </List.Content>
            </List.Item>
        </List>
    )
};

export default ListExampleHorizontal
