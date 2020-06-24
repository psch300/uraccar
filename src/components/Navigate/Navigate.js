import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import './Navigate.css';

const Navigate = ({devices, fetching, onChange}) => {

  const deviceOptions = [];
  devices.forEach(querySnapshot => {
    deviceOptions.push({
      value: querySnapshot.id,
      key: querySnapshot.data().name,
      text: querySnapshot.data().name
    });
  });

  return (
    <Dropdown
      className="Dropdown"
      placeholder='Select Device'
      fluid
      selection
      options={deviceOptions}
      onChange={onChange}
      disabled={fetching}
    />
  )
}

export default Navigate;