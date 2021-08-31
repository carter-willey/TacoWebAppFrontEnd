import React from 'react';
import navlogo from '../NavBar/navlogo.png'
import { useHistory} from 'react-router-dom';
import navBar from './navBar.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Prompt
} from "react-router-dom";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'


const NavBar = (props) => {
  const {currentUser, logout, ownerStatus,  getNotifications,  setUserClickedOn, getShopHours,getUserFromDb, allUsers } = props
  const items = allUsers;
  const history = useHistory()

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    getUserFromDb(item.id)
    history.push("/userprofile")
    console.log(item)
  }

  const handleOnFocus = () => {
    console.log('Focused')
    console.log(allUsers);
  }

  const formatResult = (item) => {
    return item;
   // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
  }


  return ( 
    <nav className="navbar navbar-expand-lg navbar-light bg" style={{backgroundColor: "#f5bd3b"}} >
     {/* if current use is not business owner */}
    {currentUser && ownerStatus &&
    <>
      <a className="navbar-brand" ><img src={navlogo} height="50px"></img>{currentUser.user.username}!</a>
      
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
            <Link className="nav-link" as={Link} to="/yourshop" onClick={() => {getShopHours()}}>Your Shop</Link>
          </li>
          <li>
          <Link className="nav-link" href="/login" as={Link} onClick={logout} >Logout</Link>
          </li>
        </ul>
      </div>
    </>
    }
    {currentUser && !ownerStatus &&
    <>
      <a href="#" class="navbar-left"><img src={navlogo} height="50px" /></a>
      
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" as={Link} to="/Map" >Map</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" onClick={() => getNotifications()}  to="/Notifications">Notifications</Link>
          </li>
          <li className="nav-item">
          <Link className="nav-link" onClick={() => getUserFromDb(currentUser.user.id)} to="/userprofile" >Profile</Link>
          </li>
          <li>
          <Link className="nav-link" to="/login" as={Link} onClick={logout} >Logout</Link>
          </li>
        </ul>
          {allUsers &&
          <div style={{ width: 400 }}>
            <ReactSearchAutocomplete
                items={items}
                fuseOptions={{keys: ["userName"]}}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                autoFocus
                formatResult={formatResult}
                resultStringKeyName={"userName"}
              />
            </div>
          }
          
    </div>
    </>
    }
    
  </nav>

   );
}
 
export default NavBar;