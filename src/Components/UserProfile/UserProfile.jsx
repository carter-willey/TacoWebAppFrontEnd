import React, {useState, useEffect} from 'react';
import userProfile from "./userProfile.css"



const UsersProfile = (props) => {
  const {currentUser, currentToken, userFromDb, usersFeed} = props
  //get request for users info, render page with user object received
  // const [specificUserFeed, setSpecificUserFeed] = useState([]);

  
  return ( 
    
    <div className="container-fluid main h-100">
      <div className="row mainRow h-100">
        <div className="col col-3 left"></div>
        <div className="col middle "> 
        <div className="card gedf-card mt-4">
            <div className="card-header">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="m-2">
                            <img className="rounded-circle" width="45" src="https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg" alt="" />
                        </div>
                        <div className="ml-2">
                            <div className="h5 m-0">Name</div>
                            <div className="h7 text-muted"></div>
                        </div>
                    </div>
                    
                </div>

            </div>
            <div className="card-body">
     
                    <h5 className="card-title"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis sequi nisi, eligendi fuga modi perspiciatis ea eum dolores magnam quasi aliquid harum, autem explicabo delectus ipsa ducimus laboriosam odio unde.</h5>

                <p className="card-text">
                   
                </p>
            </div>
            <div className="card-footer">
                <button className="btn btn-primary">Add Friend</button>
            </div>
        </div>
        {usersFeed.map((post) => {
              if (post.userId == currentUser.user.id) {
                return (
                <div className="container mt-4 "> 
                  <div className="card gedf-card posts mt-5 mb-3" >
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
                          <a className="card-link" href="#">
                              <h5 className="card-title">{post.user.userName} checked in the {post.taco.name}!</h5>
                          </a>
  
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
                  </div>
                )
              }
              
            })}
        </div>
        <div className="col col-3 right"></div>
      </div>
    </div>
   );
}

 
export default UsersProfile;