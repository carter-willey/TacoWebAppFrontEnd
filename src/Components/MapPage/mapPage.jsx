import React, {useEffect, useState} from 'react'
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { Link } from 'react-router-dom';

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 43.0389,
  lng: -87.9065
};

function MapPage(props) {
  const {getShopFromArr, getTacosFromShopByShopId, tacosFromShop, allShops} = props
  const [totalAvg, setTotalAvg] = useState(0);
  const [selected, setSelected] = useState(null);

  useEffect(()=>{
    let counter = 0;
    tacosFromShop.forEach(taco => {
      counter += taco.averageRating
    });
    setTotalAvg(counter/tacosFromShop.length)
  },[tacosFromShop])

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
   
        return <Marker key={shop.shopId}  clickable="true" 
        onClick={() => {
          getTacosFromShopByShopId(shop.shopId)
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
                <Link to="/viewshop" onClick={() => { getShopFromArr(selected.shopId)}}>{selected.name}</Link>
              </h2>
              <p>
              <span><h6>Address:</h6> {selected.address}</span>
                <br/>
                <br/>
                <span><h6>Overall taco rating:</h6> {totalAvg.toFixed(2)} / 5 </span>
              </p>
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
