import React, {useContext,useState, createContext} from 'react';
import {Button, Card, Icon} from 'semantic-ui-react';
import {GetGroupList,GetDetailOfGroup, FindGroupUID} from "../../firebase";
import { UserContext } from '../../providers/UserProvider';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import GroupMonth from '../FullCalendar/GroupMonth';

  
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
        numbers: groups[i].members.length
      });
    }
  };
  const GroupView=(name)=>{
    console.log("button",name.id);
    }

  //console.log(detail_groups);
  const groupList=detail_groups.map(name=>
    <Card>
      <Card.Content header={name.id} />
      {name.members.map(person=>
        <Card.Content description={person}/>
        )}
      <Card.Content extra>
        <Icon name='user'/>{name.numbers} Friends
      </Card.Content>
    </Card>
  )
  return(
    <>
      <button onClick={Groups}>Groups</button>
      <button onClick={Check}>Check</button>
      <Card.Group>
      {groupList}
      </Card.Group>
     </>
  )
}

export default CardExampleGroupProps
