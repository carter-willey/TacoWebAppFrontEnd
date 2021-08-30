import React, {useState, useEffect} from 'react';  
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import ShopAddressSearch from '../ShopAddressSearch/shopAddressSearch';




const YourShop = (props) => {
  const {currentToken, currentUser, allShops, allShopHours, getAllShops} = props;
  const [thisShopHours, setThisShopHours] = useState([]);
  const [thisShop, setThisShop] = useState([]);
  const history = useHistory()
  
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const notificationFields = {
    userId: currentUser.user.id,
    text: "",
    shopId: thisShop.shopId
  }

  

  const filterShops = () => {
    allShops.filter((shop) =>{
      if(shop.userId == currentUser.user.id){
        setThisShop(shop)
      }
      console.log(thisShop);
    })
  }

  const filterShopHours = () =>{
    console.log(allShopHours);
    allShopHours.filter((shop) => {
      if(shop.shopId == thisShop.shopId)
      setThisShopHours(shop)
    })
    
  }

  let eachTimeEntryInit;

  useEffect(() => {
    filterShops()
    
  }, [allShops])


  useEffect(() => {
    filterShopHours()
    
  }, [allShopHours])


  useEffect( () => {
    eachTimeEntryInit = {
      monOpen: thisShopHours.monOpen,
      monClose: thisShopHours.monClose,
      tuesOpen: thisShopHours.tuesOpen,
      tuesClose: thisShopHours.tuesClose,
      wedOpen: thisShopHours.wedOpen,
      wedClose: thisShopHours.wedClose,
      thursOpen: thisShopHours.thursOpen,
      thursClose: thisShopHours.thursClose,
      friOpen: thisShopHours.friOpen,
      friClose: thisShopHours.friClose,
      satOpen: thisShopHours.satOpen,
      satClose: thisShopHours.satClose,
      sunOpen: thisShopHours.sunOpen,
      sunClose: thisShopHours.sunClose,
    }
    setEachTimeEntry(eachTimeEntryInit)
    
  }, [thisShopHours])
  
  

  
    
  const [eachTimeEntry, setEachTimeEntry] = useState([])


    const eachEntry = {
      userid: currentUser.user.id,
      name: name,
      address: address,
      lat: lat,
      lng: lng,       
  }

  

  


    const handleSubmit = (event) => {
        event.preventDefault();
        Register();
        
    }

      
      const handleTimeChange = (event) => {
        setEachTimeEntry({...eachTimeEntry, [event.target.name]: event.target.value})
        console.log(eachTimeEntry);
      }

    const Register = async () => {
        let userData = eachEntry;
        let shopHours = eachTimeEntry;
        notificationFields.text = `${thisShop.name} updated their store info!`
        

          console.log(userData);
          if(userData.length !== 0){
            let response = await axios.put(`https://localhost:44394/api/shops/${thisShop.shopId}`, userData, { headers: {Authorization: 'Bearer ' + currentToken}});
            console.log(response.data);
            if (response.data.length !== 0){
              shopHours.shopId = response.data.shopId;
              let response2 = await axios.put(`https://localhost:44394/api/shophours/${thisShop.shopId}`, shopHours, { headers: {Authorization: 'Bearer ' + currentToken}});
              if(response2.data.length !== 0){
                
                await axios.post("https://localhost:44394/api/notifications/", notificationFields, {headers: {Authorization: 'Bearer ' + currentToken}})
             }
              }        
                getAllShops()     
                history.push("/")
            }
        
    }
    return (
        <div className="container-fluid"> 
        {thisShop && thisShopHours &&
            <div className="row">
                <div className="col sm-4 side"></div>
                <div className="col sm-4">
                <div  >
                <h1 className="title">{currentUser.user.username}, would you like to update your shop?</h1>
                    <form onSubmit={handleSubmit}>
                                            
                    <h5 className="signupTitle">Shop Address:</h5>
                    <div>
                    <ShopAddressSearch thisShop={thisShop} setAddress={setAddress} setLat={setLat} setLng={setLng}/>
                    {/* <input  className="form-control" value={eachEntry.address} name="address" placeholder="Address..." onChange={handleChange}></input> */}               
                    </div>
                    <div className="row mb-4 mt-4">
                      <div className="mr-4">
                        <h5 className="signupTitle">Monday Open:</h5>
                        <form>
                          <label for="1open">Select a time:</label>
                          <input type="time" name="monOpen" value={eachTimeEntry.monOpen}  onChange={handleTimeChange}/>
                        </form>
                      </div>
                      <div>
                        <h5 className="signupTitle">Monday Close:</h5>
                        <form>
                          <label for="1.close">Select a time:</label>
                          <input type="time"  name="monClose" value={eachTimeEntry.monClose} onChange={handleTimeChange}/>
                        </form>
                      </div>
                    </div>
                    
                    <div className="row mb-4">
                      <div className="mr-4">
                        <h5 className="signupTitle">Tuesday Open:</h5>
                        <form>
                          <label for="2open">Select a time:</label>
                          <input type="time" id="2open" name="tuesOpen" value={eachTimeEntry.tuesOpen} onChange={handleTimeChange} />
                        </form>
                      </div>
                      <div className="mr-4">
                        <h5 className="signupTitle">Tuesday Close:</h5>
                        <form>
                          <label for="2close">Select a time:</label>
                          <input type="time" id="2close" name="tuesClose" value={eachTimeEntry.tuesClose} onChange={handleTimeChange} />
                        </form>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="mr-4">
                        <h5 className="signupTitle">Wednesday Open:</h5>
                        <form>
                          <label for="3open">Select a time:</label>
                          <input type="time" id="3open" name="wedOpen" value={eachTimeEntry.wedOpen} onChange={handleTimeChange}/>
                        </form>
                      </div>
                      <div className="mr-4">
                        <h5 className="signupTitle">Wednesday Close:</h5>
                        <form>
                          <label for="3close">Select a time:</label>
                          <input type="time" id="3close" name="wedClose" value={eachTimeEntry.wedClose} onChange={handleTimeChange}/>
                        </form>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="mr-4">
                        <h5 className="signupTitle">Thursday Open:</h5>
                        <form>
                          <label for="4open">Select a time:</label>
                          <input type="time" id="4open" name="thursOpen" value={eachTimeEntry.thursOpen} onChange={handleTimeChange}/>
                        </form>
                      </div>
                      <div className="mr-4">
                        <h5 className="signupTitle">Thursday Close:</h5>
                        <form>
                          <label for="4close">Select a time:</label>
                          <input type="time" id="4close" name="thursClose" value={eachTimeEntry.thursClose} onChange={handleTimeChange}/>
                        </form>
                      </div>
                    </div>
                    
                    <div className="row mb-4">
                      <div className="mr-4">
                        <h5 className="signupTitle">Friday Open:</h5>
                        <form>
                          <label for="5open">Select a time:</label>
                          <input type="time" id="5open" name="friOpen" value={eachTimeEntry.friOpen} onChange={handleTimeChange}/>
                        </form>
                      </div>
                      <div className="mr-4">
                        <h5 className="signupTitle">Friday Close:</h5>
                        <form>
                          <label for="5close">Select a time:</label>
                          <input type="time" id="5close" name="friClose" value={eachTimeEntry.friClose} onChange={handleTimeChange} />
                        </form>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="mr-4">
                        <h5 className="signupTitle">Saturday Open:</h5>
                        <form>
                          <label for="6open">Select a time:</label>
                          <input type="time" id="6open" name="satOpen" value={eachTimeEntry.satOpen} onChange={handleTimeChange}/>
                        </form>
                      </div>
                      <div className="mr-4">
                        <h5 className="signupTitle">Saturday Close:</h5>
                        <form>
                          <label for="6close">Select a time:</label>
                          <input type="time" id="6close" name="satClose" value={eachTimeEntry.satClose} onChange={handleTimeChange} />
                        </form>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="mr-4">
                        <h5 className="signupTitle">Sunday Open:</h5>
                        <form>
                          <label for="7open">Select a time:</label>
                          <input type="time" id="7open" name="sunOpen" value={eachTimeEntry.sunOpen} onChange={handleTimeChange}/>
                        </form>
                      </div>
                      <div className="mr-4">
                        <h5 className="signupTitle">Sunday Close:</h5>
                        <form>
                          <label for="7close">Select a time:</label>
                          <input type="time" id="7close" name="sunClose" value={eachTimeEntry.sunClose} onChange={handleTimeChange}/>
                        </form>
                      </div>
                    </div>

                    <button className="mt-2 mb-1 register" type="submit">Update Shop</button>
                    </form>
                    </div>
                </div>
                <div className="col sm-4 side"></div>
            </div>
            }
        </div>
    )
}

export default YourShop

