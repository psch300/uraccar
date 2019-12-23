import React from 'react';
import './Device.css';
import { Dropdown } from 'semantic-ui-react';

const Device = ({name, uniqueId}) => {
  return (
    <Dropdown.Item>
      <b>{name}</b> {uniqueId}
    </Dropdown.Item>
  )
}

export default Device;