import React, {useState, useEffect} from 'react';
import userProfile from "./userProfile.css"
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';



const UsersProfile = (props) => {
  const {currentUser, usersFeed, userFromDb, currentToken, friends } = props
  const [isOwnProfile, setIsOwnProfile] = useState();
  const [isFriendAlready, setIsFriendAlready] = useState();
  const [tacoCounter, setTacoCounter] = useState(0);
  const [specificUserPosts, setSpecificUserPosts] = useState([]);
  const [imgSrc, setImgSrc] = useState("https://uploader-assets.s3.ap-south-1.amazonaws.com/codepen-default-placeholder.png");

  const checkIfFriends = () =>{
    
    friends.filter((friendship) =>{
        if(friendship.userId == userFromDb.id || friendship.friendId == userFromDb.id){
            setIsFriendAlready(true)
        }
        else{
            setIsFriendAlready(false)
        }
    })
  }

const filterUserFeed = () => {
    let counter = 0;
    let posts = usersFeed.filter((post) =>{
        if (post.userId == userFromDb.id) {
            counter++
            return post
        }
    })
setSpecificUserPosts(posts)
setTacoCounter(counter)
}

const friendshipFields = {
    userId: "",
    friendId: "",
    isPending: false,
}
console.log(userFromDb);

  useEffect(() =>{
    if (currentUser.user.id == userFromDb.id){
        setIsOwnProfile(true)
        setIsFriendAlready(false)
    }
    else{
        if(friends.length != 0){
            checkIfFriends()
            setIsOwnProfile(false)
        }
        else{
            setIsFriendAlready(false)
            setIsOwnProfile(false)
        }
    }
    filterUserFeed()
  }, [userFromDb])

  const addFriend = async () => {
      friendshipFields.userId = currentUser.user.id
      friendshipFields.friendId = userFromDb.id
    let response = await axios.post(`https://localhost:44394/api/friendship/`, friendshipFields, {headers: {Authorization: 'Bearer ' + currentToken}})

  }
  
  //get request for users info, render page with user object received
  // const [specificUserFeed, setSpecificUserFeed] = useState([]);


  return ( 
    <div className="container-fluid main h-100">
        {console.log(userFromDb)}
        {!isOwnProfile && userFromDb && 
      <div className="row mainRow h-100" >
        <div className="col col-3 left"></div>
        <div className="col middle "> 
        <div className="card gedf-card mt-4">
            <div className="card-header">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="m-2">
                            {userFromDb.userName &&
                            <Avatar>{userFromDb.userName[0]}</Avatar>
                            }
                        </div>
                        <div className="ml-2">
                            <div className="h5 m-0">{userFromDb.userName}</div>
                            <div className="h7 text-muted"></div>
                        </div>
                    </div>
                    
                </div>

            </div>
            <div className="card-body">
     
                <h5 className="card-title"> About {userFromDb.userName}:</h5>
                <p className="card-text">
                   Tacos checked in: {tacoCounter}
                </p>
            </div>
            <div className="card-footer">
                {isFriendAlready &&
                <button className="btn btn-primary" onClick={() => {addFriend(); setIsFriendAlready(false)}}>Add Friend</button>
                }
                {!isFriendAlready &&
                <h5>You are friends with {userFromDb.userName}</h5>
                }
            </div>
        </div>
        {specificUserPosts && specificUserPosts.slice(0).reverse().map((post) => {  
            var image = new Image()
            console.log(post);
            if(post.image === null || post.image === ""){
              image.src = imgSrc
            }
            else{
              image.src = post.image; 
            }
                return (
                <div className="container mt-4 "> 
                  <div className="card gedf-card posts mt-5 mb-3" style={{width: "50rem"}} >
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
                            <div className="col"><img src={image.src} height="300em" alt="" /></div>
                            <div className="col">
                                <a className="card-link" href="#">
                                  <h5 className="card-title">{post.user.userName} checked in the {post.taco.name}!</h5>
                                </a>
  
                                <p className="card-text">
                                    {post.description}
                                </p>
                            </div>
                        </div>
                      </div>
                      <div className="card-footer">
                          <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                          <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a>
                          <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
                      </div>
                  </div>
                  </div>
                )
            })}
        </div>
        <div className="col col-3 right"></div>
      </div>
    }
    {isOwnProfile && userFromDb &&
      <div className="row mainRow h-100">
        <div className="col col-3 left"></div>
        <div className="col middle "> 
        <div className="card gedf-card mt-4">
            <div className="card-header">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="m-2">
                        {userFromDb.userName &&
                            <Avatar>{userFromDb.userName[0]}</Avatar>
                            }
                        </div>
                        <div className="ml-2">
                            <div className="h5 m-0">{userFromDb.userName}</div>
                            <div className="h7 text-muted"></div>
                        </div>
                    </div>
                    
                </div>

            </div>
            <div className="card-body">
     
            <h5 className="card-title"> About you:</h5>
                <p className="card-text">
                    <p>{userFromDb.firstName}</p>
                    <p>{userFromDb.email}</p>
                   <b>Tacos checked in: {tacoCounter}</b>
                </p>
            </div>
            <div className="card-footer">
            </div>
        </div>
        {specificUserPosts && specificUserPosts.map((post) => {
            var image = new Image()
            console.log(post);
            if(post.image === null || post.image === ""){
              image.src = imgSrc
            }
            else{
              image.src = post.image; 
            }
              
                return (
                <div className="container mt-4 d-flex justify-content-center "> 
                  <div className="card gedf-card posts mt-5 mb-3 posts" style={{width: "50rem"}}>
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
                            <div className="col"><img src={image.src} height="300em" alt="" /></div>
                            <div className="col">
                          
                                <a className="card-link" href="#">
                                    <h5 className="card-title">You checked in the {post.taco.name}!</h5>
                                </a>
  
                                <p className="card-text">
                                    {post.description}
                                </p>
                            </div>
                        </div>
                      </div>
                      <div className="card-footer">
                          <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                          <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a>
                          <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
                      </div>
                  </div>
                  </div>
                )
              
              
            })}
        </div>
        <div className="col col-3 right"></div>
      </div>
    }
    </div>
   );
}

 
export default UsersProfile;