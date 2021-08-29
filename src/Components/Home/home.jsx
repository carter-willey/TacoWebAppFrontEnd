import React from 'react';
import CreatePost from '../CreatePost/createPost';
import UserFeed from '../UserFeed/userFeed';
import home from './home.css'

const Home = (props) => {
  const {currentUser, currentToken, usersFeed, allShops, getTacosFromShopByShopId, tacosFromShop, getUserFromDb} = props
  return ( 
    <div className="container-fluid main">
      <div className="row mainRow">
        <div className="col col-3 left"></div>
        <div className="col middle "> 
            <CreatePost allShops={allShops} currentToken={currentToken} currentUser={currentUser}
             getTacosFromShopByShopId={getTacosFromShopByShopId}
             tacosFromShop={tacosFromShop}/>
            <UserFeed currentUser={currentUser} getUserFromDb={getUserFromDb}
            currentToken={currentToken}
            usersFeed={usersFeed} />
        </div>
        <div className="col col-3 right"></div>
      </div>
    </div>
   );
}
 
export default Home;