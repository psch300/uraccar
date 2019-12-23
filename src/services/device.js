import axios from 'axios';

// url: 'traccar server api domain name address'
export function getDevices () {
  return axios.get(url + '/devices?all', {
    withCredentials: true
  });
}

export function getPoints (deviceId) {
  return axios.get(url + '/positions', {
    withCredentials: true,
    params: {
      deviceId: deviceId,
      from: '2019-01-01T00:00:00Z',
      to: '2020-01-01T00:00:00Z'
    }
  })
}