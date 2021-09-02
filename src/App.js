import './App.css';
import React, { useState, useEffect } from "react";
import NavBar from './Components/NavBar/navBar';
import Home from './Components/Home/home';
import LoginForm from './Components/LoginForm/loginForm';
import SignUpForm from './Components/SignUpForm/signUpForm';
import RegisterShop from './Components/RegisterShop/registerShop'; 
import MapPage from './Components/MapPage/mapPage';
import Menu from './Components/Menu/menu';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from 'axios';
import {LoadScript} from '@react-google-maps/api';
import AddTaco from './Components/AddTaco/addTaco';
import UsersProfile from './Components/UserProfile/UserProfile';
import BusinessHome from './Components/BusinessHome/businessHome';
import Notifications from './Components/Notifications/notifications';
import YourShop from './Components/YourShop/yourShop';
import ViewShop from './Components/ViewShop/viewShop';

const libraries = ["places"]

function App() {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState();
  const [usersFeed, setUsersFeed] = useState([]);
  const [allShops, setAllShops] = useState([]);
  const [tacosFromShop, setTacosFromShop] = useState([]);
  const [userFromDb, setUserFromDb] = useState([]);
  const [ownerStatus, setOwnerStatus] = useState();
  const [userClickedOn, setUserClickedOn] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [allShopHours, setAllShopHours] = useState([]);
  const [friends, setFriends] = useState([]);
  const [shopToView, setShopToView] = useState([]);
  const [specificShopHours, setSpecificShopHours] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [wasTacoPosted, setWasTacoPosted] = useState(false);
  const [shopCreated, setShopCreated] = useState();

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
    } catch {
    }
  }, []);

  useEffect( () => {
    if(ownerStatus == true){
      getAllShops()
    }
    else{
      getUserFeed()
      getAllShops()
      getAllUsers()
      getFriends()
    }
  }, [loading])

  useEffect(()=>{
    getAllShops()
  },[shopCreated])

