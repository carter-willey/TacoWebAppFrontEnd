import React from 'react';
import {Link} from "react-router-dom";


const UserFeed = (props) => {
  const {currentUser, currentToken, usersFeed, getUserFromDb} = props
  
  
  return ( 
    <div className="container-fluid main h-100">
      <div className="row mainRow h-100">
        <div className="col"></div>
        <div className="col">
          <row>
          {currentUser.user.username}'s Feed
          </row>
          <row>
            {usersFeed.map((post) => {
              return (
                
                <div className="card gedf-card">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mr-2">
                                    <img className="rounded-circle" width="45" src="https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg" alt="" />
                                </div>
                                <div className="ml-2">
                                    <div className="h5 m-0">{post.user.userName}</div>
                                    <div className="h7 text-muted">{post.taco.shop.name}</div>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                    <div className="card-body">
                        <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i>10 min ago</div>
                        
                            <Link to="/userprofile"  onClick={() =>  getUserFromDb(post.user.id)}
                            >{post.user.userName} checked in the {post.taco.name}!</Link>
                    

                        <p className="card-text">
                            {post.description}
                        </p>
                    </div>
                    <div className="card-footer">
                        <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                        <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a>
                        <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
                    </div>
                </div>
              )
            })}
               
          </row>
        </div> 
        <div className="col"></div>
      </div>
    </div>
   );
}
 
export default UserFeed;