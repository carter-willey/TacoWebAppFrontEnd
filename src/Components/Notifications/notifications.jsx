import React from 'react';
import {Link} from "react-router-dom";


const Notifications = (props) => {
  const {currentUser, notifications, getUserFromDb, allShops} = props
  // const [, set] = useState();
  console.log(allShops);
  
  return ( 
    <div className="container-fluid main h-100">
      <div className="row mainRow h-100">
        <div className="col"></div>
        <div className="col">
          <div className="row">
          {currentUser.user.username}'s Notification Feed:
          </div>
          <div className="">
            {notifications.map((note) => {
              return (
                
                <div className="card gedf-card my-4">
                  {console.log(note)}
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="mr-2">
                                    <img className="rounded-circle" width="45" src="https://www.ncenet.com/wp-content/uploads/2020/04/No-image-found.jpg" alt="" />
                                </div>
                                <div className="ml-2">
                                    <div className="h5 m-0">{note.shop.name}</div>
                                    <div className="h7 text-muted"></div>
                                </div>
                            </div>
                            
                        </div>

                    </div>
                    <div className="card-body">
                        
                            <Link to="/userprofile"  onClick={() => { getUserFromDb(note.user.id)}}
                            >New notification!</Link>
                    

                        <p className="card-text">
                            {note.text}
                        </p>
                    </div>
                </div>
              )
            })}
               
          </div>
        </div> 
        <div className="col"></div>
      </div>
    </div>
   );
}
 
export default Notifications;