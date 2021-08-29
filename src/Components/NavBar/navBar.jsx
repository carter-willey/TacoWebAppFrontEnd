import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Prompt
} from "react-router-dom";

const NavBar = (props) => {
  const {currentUser, logout, ownerStatus }= props
  return ( 
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
     {/* if current use is not business owner */}
    {currentUser && ownerStatus &&
    <>
      <a className="navbar-brand" >Welcome to Tacodex, {currentUser.user.username}!</a>
      
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link"  to="/">Home <span className="sr-only">(current)</span></Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/Menu" as={Link}>Menu</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" as={Link} to="/userprofile">Your Shop</Link>
          </li>
          <li>
          <Link className="nav-link" href="/login" as={Link} onClick={logout} >Logout</Link>
          </li>
        </ul>
        <form className="searchBar form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </>
    }
    {currentUser && !ownerStatus &&
    <>
      <a className="navbar-brand" >Welcome to Tacodex, {currentUser.user.username}!</a>
      
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" as={Link} href="/Map" >Map</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="#">Notifications</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" as={Link} href="/userprofile">Profile</Link>
          </li>
          <li>
          <Link className="nav-link" href="/login" as={Link} onClick={logout} >Logout</Link>
          </li>
        </ul>
        <form className="searchBar form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </div>
    </>
    }
    
  </nav>

   );
}
 
export default NavBar;