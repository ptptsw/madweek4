import React, {useContext,useState} from 'react';
import {Button, Card, Icon} from 'semantic-ui-react';
import {GetGroupList,GetDetailOfGroup, FindGroupUID} from "../../firebase";
import { UserContext } from '../../providers/UserProvider';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


// function HandlerGroupList(user, setEvent){
//   GetGroupList(user).then(function(v){
//     setEvent(v);
// });
// };

// function HandlerGroup(groups,names,SetGroups){
//   console.log(names);
//   for (var i=0;i<names.length; i++){
//     FindGroupUID(names[i]).then(function(u){
//       console.log(groups.length);
//       if(groups.length<names.length){
//         //groups.push(u.data());
//         console.log(u.data());
//         const nextgroups=groups.concat(u.data());
//         SetGroups(nextgroups);
//       }

      
//     });
//   };
// }

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

  // if(names.length==0){
  //   HandlerGroupList(user,setNames);
  //   console.log(names);
  // }else{
    
  // }


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
              //console.log(u.data());
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
    //console.log(detail_groups);
    // const groupList=detail_groups.map(name=>
    //   <Card>
    //   <Card.Content header={name.id}/>
    //   {name.members.map(person=><Card.Content description={person} /> )}
    //   <Card.Content extra>
    //     <Icon name='user'/>{name.numbers} Friends
    //   </Card.Content>
    // </Card>
    // )
  };

  function sample(){
    console.log("hi");
  }
  

  //console.log(detail_groups);
  const groupList=detail_groups.map(name=>
    <Card className="my-8 py-8" onClick={sample}>
    <Card.Content header={name.id}/>
    {name.members.map(person=><Card.Content description={person} /> )}
    <Card.Content extra>
      <Icon name='user'/>{name.numbers} Friends
    </Card.Content>
    </Card>
  )
  return(
    <div className="py-8">
      <button onClick={Groups}>Groups</button>
      <button onClick={Check}>Check</button>
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
      >
        {groupList}
      </Carousel>
    </div>  
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