import React from 'react';
import UserFeed from '../UserFeed/userFeed';
import home from '../Home/home.css'
import CreateNotification from '../CreateNotifications/createNotification';

const BusinessHome = (props) => {
  const {currentUser, currentToken, usersFeed, allShops, getTacosFromShop, tacosFromShop} = props
  return ( 
    <div className="container-fluid main h-100">
      <div className="row mainRow h-100">
        <div className="col col-3 left"></div>
        <div className="col middle "> 
            <CreateNotification allShops={allShops} currentToken={currentToken} currentUser={currentUser}
             getTacosFromShop={getTacosFromShop}
             tacosFromShop={tacosFromShop}/>
            <UserFeed currentUser={currentUser}
            currentToken={currentToken}
            usersFeed={usersFeed} />
        </div>
        <div className="col col-3 right"></div>
      </div>
    </div>
   );
}
 
export default BusinessHome;