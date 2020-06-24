import React from 'react';
import { List } from 'semantic-ui-react';

const PointList = ({staypoints, onClick}) => {
  const staypointsList = staypoints.map(
    (staypoint, index) => (
      <List.Item key={index} onClick={ () => onClick(staypoint.data().coordinate) }>
        <List.Icon name="marker"/>
        <List.Content>
          <List.Header>{staypoint.data().name} : {staypoint.data().content}</List.Header>
          <List.Description>
            {staypoint.data().date.toDate().getFullYear()} - {staypoint.data().date.toDate().getMonth() + 1} - {staypoint.data().date.toDate().getDate()}
          </List.Description>
          <List.Description>{staypoint.data().coordinate.latitude} {staypoint.data().coordinate.longitude}</List.Description>
        </List.Content>
      </List.Item>
    )
  )

  return (
    <List selection verticalAlign='middle'>
      {staypointsList}
    </List>
  )
}

export default PointList;