useEffect(()=>{
  getUserFeed()
},[wasTacoPosted])

  useEffect(() => {
    if(currentUser){
      checkOwnerStatus()
    }
    setLoading(false)
  }, [currentUser])

  const getShopHours = async () => {
    let response = await axios.get(`https://localhost:44394/api/shophours/`, {headers: {Authorization: 'Bearer ' + token}})
    console.log(response.data);
    setAllShopHours(response.data)
  }

  const getFriends = async () => {
    let response = await axios.get(`https://localhost:44394/api/friendship/`, {headers: {Authorization: 'Bearer ' + token}})
    setFriends(response.data)
    console.log(response.data);
  }

  const getUserFeed = async () => {
    let response2 = await axios.get("https://localhost:44394/api/posts/", {headers: {Authorization: 'Bearer ' + token}})
    setUsersFeed(response2.data)
  }
  const getUserFromDb = async (userId) => {
     let response = await axios.get(`https://localhost:44394/api/examples/${userId}`, {headers: {Authorization: 'Bearer ' + token}})
     setUserFromDb(response.data)
  }

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  const getAllShops = async () => {
    let response = await axios.get("https://localhost:44394/api/shops/")
    setAllShops(response.data)
  }

  const getAllUsers = async () => {
    let response = await axios.get("https://localhost:44394/api/examples/")
    setAllUsers(response.data)
  }

  const getTacosFromShopByShopId = async (shopId) => {
    let response = await axios.get(`https://localhost:44394/api/tacos/${shopId}`)
    console.log(response.data);
    setTacosFromShop(response.data)
    console.log(tacosFromShop);
  }
  const getShopFromArr = (shopId) =>{
    allShops.filter((shop) => {
      if(shop.shopId == shopId)
      setShopToView(shop)
      getShopHours()
      getTacosFromShopByShopId(shopId)
      getShopHoursFromArr(shopId)
    })
    
  }
  const getShopHoursFromArr = (shopId) => {
    allShopHours.filter((shopHours) => {
      if(shopHours.shopId == shopId){
        setSpecificShopHours(shopHours)
        console.log(shopHours);
      }
    })
  }

  const getTacosFromShopByUserId = async () => {
    let response = await axios.get(`https://localhost:44394/api/tacos/user/${currentUser.user.id}`, {headers: {Authorization: 'Bearer ' + token}})
    console.log(response.data);
    setTacosFromShop(response.data)
    console.log(tacosFromShop);
  }

  const setUserToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    window.location = "/";
  }

  const getNotifications = async () => {
    let response = await axios.get(`https://localhost:44394/api/notifications/`, {headers: {Authorization: 'Bearer ' + token}})
    console.log(response.data);
    setNotifications(response.data)
  }

  const checkOwnerStatus = () => {
    let valueArr = Object.values(currentUser.user)
    if(valueArr.includes("Admin")){
      setOwnerStatus(true)
    }
    else if (valueArr.includes("User")){
      setOwnerStatus(false)
    }
  }
  return (
    <Router>
    <LoadScript
       googleMapsApiKey= {process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
       libraries={libraries}    
     >
      {!loading && ownerStatus &&
      <div>
          <NavBar logout={logout} currentUser={currentUser} getShopHours={getShopHours} ownerStatus={ownerStatus}  />
          <Switch>
            <Route path="/"
            exact
            render={(props) => (<BusinessHome {...props} currentUser={currentUser}
              currentToken={token} usersFeed={usersFeed} allShops={allShops}
              getTacosFromShopByShopId={getTacosFromShopByShopId}
              tacosFromShop={tacosFromShop} />
            )} />
            <Route path="/Signup" render={(props) => <SignUpForm {...props} />} />
            <Route path="/RegisterShop" render={(props) => <RegisterShop {...props} 
              currentUser={currentUser}
              currentToken={token}
              setShopCreated={setShopCreated}
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
            path="/Menu"
            render={(props) => (
              <Menu getTacosFromShopByUserId={getTacosFromShopByUserId} setTacosFromShop={setTacosFromShop} currentToken={token} allShops={allShops} tacosFromShop={tacosFromShop} currentUser={currentUser} />
            )}
            />
            <Route
              path="/yourshop"
              render={(props) => (
              <YourShop {...props} allShopHours={allShopHours} getAllShops={getAllShops} currentUser={currentUser} allShops={allShops} currentToken={token} usersFeed={usersFeed} />
              )}
            />
          </Switch>
      </div>
    } 

    {!loading && !ownerStatus &&
      <div>
          <NavBar logout={logout} allUsers={allUsers} setUserClickedOn={setUserClickedOn} getUserFromDb={getUserFromDb} getAllUsers={getAllUsers} getNotifications={getNotifications} currentUser={currentUser}  />
          <Switch>
            <Route path="/"
            exact
            render={(props) => (<Home {...props} currentUser={currentUser} setWasTacoPosted={setWasTacoPosted}
              currentToken={token} usersFeed={usersFeed} allShops={allShops} getUserFromDb={getUserFromDb}
              getTacosFromShopByShopId={getTacosFromShopByShopId}
              tacosFromShop={tacosFromShop} />
            )} />
            <Route path="/Signup" render={(props) => <SignUpForm {...props} />} />
            <Route
              path="/Login"
              render={(props) => (
                <LoginForm {...props} setUserToken={setUserToken} />
              )}
            />
            <Route
              path="/Map"
              render={(props) => (
                <MapPage {...props} allShops={allShops} tacosFromShop={tacosFromShop} getTacosFromShopByShopId={getTacosFromShopByShopId} getShopFromArr={getShopFromArr} />
              )}
            />
            <Route
              path="/Notifications"
              render={(props) => (
                <Notifications {...props} getShopFromArr={getShopFromArr} currentUser={currentUser} allShops={allShops} notifications={notifications} allShops={allShops} currentToken={token} />
              )}
            />
            <Route
              path="/UserProfile"
              render={(props) => (
              <UsersProfile {...props} userClickedOn={userClickedOn} userFromDb={userFromDb} friends={friends} currentUser={currentUser} allShops={allShops} currentToken={token} usersFeed={usersFeed} />
              )}
            />
            <Route
              path="/viewshop"
              render={(props) => (
              <ViewShop {...props} userFromDb={userFromDb} allShopHours={allShopHours} friends={friends} tacosFromShop={tacosFromShop} shopToView={shopToView} specificShopHours={specificShopHours} friends={friends} currentUser={currentUser} allShops={allShops} currentToken={token} usersFeed={usersFeed} />
              )}
            />
          </Switch>
      </div>
    } 
    </LoadScript>
    </Router>
  );
}

export default App;
