import React from 'react';
import './DeviceList.css';
import { Dropdown } from 'semantic-ui-react';

const DeviceList = ({devices, getPoints}) => {
  const deviceList = devices.map(
    (device, index) => (
      {
        key: index,
        text: device.name,
        value: device.id
      }
    )
  )

  return (
    <Dropdown className="DeviceList" placeholder="Select Device" fluid selection options={deviceList} onChange={getPoints}>
    </Dropdown>
  );
}

export default DeviceList;