import axios from 'axios';

// url: 'http://3abd3128.ngrok.io/api'
let traccar_url = "http://f6703aa2.ngrok.io/api/";

export const getDevicesFromTraccar = () => {
  return axios.get(traccar_url + "devices?all", {
    withCredentials: true
  });
}

export const getPointsFromTraccar = (deviceId) => {
  return axios.get(traccar_url + "positions", {
    withCredentials: true,
    params: {
      deviceId: deviceId,
      from: '2019-01-01T00:00:00Z',
      to: '2100-01-01T00:00:00Z'
    }
  })
}