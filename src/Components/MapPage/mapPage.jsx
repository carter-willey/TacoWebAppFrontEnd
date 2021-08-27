import React, {useState} from 'react'
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';

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
  const [selected, setSelected] = useState(null);


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
   
        return <Marker key={shop.shopId} clickable="true" 
        onClick={() => {
          setSelected(shop);
        }}
        position={{lat: shop.lat, lng: shop.lng}} name={shop.name}
        />

      })}
      {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                {selected.name}
              </h2>
              <p></p>
            </div>
          </InfoWindow>
        ) : null}
      </>
      </GoogleMap>
            
        </div>
        <div className="col col-3 right"></div>
      </div>
    </div>
    
  )
}
export default MapPage;
