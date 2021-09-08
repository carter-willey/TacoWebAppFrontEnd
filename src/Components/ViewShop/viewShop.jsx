import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';



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
                        <Avatar>{shopToView.name[0]}</Avatar>
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
