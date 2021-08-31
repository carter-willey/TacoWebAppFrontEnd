import React, {useEffect, useState} from 'react';  
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import ShopAddressSearch from '../ShopAddressSearch/shopAddressSearch';
import registerShop from "./registerShop.css"


const RegisterShop = (props) => {
  const {currentToken, currentUser, setShopCreated} = props;

    const history = useHistory()
    const [eachTimeEntry, setEachTimeEntry] = useState()
    const [shopNameError, setShopNameError] = useState({})
    const [addressError, setAddressError] = useState({})
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const eachEntry = {
      userid: currentUser.user.id,
      name: name,
      address: address,
      lat: lat,
      lng: lng,       
    }



    const signUpFormValidation = () => {
        const shopNameError = {};
        const addressError = {};

        let isValid = true;
        if (eachEntry.name.trim().length === 0 ){
            shopNameError.shopNameEmpty = "Shop name is required";
            isValid = false;
        }
        if(eachEntry.address.trim().length === 0){
            addressError.addressEmpty = "Address is required";
            isValid = false;
        }

        setShopNameError(shopNameError);
        setAddressError(addressError);
        return isValid;
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        Register();
        
    }
    const handleChange = (event) => {
        setName(event.target.value);
      };
      
      const handleTimeChange = (event) => {
        setEachTimeEntry({...eachTimeEntry, [event.target.name]: event.target.value})
        console.log(eachTimeEntry);
      }

    const Register = async () => {
        let userData = eachEntry;
        let shopHours = eachTimeEntry;
        
        const isValid = signUpFormValidation();
        if(isValid){
          console.log(userData);
            let response = await axios.post("https://localhost:44394/api/shops/", userData, { headers: {Authorization: 'Bearer ' + currentToken}});
            console.log(response.data);
            if (response.data.length !== 0){
              shopHours.shopId = response.data.shopId;
              let response2 = await axios.post("https://localhost:44394/api/shophours/", shopHours, { headers: {Authorization: 'Bearer ' + currentToken}});
              setShopCreated(response.data)
              history.push("/")
            }
        }
    }
    return (
        <div className="container-fluid mt-5 "> 
            <div className="row ">
                <div className="col sm-4 side"></div>
                <div className="col sm-4 d-flex justify-content-center">
                <div className="">
                    <h1 className="title">{currentUser.user.username}, Register your shop!</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h5 className="signupTitle">Shop Name:</h5>
                        <input  className="form-control " value={eachEntry.name} name="name" placeholder="Shop name..." onChange={handleChange}></input>
                    
                       </div>

                    
                    <h5 className="signupTitle">Shop Address:</h5>
                    <div>
                    <ShopAddressSearch setAddress={setAddress} setLat={setLat} setLng={setLng}/>
                    {/* <input  className="form-control" value={eachEntry.address} name="address" placeholder="Address..." onChange={handleChange}></input> */}
                    
                    </div>
                    <div className="row mb-4 mt-4">
                      <div className="mr-4">
                        <h5 className="signupTitle">Monday Open:</h5>
                        <form>
                          <label for="1open">Select a time:</label>
                          <input type="time" name="monOpen"  onChange={handleTimeChange}/>
                        </form>
                      </div>
                      <div>
                        <h5 className="signupTitle">Monday Close:</h5>
                        <form>
                          <label for="1.close">Select a time:</label>
                          <input type="time"  name="monClose"  onChange={handleTimeChange}/>
                        </form>
                      </div>
                    </div>
                    
                    <div className="row mb-4">
                      <div className="mr-4">
                        <h5 className="signupTitle">Tuesday Open:</h5>
                        <form>
                          <label for="2open">Select a time:</label>
                          <input type="time" id="2open" name="tuesOpen" onChange={handleTimeChange} />
                        </form>
                      </div>
                      <div className="mr-4">
                        <h5 className="signupTitle">Tuesday Close:</h5>
                        <form>
                          <label for="2close">Select a time:</label>
                          <input type="time" id="2close" name="tuesClose"  onChange={handleTimeChange} />
                        </form>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="mr-4">
                        <h5 className="signupTitle">Wednesday Open:</h5>
                        <form>
                          <label for="3open">Select a time:</label>
                          <input type="time" id="3open" name="wedOpen"  onChange={handleTimeChange}/>
                        </form>
                      </div>
                      <div className="mr-4">
                        <h5 className="signupTitle">Wednesday Close:</h5>
                        <form>
                          <label for="3close">Select a time:</label>
                          <input type="time" id="3close" name="wedClose"  onChange={handleTimeChange}/>
                        </form>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="mr-4">
                        <h5 className="signupTitle">Thursday Open:</h5>
                        <form>
                          <label for="4open">Select a time:</label>
                          <input type="time" id="4open" name="thursOpen"  onChange={handleTimeChange}/>
                        </form>
                      </div>
                      <div className="mr-4">
                        <h5 className="signupTitle">Thursday Close:</h5>
                        <form>
                          <label for="4close">Select a time:</label>
                          <input type="time" id="4close" name="thursClose" onChange={handleTimeChange}/>
                        </form>
                      </div>
                    </div>
                    
                    <div className="row mb-4">
                      <div className="mr-4">
                        <h5 className="signupTitle">Friday Open:</h5>
                        <form>
                          <label for="5open">Select a time:</label>
                          <input type="time" id="5open" name="friOpen"  onChange={handleTimeChange}/>
                        </form>
                      </div>
                      <div className="mr-4">
                        <h5 className="signupTitle">Friday Close:</h5>
                        <form>
                          <label for="5close">Select a time:</label>
                          <input type="time" id="5close" name="friClose" onChange={handleTimeChange} />
                        </form>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="mr-4">
                        <h5 className="signupTitle">Saturday Open:</h5>
                        <form>
                          <label for="6open">Select a time:</label>
                          <input type="time" id="6open" name="satOpen" onChange={handleTimeChange}/>
                        </form>
                      </div>
                      <div className="mr-4">
                        <h5 className="signupTitle">Saturday Close:</h5>
                        <form>
                          <label for="6close">Select a time:</label>
                          <input type="time" id="6close" name="satClose" onChange={handleTimeChange} />
                        </form>
                      </div>
                    </div>

                    <div className="row mb-4">
                      <div className="mr-4">
                        <h5 className="signupTitle">Sunday Open:</h5>
                        <form>
                          <label for="7open">Select a time:</label>
                          <input type="time" id="7open" name="sunOpen"  onChange={handleTimeChange}/>
                        </form>
                      </div>
                      <div className="mr-4">
                        <h5 className="signupTitle">Sunday Close:</h5>
                        <form>
                          <label for="7close">Select a time:</label>
                          <input type="time" id="7close" name="sunClose"  onChange={handleTimeChange}/>
                        </form>
                      </div>
                    </div>

                    <button className="mt-2 mb-1 btn btn-primary register" type="submit">Register Shop</button>
                    </form>
                    </div>
                </div>
                <div className="col sm-4 side"></div>
            </div>
        </div>
    )
}

export default RegisterShop