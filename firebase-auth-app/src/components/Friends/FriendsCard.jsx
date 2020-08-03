import React from 'react'
import {Image, List} from 'semantic-ui-react'

const ListExampleHorizontal = () => (
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

export default ListExampleHorizontal
