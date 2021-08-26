import React, {useState} from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from "@react-google-maps/api";
import mapStyles from './mapStyles';
import axios from 'axios';

const libraries = ["places"]
const mapContainerStyle = {
  width: "400px",
  height: "400px",
}
const mapCenter = {
  lat: 43.653225,
  lng: -79.653225
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
}

const MapPage = (props) => {
  const {allShops,} = props
  const [map, setMap] = useState(null)
  const [markers, set] = useState();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries 
  })
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])


  
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={mapCenter}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */ }
      <>
      {allShops.map((shop) =>{
   
        <Marker key={shop.shopId} position={{lat: shop.lat, lng: shop.lng}} name={shop.name}
        
           />
      })}
      </>
    </GoogleMap>
) : <></>
}
 
export default MapPage;
