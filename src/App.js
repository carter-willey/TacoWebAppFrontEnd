import './App.css';
import React, { useState, useEffect } from "react";
import NavBar from './Components/NavBar/navBar';
import Home from './Components/Home/home';
import LoginForm from './Components/LoginForm/loginForm';
import SignUpForm from './Components/SignUpForm/signUpForm';
import RegisterShop from './Components/RegisterShop/registerShop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import jwtDecode from "jwt-decode";



function App() {
  const [token, setToken] = useState();
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState();
  
  useEffect(() => {
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
      console.log(currentUser);
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  const setUserToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    window.location = "/";
  }
  return (
    <Router>
    <div>
        <NavBar />
        <Switch>
          <Route path="/"
          exact
          render={(props) => (<Home {...props} />
          )} />
          <Route path="/Signup" render={(props) => <SignUpForm {...props} />} />
          <Route path="/RegisterShop" render={(props) => <RegisterShop {...props} />} />
          <Route
            path="/Login"
            render={(props) => (
              <LoginForm {...props} setUserToken={setUserToken} />
            )}
          />
        </Switch>
    </div>
    </Router>
  );
}

export default App;
