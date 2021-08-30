import React, {useEffect, useState} from 'react';
import { useHistory} from 'react-router-dom';
import axios from 'axios';

import Mmnu from './menu.css';
import AddTaco from '../AddTaco/addTaco';

const Menu = (props) => {
  const {currentUser, getTacosFromShopByUserId, tacosFromShop, allShops, currentToken,setTacosFromShop} = props
  const [newTacoArr, setNewTacoArr] = useState(tacosFromShop);

  useEffect( () => {
    getTacosFromShopByUserId()
  },[])

  useEffect(() => {
    getTacosFromShopByUserId()
  }, [newTacoArr])


  return ( 
    <div className="container-fluid"> 
            <div className="row">
                <div className="col sm-4 side"></div>
                <div className="col sm-4">
                <AddTaco {...props} currentUser={currentUser} newTacoArr={newTacoArr} setNewTacoArr={setNewTacoArr} setTacosFromShop={setTacosFromShop} tacosFromShop={tacosFromShop} allShops={allShops} currentToken={currentToken} />
                    {tacosFromShop &&
                    
                    tacosFromShop.map((taco) => {
                        
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
                <div className="col sm-4 side"></div>
            </div>
        </div>
   );
}
 
export default Menu;