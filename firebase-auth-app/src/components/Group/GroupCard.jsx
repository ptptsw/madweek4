import React from 'react';
import {Button, Card, Icon} from 'semantic-ui-react';

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
  
const CardExampleGroupProps= () => (
    <>
        <Card>
            <Card.Content header="Add Group" />
            <Card.Content extra>
                <Button basic color="green"> 
                    Add Group
                </Button>
            </Card.Content>
        </Card>
        <Card.Group items={items}/>
     </>
    )

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