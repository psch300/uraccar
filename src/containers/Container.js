import React, { Component } from 'react';
import { Wrapper, Navigate, Mapview, PointList } from '../components'
import * as firebase_service from '../services/Firebase';
import * as traccar_service from '../services/Traccar';
import { Button } from 'semantic-ui-react';
import { getDistance, getCenter } from 'geolib';
import { ToastContainer, Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {
      zoom: 6,
      center: { lat: 37.529909, lng: 126.984398 },
      devices: [],
      points: [],
      staypoints: [],
      fetching: false,
      synchronizing: false
    }
  }

  getStaypoint = async (points, dist_threh, time_threh) => {
    const staypoints = [];
    let i = 0;

    while (i < points.length) {
      let j = i + 1;

      let time_count = 0;
      while (j < points.length) {
        let dist = getDistance(
          { latitude: points[i].latitude, longitude: points[i].longitude }, 
          { latitude: points[j].latitude, longitude: points[j].longitude }
        );

        if (dist > dist_threh) {
          if (time_count > time_threh) {
            let pointToStaypoint = [];
            for (let index = i; index < j;  index++) {
              pointToStaypoint.push({
                latitude: points[index].latitude,
                longitude: points[index].longitude
              });
            }

            staypoints.push({
              date: points[i].deviceTime,
              coordinate: getCenter(pointToStaypoint)
            });
          }

          i = j;
          break;
        }

        time_count = time_count + 1;
        
        j = j + 1;
      }

      i = i + 1;
    }

    return staypoints;
  }

  syncWithTraccar = async () => {
    var newDeviceCount = 0;
    var newStaypointCount = 0;

    this.setState({
      synchronizing: true
    });

    const deviceInfoFromTraccar = await traccar_service.getDevicesFromTraccar();
    const deviceInfoFromFirebase = await firebase_service.getDeviceList();

    for (const origin_device of deviceInfoFromTraccar.data) {
      const found = deviceInfoFromFirebase.docs.find(device => 
        origin_device.name === device.data().name && origin_device.uniqueId === device.data().uniqueId
      );

      if (found === undefined) {
        firebase_service.setNewDevice(origin_device.id, origin_device.name, origin_device.uniqueId);
      }

      const pointsInfoFromTraccar = await traccar_service.getPointsFromTraccar(origin_device.id);
      const staypointsFromTraccar = await this.getStaypoint(pointsInfoFromTraccar.data, 200, 6);
      const staypointsInfoFromFirebase = await firebase_service.getStaypointList(origin_device.id.toString());

      for (const origin_staypoint of staypointsFromTraccar) {
        const found = staypointsInfoFromFirebase.docs.find(staypoint => 
          origin_staypoint.coordinate.latitude === staypoint.data().coordinate.latitude && origin_staypoint.coordinate.longitude === staypoint.data().coordinate.longitude
        );

        if (found === undefined) {
          firebase_service.setNewStaypoint(origin_device.id, origin_staypoint)
          newStaypointCount = newStaypointCount + 1;
        }
      }
    }

    this.fetchDevicesInfo();

    this.setState({
      synchronizing: false
    });

    return [newDeviceCount, newStaypointCount];
  }

  fetchDevicesInfo = async () => {
    this.setState({
      fetching: true
    });

    const info = await firebase_service.getDeviceList();
    const devices = info.docs;

    this.setState({
      devices: devices,
      fetching: false
    });
  }

  fetchStaypointsInfo = async (deviceId) => {
    this.setState({
      fetching: true
    });

    const info = await firebase_service.getStaypointList(deviceId);
    const staypoints = info.docs;

    this.setState({
      staypoints: staypoints,
      fetching: false
    });
  }

  fetchPointsInfo = async (deviceId) => {
    this.setState({
      fetching: true
    });

    const info = await traccar_service.getPointsFromTraccar(deviceId);
    const points = info.data;

    this.setState({
      points: points,
      fetching: false
    });
  }

  handleNavigateChange = (event, data) => {
    // console.log(data.value) => deviceId

    this.fetchPointsInfo(data.value)
    .then(() => {
      this.fetchStaypointsInfo(data.value);
    });

    // this.fetchStaypointsInfo(data.value);
    
    this.setState({
      zoom: 6,
      center: { lat: 37.529909, lng: 126.984398 }
    })
  }

  handlePointListClick = (data) => {
    // console.log(data.latitude, data.longitude)
    this.setState({
      zoom: 12,
      center: { lat: data.latitude, lng: data.longitude }
    })
  }

  handleSyncButtonClick = (event, data) => {
    this.syncWithTraccar()
    .then((count) => {
      this.handleNotify(count);
    });
  }

  handleNotify = (count) => {
    if (count[0] !== 0 || count[1] !== 0) {
      toast.success("Sync Success. " + count[0] + " device change and " + count[1] + " staypoint change found.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
        transition: Slide,
        hideProgressBar: true
      });
    } else {
      toast.warn("Nothing To Sync With.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2500,
        transition: Slide,
        hideProgressBar: true
      });
    }
    
  }

  componentDidMount() {
    this.fetchDevicesInfo();
  }

  render() {
    const { zoom, center, devices, points, staypoints, fetching, synchronizing } = this.state;

    return (
      <Wrapper>
        <Navigate devices={devices} disabled={fetching} onChange={this.handleNavigateChange}/>
        <Mapview zoom={zoom} center={center} points={points} staypoints={staypoints}/>
        <PointList staypoints={staypoints} onClick={this.handlePointListClick}/>
        {
          synchronizing === true
            ? <Button fluid loading />
            : <Button fluid icon="sync" content="synchronize with TRACCAR server" onClick={this.handleSyncButtonClick}/>
        }
        <ToastContainer />
      </Wrapper>
    )
  }
}

export default Container;