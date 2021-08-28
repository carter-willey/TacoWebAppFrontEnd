import axios from 'axios';
import React, {useState} from 'react';

const CreateNotification = (props) => {
  const [notificationText, setNotificationText] = useState("");
  const {allShops, currentUser, currentToken, getTacosFromShop, tacosFromShop} = props

  const notificationFields = {
    userId: currentUser.user.id,
    text: notificationText,
  }
 

  const submitPost = async (event) => {
    event.preventDefault();
    await axios.post("https://localhost:44394/api/notifications/", notificationFields, {headers: {Authorization: 'Bearer ' + currentToken}})
    console.log("posted!");
  }

  const handleChange = (event) => {
    setNotificationText(event.target.value)
  }

  return ( 
    <div className="card gedf-card">
    <div className="card-header">
        <span>Post to your followers!</span>
    </div>
    <div className="card-body">
 
            <form className="form-group search" onSubmit={submitPost} >
                
      
                  <label>What would you like to post to your followers?:</label>
                  <textarea className="form-control" rows="3" placeholder="What would you like to post?" value={notificationText} onChange={handleChange}/>
                  <div className="btn-group">
                    <button type="submit" className="btn btn-primary">Post</button>
                  </div>
              </form>

    </div>
</div>
   );
}
 
export default CreateNotification;