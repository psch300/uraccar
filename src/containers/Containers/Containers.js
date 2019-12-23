import React, { Component } from 'react';
import { Wrapper, DeviceList, StaypointList, Map } from '../../components';
import { Segment } from 'semantic-ui-react';
import * as service from '../../services/device';
import * as firebase_service from '../../services/Firebase';

class Containers extends Component {

  state = {
    fetching: false,
    devices: [],
    points: []
  };
  
  fetchDeviceInfo = async () => {
    this.setState({
      fetching: true
    });

    //const info = await service.getDevices();
    const info = firebase_service.getFirebaseDB();
    console.log(info);
    const devices = info.data;

    this.setState({
      devices,
      fetching: false
    });
  }

  fetchPointInfo = async (deviceId) => {
    this.setState({
      fetching: true
    });

    const info = await service.getPoints(deviceId);
    const points = info.data;

    this.setState({
      points,
      fetching: false
    });

    console.log(points);
  }

  componentDidMount () {
    this.fetchDeviceInfo();
  }

  // getPoints = (event, {value}) => {
  //   this.fetchPointInfo(value);
  // }
  getPoints = (event, data) => {
    this.fetchPointInfo(data.value);
  }

  render () {
    const { devices, points } = this.state;
    return (
      <div>
        <Wrapper>
          <Segment>
            <DeviceList devices={devices} getPoints={this.getPoints}/>
          </Segment>
          <Map points={points}>
          </Map>
          <Segment>
            <StaypointList />
          </Segment>
        </Wrapper>
      </div>
    );
  }
}

export default Containers;