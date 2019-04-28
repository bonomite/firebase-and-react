
import React from 'react';
//import ReactDOM from 'react-dom';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
//import Geocode from "react-geocode";

export let MapWithAMarker = withScriptjs(withGoogleMap(props =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
    center={{ lat: props.lat, lng: props.lng }}
  >
    <Marker      
      position={{ lat: props.lat, lng: props.lng }}
    />
  </GoogleMap>
));

/*ReactDOM.render(<MapWithAMarker
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBhwrEE_qhFtG7f1KYUA1NeBkehf2nvltk&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `400px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
  lat={40.833200}
  lng={-74.232450}
/>, document.getElementById('Map'));*/

