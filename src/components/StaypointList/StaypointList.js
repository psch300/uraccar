import React from 'react';
import './StaypointList.css';
import { List } from 'semantic-ui-react';
import Staypoint from '../Staypoint/Staypoint';

const StaypointList = () => {
  return (
    <List className="StaypointList" selection verticalAlign='middle'>
      <Staypoint />
      <Staypoint />
      <Staypoint />
    </List>
  );
}

export default StaypointList;