import React from 'react';
import UserFeed from '../UserFeed/userFeed';
import home from './home.css'

const Home = (props) => {
  const {currentUser, currentToken, usersFeed} = props
  return ( 
    <div className="container-fluid main h-100">
      <div className="row mainRow h-100">
        <div className="col col-3 left"></div>
        <div className="col middle "> 
            <UserFeed currentUser={currentUser}
            currentToken={currentToken}
            usersFeed={usersFeed} />
        </div>
        <div className="col col-3 right"></div>
      </div>
    </div>
   );
}
 
export default Home;