import React, {useContext,useState, createContext} from 'react';
import {Button, Card, Icon} from 'semantic-ui-react';
import {GetGroupList,GetDetailOfGroup, FindGroupUID} from "../../firebase";
import { UserContext } from '../../providers/UserProvider';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import GroupMonth from '../FullCalendar/GroupMonth';
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
  
const CardExampleGroupProps= () => {
  const user=useContext(UserContext);
  const [names, setNames]=useState([]);
  const [groups, SetGroups]=useState([]);
  const[detail_groups, Set_detail_groups]=useState([]);
  const[events , setEvents] = useState([]);
  const[selected , SetSelected] = useState([]);


  GetGroupList(user).then(function(v){
    if(names){
      setNames(v);
    }
     
  });
  const Groups=()=>{
      console.log(names);
      for (var i=0;i<names.length; i++){
          FindGroupUID(names[i]).then(function(u){
            if(groups.length<names.length){
              groups.push(u.data());
            }
          });
        };
  }

  const Check=()=>{
    console.log(groups);
    for (var i=0; i<groups.length; i++){
      //console.log(groups[i]);
      var list=[];
      for (var j=0; j<groups[i].members.length; j++){
        list.push(groups[i].members[j].email.toString());
      }
      detail_groups.push({
        id:groups[i].groupname,
        members: list,
        numbers: groups[i].members.length.members
      });
    }
  };

  
  function sample(){
    console.log("hi");
  }
  

  //console.log(detail_groups);
  const groupList=detail_groups.map(name=>
    <Card className="my-8" onClick={sample}>
    <Card.Content header={name.id}/>
    {name.members.map(person=><Card.Content description={person} /> )}
    <Card.Content extra>
      <Icon name='user'/>{name.numbers} Friends
    </Card.Content>
    </Card>
  )
  return(
    <div>
    <button onClick={Groups}>Groups</button>
    <button onClick={Check}>Check</button>
    <div className="font-sans">
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
        className="my-4 py-4 px-2"
      >
        {groupList}
      </Carousel>
    </div> 
    </div> 
  )
}

export default CardExampleGroupProps
