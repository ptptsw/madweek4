import React, { useContext, useState } from 'react';
import {Image, List, ListItem, ListContent,Button, Popup} from 'semantic-ui-react';
import { UserContext } from "../../providers/UserProvider";
import {auth, GetFriendsList,FindFriendUID} from "../../firebase";
import { navigate } from "@reach/router";
import {useCollection,useDocument} from 'react-firebase-hooks/firestore';
import firebase from "firebase/app";
import {AddFriends} from "../Friends/FriendsAdd";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive={
    desktop:{
        breakpoint:{max:3000, min:1024},
        items:4,
        slidesToSlide:4
    },
    mobile : {
        breakpoint:{max:464, min:0},
        items:1,
        slidesToSlide:1
    }
};


function HandlerGroupList(user,setEvent){
    GetFriendsList(user).then(function(v){
        //console.log(v);
        try{
            setEvent(v);
        }catch(error){

        }
        
        //console.log(names);
    });
}

const ListExampleHorizontal = () => {
    const user=useContext(UserContext);
    const [names, setNames]=useState([]);
    const [nextID, setNextID]=useState(1000);
    const [emails, setNextEmails]=useState([]);

    if(names.length==0){
        HandlerGroupList(user,setNames);
    }else{
        console.log(names);
        if(emails.length==0){
            for (var i=0; i<names.length; i++){
                console.log(names[i]);
                const nextEmails=emails.push({
                    number:nextID+i,
                    email:names[i].toString()
                });
            }
        }
        
    }
 
   
    const emailList=emails.map(name=>
        <ListItem style={{alignItems:'Center'}}>
            <Image  avatar src='https://react.semantic-ui.com/images/avatar/small/tom.jpg' />
            <List.Header key={name.number} className="font-bold">{name.email}</List.Header>
        </ListItem>
    )
    return(
        <Carousel 
        swipeable={true}
        draggable={true}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-10-px"
        className="py-4"
        >
        {emailList}

            
            
        
        </Carousel>
    )
};

export default ListExampleHorizontal
