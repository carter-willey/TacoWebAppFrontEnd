import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = (props) => {
  const {currentUser, logout }= props
  return ( 
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    {currentUser &&
    <a className="navbar-brand" href="#">Welcome to Tacodex, {currentUser.user.username}!</a>
    }
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Map</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Notifications</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Profile</a>
        </li>
        <li>
        <a className="nav-link" href="#" as={Link} onClick={logout} >Logout</a>
        </li>
      </ul>
      <form className="searchBar form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
   );
}
 
export default NavBar;