import React, {useState, useEffect} from 'react';
import axios from 'axios';



const ViewShop = (props) => {
  const {currentUser, usersFeed, userFromDb, currentToken, shopToView, specificShopHours, allShopHours, tacosFromShop, friends  } = props
  const [isFriendAlready, setIsFriendAlready] = useState(false);

  const checkIfFriends = () =>{
    console.log(friends);
    friends.filter((friendship) =>{
        if(friendship.userId == shopToView.userId || friendship.friendId == shopToView.userId){
            setIsFriendAlready(true)
        }
    })
  }
  // checkIfFriends()

  const friendshipFields = {
      userId: "",
      friendId: "",
      isPending: false,
  }
// console.log(userFromDb);

  useEffect(() =>{
    checkIfFriends()
  }, [shopToView])

  const addFriend = async () => {
      friendshipFields.userId = currentUser.user.id
      friendshipFields.friendId = shopToView.userId
    let response = await axios.post(`https://localhost:44394/api/friendship/`, friendshipFields, {headers: {Authorization: 'Bearer ' + currentToken}})

  }
  
  //get request for users info, render page with user object received
  // const [specificUserFeed, setSpecificUserFeed] = useState([]);


  return ( 
    <div className="container-fluid main h-100">
        {shopToView && specificShopHours &&
      <div className="row mainRow h-100">
        {console.log(shopToView)}
        <div className="col col-3 left"></div>
        <div className="col middle "> 
        <div className="card gedf-card my-4">
            <div className="card-header">
                <div className="d-flex justify-content-center align-items-center">
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="m-2">
                            <img className="rounded-circle" width="45" src="https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg" alt="" />
                        </div>
                        <div className="ml-2">
                            <div className="h5 m-0">{shopToView.name}</div>
                            <div className="h7 text-muted"></div>
                        </div>
                    </div>
                    
                </div>

            </div>
            <div className="card-body">
     
                    <h5 className="card-title"> Address:</h5> <span>{shopToView.address}</span> 
                <br/>
                <p className="card-text">
                <br/>
                   <h5>Hours:</h5>
                   Monday: {specificShopHours.monOpen} to {specificShopHours.monClose} <br/>
                   Tuesday: {specificShopHours.tuesOpen} to {specificShopHours.tuesClose} <br/>
                   Wednesday: {specificShopHours.wedOpen} to {specificShopHours.wedClose} <br/>
                   Thursday: {specificShopHours.thursOpen} to {specificShopHours.thursClose} <br/>
                   Friday: {specificShopHours.friOpen} to {specificShopHours.friClose} <br/>
                   Saturday: {specificShopHours.satOpen} to {specificShopHours.satClose} <br/>
                   Sunday: {specificShopHours.sunOpen} to {specificShopHours.sunClose} <br/>

                </p>
            </div>
            <div className="card-footer">
                {!isFriendAlready &&
                <button className="btn btn-primary" onClick={() => addFriend(), setIsFriendAlready(true)}>Follow {shopToView.name}</button>
                }
                {isFriendAlready &&
                <h5>You are following {shopToView.name}</h5>
                }
            </div>
        </div>
        <h3>{shopToView.name} Menu:</h3>
        {tacosFromShop.map((taco) => {
                        
                        return(
                    <div className="card gedf-card my-3">
                        <div className="card-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-between align-items-center">
                                
                                    <div className="ml-2">
                                        <div className="h5 m-0">{taco.name} <span className="tacoPrice" >${taco.price}</span></div>
                                     </div>
                                </div>
                            
                            </div>

                        </div>
                        <div className="card-body">
                            <p>{taco.averageRating}/5  {taco.numberOfRatings} reviews</p>
                            <p className="card-text">
                                {taco.description}
                            </p>
                            
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

 
export default ViewShop;

// {isOwnProfile &&
//   <div className="row mainRow h-100">
//     <div className="col col-3 left"></div>
//     <div className="col middle "> 
//     <div className="card gedf-card mt-4">
//         <div className="card-header">
//             <div className="d-flex justify-content-center align-items-center">
//                 <div className="d-flex justify-content-center align-items-center">
//                     <div className="m-2">
//                         <img className="rounded-circle" width="45" src="https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg" alt="" />
//                     </div>
//                     <div className="ml-2">
//                         <div className="h5 m-0">{userFromDb.userName}</div>
//                         <div className="h7 text-muted"></div>
//                     </div>
//                 </div>
                
//             </div>

//         </div>
//         <div className="card-body">
 
//                 <h5 className="card-title"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis sequi nisi, eligendi fuga modi perspiciatis ea eum dolores magnam quasi aliquid harum, autem explicabo delectus ipsa ducimus laboriosam odio unde.</h5>

//             <p className="card-text">
               
//             </p>
//         </div>
//         <div className="card-footer">
//         </div>
//     </div>
//     {usersFeed.map((post) => {
//           if (post.userId == currentUser.user.id) {
//             return (
//             <div className="container mt-4 "> 
//               <div className="card gedf-card posts mt-5 mb-3" >
//                   <div className="card-header">
//                       <div className="d-flex justify-content-between align-items-center">
//                           <div className="d-flex justify-content-between align-items-center">
//                               <div className="mr-2">
//                                   <img className="rounded-circle" width="45" src="https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg" alt="" />
//                               </div>
//                               <div className="ml-2">
//                                   <div className="h5 m-0">{post.user.userName}</div>
//                                   <div className="h7 text-muted">{post.taco.shop.name}</div>
//                               </div>
//                           </div>
                          
//                       </div>

//                   </div>
//                   <div className="card-body">
//                       <div className="text-muted h7 mb-2"> <i className="fa fa-clock-o"></i>10 min ago</div>
//                       <a className="card-link" href="#">
//                           <h5 className="card-title">{post.user.userName} checked in the {post.taco.name}!</h5>
//                       </a>

//                       <p className="card-text">
//                           {post.description}
//                       </p>
//                   </div>
//                   <div className="card-footer">
//                       <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
//                       <a href="#" className="card-link"><i className="fa fa-comment"></i> Comment</a>
//                       <a href="#" className="card-link"><i className="fa fa-mail-forward"></i> Share</a>
//                   </div>
//               </div>
//               </div>
//             )
//           }
          
//         })}
//     </div>
//     <div className="col col-3 right"></div>
//   </div>
// }