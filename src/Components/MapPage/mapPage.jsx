import React, {useState} from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 43.0389,
  lng: -87.9065
};

function MapPage(props) {

  const {allShops,} = props
  const [map, setMap] = useState(null)


  return (
    <div className="container-fluid main h-100">
      <div className="row mainRow h-100">
        <div className="col col-3 left"></div>
        <div className="col middle "> 
        
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
      <>
      {allShops.map((shop) =>{
   
        return <Marker key={shop.shopId} position={{lat: shop.lat, lng: shop.lng}} name={shop.name}/>
      })}
      </>
      </GoogleMap>
            
        </div>
        <div className="col col-3 right"></div>
      </div>
    </div>
    
  )
}
export default MapPage;
