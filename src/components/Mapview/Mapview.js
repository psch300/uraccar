import React from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker, Polyline } from 'react-naver-maps';

const Mapview = ({zoom, center, points, staypoints}) => {

  const pointsList = points.map(
    (point, index) => (
      <Marker
        position={{ lat: point.latitude, lng: point.longitude }}
        icon={{
          url: "http://maps.google.com/mapfiles/kml/paddle/blu-circle-lv.png",
          size: { width: 16, height: 16 },
          scaledSize: { width: 16, height: 16 }
        }}
        key={index}
      />
    )
  )

  const path = points.map(
    (point) => (
      { lat: point.latitude, lng: point.longitude }
    )
  )

  const staypointsList = staypoints.map(
    (staypoint, index) => (
      <Marker
        position={{ lat: staypoint.data().coordinate.latitude, lng: staypoint.data().coordinate.longitude }}
        icon={{
          url: "http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png",
          size: { width: 32, height: 32 },
          scaledSize: { width: 32, height: 32 }
        }}
        key={index}
      />
    )
  );



  return (
    <RenderAfterNavermapsLoaded ncpClientId="ig5nrhgk09">
      <NaverMap 
        mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
        style={{
          width: '100%',
          height: '400px',
        }}
        center={center}
        zoom={zoom}
      >
        <Polyline 
          path={path}
          strokeColor={'#4A89F3'}
          strokeOpacity={0.7}
          strokeWeight={3}
        />
        {pointsList}
        {staypointsList}
      </NaverMap>
    </RenderAfterNavermapsLoaded>

  );
}


export default Mapview;