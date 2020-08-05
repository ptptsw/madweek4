import React, {useContext,useState} from 'react';
import {Button, Card, Icon} from 'semantic-ui-react';
import {GetGroupList,GetDetailOfGroup, FindGroupUID} from "../../firebase";
import { UserContext } from '../../providers/UserProvider';





const header= ["MT group"]

const description=[
    "this is a group"
].join(' ')

const number_of_friends=[
    5
]

const items = [
    {
      header: 'Project Report - April',
      description:
        'Leverage agile frameworks to provide a robust synopsis for high level overviews.',
      meta: 'ROI: 30%',
    },
    {
      header: 'Project Report - May',
      description:
        'Bring to the table win-win survival strategies to ensure proactive domination.',
      meta: 'ROI: 34%',
    },
    {
      header: 'Project Report - June',
      description:
        'Capitalise on low hanging fruit to identify a ballpark value added activity to beta test.',
      meta: 'ROI: 27%',
    },
  ]
  
const CardExampleGroupProps= () => {
  const user=useContext(UserContext);
  const [names, setNames]=useState([]);
  const [groups, SetGroups]=useState([]);
  const[detail_groups, Set_detail_groups]=useState([]);

  GetGroupList(user).then(function(v){
    //console.log(v);
    if(names){
      setNames(v);
      // for(var i=0; i<v.length; i++){
      //   FindGroupUID(v[i]).then(function(u){
      //     console.log(u.data());
      //   });
      // };
    }
  });



  const Groups=()=>{
    console.log(names);
      for (var i=0;i<names.length; i++){
          FindGroupUID(names[i]).then(function(u){
            if(groups.length<names.length){
              groups.push(u.data());
            }
              console.log(u.data());
          });
        };

  }

  const Check=()=>{
    console.log(groups);

    for (var i=0; i<groups.length; i++){
      console.log(groups[i]);
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


  


  //const {MyGroup}=user;
  //console.log({MyGroup});
  //var sample=GetDetailOfGroup(user);
  //console.log(sample);
  const groupList=detail_groups.map(name=>
    <Card>
    <Card.Content header={name.id}/>
    {name.members.map(person=><Card.Content description={person} /> )}
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




// const CardExampleExtraContent=() => (
//     <Card>
//         <Card.Content header={header} />
//         <Card.Content description={description}/>
//         <Card.Content extra>
//             <Icon name='user'/>{number_of_friends} Friends
//         </Card.Content>
//     </Card>
// )

// export default CardExampleExtraContent