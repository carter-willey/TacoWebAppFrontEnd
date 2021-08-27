import './App.css';
import React, { useState, useEffect } from "react";
import NavBar from './Components/NavBar/navBar';
import Home from './Components/Home/home';
import LoginForm from './Components/LoginForm/loginForm';
import SignUpForm from './Components/SignUpForm/signUpForm';
import RegisterShop from './Components/RegisterShop/registerShop'; 
import MapPage from './Components/MapPage/mapPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from 'axios';
import {LoadScript} from '@react-google-maps/api';
import AddTaco from './Components/AddTaco/addTaco';



const libraries = ["places"]

function App() {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState();
  const [usersFeed, setUsersFeed] = useState([]);
  const [allShops, setAllShops] = useState([]);
  const [tacosFromShop, setTacosFromShop] = useState([]);
  
  useEffect(async () => {
    const jwtToken = localStorage.getItem("token");
    setToken(jwtToken);

    try {
      const user = jwtDecode(jwtToken);
      const expirationTime = (user.exp * 1000) - 60000
      if (Date.now() >= expirationTime) {
        console.log('here')
        logout();
      }
      setCurrentUser({ user });
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }, []);

  useEffect( () => {
    
    //  let response = await axios.get("https://localhost:44394/api/users/user/", {headers: {Authorization: 'Bearer ' + token}})
    //  console.log(response.data);
      getUserFeed()
      console.log(currentUser);
      getAllShops()
  }, [loading])

  const getUserFeed = async () => {
    let response2 = await axios.get("https://localhost:44394/api/posts/", {headers: {Authorization: 'Bearer ' + token}})
      setUsersFeed(response2.data)
  }

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  const getAllShops = async () => {
    let response = await axios.get("https://localhost:44394/api/shops/")
    setAllShops(response.data)

  }

  const getTacosFromShop = async (shopId) => {
    let response = await axios.get(`https://localhost:44394/api/tacos/${shopId}`)
    console.log(response.data);
    setTacosFromShop(response.data)
    console.log(tacosFromShop);
  }


  const setUserToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    window.location = "/";
  }
  return (
    <Router>

      {!loading &&
       <LoadScript
       googleMapsApiKey= {process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
       libraries={libraries}    
     >
      <div>
          <NavBar logout={logout} currentUser={currentUser}  />
          <Switch>
            <Route path="/"
            exact
            render={(props) => (<Home {...props} currentUser={currentUser}
              currentToken={token} usersFeed={usersFeed} allShops={allShops}
              getTacosFromShop={getTacosFromShop}
              tacosFromShop={tacosFromShop} />
            )} />
            <Route path="/Signup" render={(props) => <SignUpForm {...props} />} />
            <Route path="/RegisterShop" render={(props) => <RegisterShop {...props} 
              currentUser={currentUser}
              currentToken={token}
            />} />
            <Route
              path="/Login"
              render={(props) => (
                <LoginForm {...props} setUserToken={setUserToken} />
              )}
            />
            <Route
              path="/Map"
              render={(props) => (
                <MapPage {...props} allShops={allShops} />
              )}
            />
            <Route
              path="/AddTaco"
              render={(props) => (
                <AddTaco {...props} currentUser={currentUser} allShops={allShops} currentToken={token} />
              )}
            />
          </Switch>
      </div>
      </LoadScript>
    } 
    </Router>
  );
}

export default App;
