import React from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';

const Map = ({points}) => {
  const ncpCliendId = "Enter your own ncpClientId";
  const mapStyle = {
    width: "100%",
    height: "400px",
  };

  return (
    <RenderAfterNavermapsLoaded ncpClientId={ncpCliendId}>
      <NaverMap
        mapDivId={"maps-getting-started-uncontrolled"}
        style={mapStyle}
        defaultCenter={{ lat: 37.524416, lng: 126.981619 }}
        defaultZoom={7}
      >
        <Marker 
          position={{ lat: 37.524416, lng: 126.981619 }}
          onClick={() => {
            alert("Center of the Map")
          }}
        />
      </NaverMap>
    </RenderAfterNavermapsLoaded>
  )
}

export default Map;