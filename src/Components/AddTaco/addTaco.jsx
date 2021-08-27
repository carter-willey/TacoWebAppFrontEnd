import React, {useState} from 'react';
import { useHistory} from 'react-router-dom';
import axios from 'axios';

const AddTaco = (props) => {
    const {currentUser, allShops, currentToken} = props
    let usersShopId = allShops.filter((shop) => {
        if(shop.userId == currentUser.user.id){
            return shop.shopId
        }
    })
    
    const initialTacoInfo = {
        ShopId: 0,
        name: "",
        price: 0,
        description: "",
        averageRating: 5,
        numberOfRatings: 1,
    }
    const history = useHistory()
    const [eachEntry, setEachEntry] = useState(initialTacoInfo)
    const [firstNameError, setFirstNameError] = useState({})
    const [lastNameError, setLastNameError] = useState({})
    const [userNameError, setUserNameError] = useState({})
    const [emailError, setEmailError] = useState({})
    const [passwordError, setPasswordError] = useState({})


  const handleChange = (event) => {
    setEachEntry({ ...eachEntry, [event.target.name]: event.target.value });
  };

  const postTaco = async () => {
    let tacoData = eachEntry;
    tacoData.shopId = usersShopId[0].shopId
    tacoData.price = Number(`${tacoData.price}`)
    console.log(tacoData);
    let response = await axios.post("https://localhost:44394/api/tacos", tacoData, {headers: {Authorization: 'Bearer ' + currentToken}});
    if (response.data.length !== 0){
      setEachEntry(initialTacoInfo)
     }
    // setEachEntry(initialTacoInfo)
        
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    postTaco();
    
}

  return ( 
    <div className="container-fluid"> 
            <div className="row">
                <div className="col sm-4 side"></div>
                <div className="col sm-4">
                <div>
                    <h1 className="title">{currentUser.user.username}, Add a taco to your menu!</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h5 className="signupTitle">Taco Name:</h5>
                    <input  className="form-control " value={eachEntry.name} name="name" placeholder="Shop name..." onChange={handleChange}></input>
                    
                    </div>
                    <div>
                            <h5 className="signupTitle">Taco Price:</h5>
                    <input  className="form-control " value={eachEntry.price} type="money" name="price" placeholder="Shop name..." onChange={handleChange}></input>
                    
                    </div>
                    <div>
                            <h5 className="signupTitle">Taco Description:</h5>
                    <input  className="form-control " value={eachEntry.description} name="description" placeholder="Shop name..." onChange={handleChange}></input>
                    
                    </div>
                    <button className="mt-2 mb-1" type="submit">Register Shop</button>
                    </form>
                    </div>
                </div>
                <div className="col sm-4 side"></div>
            </div>
        </div>
   );
}
 
export default AddTaco;