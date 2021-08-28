import axios from 'axios';
import React, {useState} from 'react';

const CreateNotification = (props) => {
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [rating, setRating] = useState(5);
  const [isStoreSelected, setIsStoreSelected] = useState(false);
  const [tacoToPostId, setTacoToPostId] = useState(0);
  const [tacoDescription, setTacoDescription] = useState("");
  const {allShops, currentUser, currentToken, getTacosFromShop, tacosFromShop} = props

  const postFields = {
    UserId: currentUser.user.id,
    TacoId: Number(`${tacoToPostId}`),
    Rating: rating,
    Description: tacoDescription,
  }
  const handleShopFilter = (event) => {
    const search = event.target.value
    setSearchTerm(search)
    const newFilter = allShops.filter((shop) =>{
      return shop.name.toLowerCase().includes(search.toLowerCase())
    })

    if(search === ""){
      setFilteredShops([]);
    }
    else{
      setFilteredShops(newFilter)
    }
  }


  const submitPost = async (event) => {
    event.preventDefault();
    await axios.post("https://localhost:44394/api/posts/", postFields, {headers: {Authorization: 'Bearer ' + currentToken}})
    console.log("posted!");
  }

  const handleShopSelected = async (shopId, shopName) => {
    setSearchTerm(shopName);
    setFilteredShops([]);
    await getTacosFromShop(shopId);
    setIsStoreSelected(true);
  }

  const handleNumberChange = (event) => {
    let number = event.target.value
    if (number > 5){
      setRating(5)
    }
    else if (number < 1){
      setRating(1)
    }
    else{
      setRating(number)
    }
  }
  const handleChange = (event) => {
    setTacoDescription(event.target.value)
  }
  const handleTacoIdChange = (event) => {
    setTacoToPostId(event.target.value)
  }
  return ( 
    <div className="card gedf-card">
    <div className="card-header">
        <span>Post to your followers!</span>
    </div>
    <div className="card-body">
 
            <form className="form-group search" onSubmit={submitPost} >
                
      
                  <label>What would you like to post to your followers?:</label>
                  <textarea className="form-control" rows="3" placeholder="What would you like to post?" value={tacoDescription} onChange={handleChange}/>
                  <div className="btn-group">
                    <button type="submit" className="btn btn-primary">Post</button>
                  </div>
              </form>

    </div>
</div>
   );
}
 
export default CreateNotification;