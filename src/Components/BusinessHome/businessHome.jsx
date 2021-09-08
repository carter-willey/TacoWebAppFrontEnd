import React from 'react';
import UserFeed from '../UserFeed/userFeed';
import home from '../Home/home.css'
import CreateNotification from '../CreateNotifications/createNotification';

const BusinessHome = (props) => {
  const {currentUser, currentToken, usersFeed, allShops, getTacosFromShopByShopId, tacosFromShop} = props
  console.log(usersFeed);
  let businessFeed = usersFeed.filter((post) => {
    if(post.taco.shop.userId == currentUser.user.id)
    return post;
  })
  console.log(businessFeed);
  return ( 
    <div className="container-fluid main">
      <div className="row mainRow">
        <div className="col col-3 left"></div>
        <div className="col middle"> 
            <CreateNotification allShops={allShops} currentToken={currentToken} currentUser={currentUser}
             getTacosFromShopByShopId={getTacosFromShopByShopId}
             tacosFromShop={tacosFromShop}/>
            <UserFeed currentUser={currentUser}
            currentToken={currentToken}
            usersFeed={businessFeed} />
        </div>
        <div className="col col-3 right"></div>
      </div>
    </div>
   );
}
 
export default BusinessHome;