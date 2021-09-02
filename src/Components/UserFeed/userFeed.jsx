import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';


const UserFeed = (props) => {
  const {currentUser, currentToken, usersFeed, getUserFromDb} = props
  const [imgSrc, setImgSrc] = useState("https://uploader-assets.s3.ap-south-1.amazonaws.com/codepen-default-placeholder.png");
  
  return ( 
   
      <div className="row mainRow h-100">
        <div className="col"></div>
        <div className="col">
          <h3>Your Feed:</h3>
          {usersFeed.slice(0).reverse().map((post) => {
            var image = new Image()
            console.log(post);
            if(post.image === null || post.image === ""){
              image.src = imgSrc
            }
            else{
              image.src = post.image; 
            }

            return (
                <div className="card gedf-card my-4">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mr-2">
                                    <Avatar>{post.user.userName[0]}</Avatar>
                                </div>
                                <div className="ml-2">
                                    <div className="h5 m-0">{post.user.userName}</div>
                                    <div className="h7 text-muted">{post.taco.shop.name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        {console.log(post)}
                        <div className="col"><img src={image.src} height="300em" alt="" /></div>
                        <div className="col">
                          <Link to="/userprofile"  onClick={async () => await getUserFromDb(post.user.id)}
                          >{post.user.userName} checked in the {post.taco.name}!</Link>
                          
                          <p className="card-text">
                              {post.description}
                          </p>
                          <p>{post.rating} / 5</p>

                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                        <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                        <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a>
                        <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
                    </div>
                </div>
              )
            })}
        </div> 
        <div className="col"></div>
      </div>

   );
}
 
export default UserFeed;