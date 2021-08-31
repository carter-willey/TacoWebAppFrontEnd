import React, {useState, useEffect} from 'react';
import userProfile from "./userProfile.css"
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';



const UsersProfile = (props) => {
  const {currentUser, usersFeed, userClickedOn, currentToken, friends } = props
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isFriendAlready, setIsFriendAlready] = useState(false);
  const [tacoCounter, setTacoCounter] = useState(0);
  const [specificUserPosts, setSpecificUserPosts] = useState([]);

  const checkIfFriends = () =>{
    console.log(friends);
    friends.filter((friendship) =>{
        if(friendship.userId == userClickedOn.id || friendship.friendId == userClickedOn.id){
            setIsFriendAlready(true)
        }
    })
  }

const filterUserFeed = () => {
    let counter = 0;
    let posts = usersFeed.filter((post) =>{
        if (post.userId == userClickedOn.id) {
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
console.log(userClickedOn);

  useEffect(() =>{
    if (currentUser.user.id == userClickedOn.id){
        setIsOwnProfile(true)
    }
    else{
        checkIfFriends()
    }
    filterUserFeed()
  }, [currentUser])

  const addFriend = async () => {
      friendshipFields.userId = currentUser.user.id
      friendshipFields.friendId = userClickedOn.id
    let response = await axios.post(`https://localhost:44394/api/friendship/`, friendshipFields, {headers: {Authorization: 'Bearer ' + currentToken}})

  }
  
  //get request for users info, render page with user object received
  // const [specificUserFeed, setSpecificUserFeed] = useState([]);


  return ( 
    <div className="container-fluid main h-100">
        {console.log(userClickedOn)}
        {!isOwnProfile &&
      <div className="row mainRow h-100" >
        <div className="col col-3 left"></div>
        <div className="col middle "> 
        <div className="card gedf-card mt-4">
            <div className="card-header">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="m-2">
                            {userClickedOn.userName &&
                            <Avatar>{userClickedOn.userName[0]}</Avatar>
                            }
                        </div>
                        <div className="ml-2">
                            <div className="h5 m-0">{userClickedOn.userName}</div>
                            <div className="h7 text-muted"></div>
                        </div>
                    </div>
                    
                </div>

            </div>
            <div className="card-body">
     
                <h5 className="card-title"> About {userClickedOn.userName}:</h5>
                <p className="card-text">
                   Tacos checked in: {tacoCounter}
                </p>
            </div>
            <div className="card-footer">
                {!isFriendAlready &&
                <button className="btn btn-primary" onClick={() => addFriend(), setIsFriendAlready(true)}>Add Friend</button>
                }
                {isFriendAlready &&
                <h5>You are friends with{userClickedOn.userName}</h5>
                }
            </div>
        </div>
        {specificUserPosts && specificUserPosts.map((post) => {  
                return (
                <div className="container mt-4 "> 
                  <div className="card gedf-card posts mt-5 mb-3" style={{width: "750rem"}} >
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
            })}
        </div>
        <div className="col col-3 right"></div>
      </div>
    }
    {isOwnProfile &&
      <div className="row mainRow h-100">
        <div className="col col-3 left"></div>
        <div className="col middle "> 
        <div className="card gedf-card mt-4">
            <div className="card-header">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="m-2">
                        {userClickedOn.userName &&
                            <Avatar>{userClickedOn.userName[0]}</Avatar>
                            }
                        </div>
                        <div className="ml-2">
                            <div className="h5 m-0">{userClickedOn.userName}</div>
                            <div className="h7 text-muted"></div>
                        </div>
                    </div>
                    
                </div>

            </div>
            <div className="card-body">
     
            <h5 className="card-title"> About you:</h5>
                <p className="card-text">
                   Tacos checked in: {tacoCounter}
                </p>
            </div>
            <div className="card-footer">
            </div>
        </div>
        {specificUserPosts && specificUserPosts.map((post) => {
              
                return (
                <div className="container mt-4 d-flex justify-content-center "> 
                  <div className="card gedf-card posts mt-5 mb-3 posts">
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
                          <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i>10 min ago</div>
                          <a className="card-link" href="#">
                              <h5 className="card-title">You checked in the {post.taco.name}!</h5>
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
              
              
            })}
        </div>
        <div className="col col-3 right"></div>
      </div>
    }
    </div>
   );
}

 
export default UsersProfile;