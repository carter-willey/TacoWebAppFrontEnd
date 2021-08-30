import axios from 'axios';
import React, {useState} from 'react';

const CreatePost = (props) => {
  const initFields = {
    searchTerm: "",
    rating: 5,
    description: "",
  }

  const [filteredShops, setFilteredShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState(initFields.searchTerm);
  const [rating, setRating] = useState(initFields.rating);
  const [isStoreSelected, setIsStoreSelected] = useState(false);
  const [tacoToPostId, setTacoToPostId] = useState(0);
  const [tacoDescription, setTacoDescription] = useState(initFields.description);
  const {allShops, currentUser, currentToken, getTacosFromShopByShopId, tacosFromShop} = props

  const postFields = {
    userId: currentUser.user.id,
    tacoId: Number(`${tacoToPostId}`),
    rating: Number(`${rating}`),
    description: tacoDescription,
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
    console.log(postFields);
    await axios.post("https://localhost:44394/api/posts/", postFields, {headers: {Authorization: 'Bearer ' + currentToken}})
    await axios.put(`https://localhost:44394/api/tacos/${postFields.tacoId}/${postFields.rating}`)
    setSearchTerm(initFields.searchTerm)
    setRating(initFields.rating)
    setTacoDescription(initFields.description)
    console.log("posted!");
  }

  const handleShopSelected = async (shopId, shopName) => {
    setSearchTerm(shopName);
    setFilteredShops([]);
    await getTacosFromShopByShopId(shopId);
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
        <span>Check in a taco!</span>
    </div>
    <div className="card-body">
 
            <form className="form-group search" onSubmit={submitPost} >
                <div className="searchInputs">
                  <label >Shop:</label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleShopFilter}
                    placeholder="Search By Shop Name..."
                    className="form-control mb-3"
                  />
                  </div>
                  
                  <div className="searchResults">
                    {filteredShops.map((shop, key) => {
                      
                      return (
                        <a className="shopItem" onClick={() =>  handleShopSelected(shop.shopId, shop.name)}  target="_blank">
                          <p>{shop.name}</p>
                        </a>
                      )
                    })}
                  </div>
                  {isStoreSelected &&
                  <div >
                    <label>Taco:</label>
                    <select className="form-control form-select mb-2" onChange={handleTacoIdChange}>
                      <option key="0" value={null}>
                        ----
                      </option>
                      {tacosFromShop.map((taco) => {
                        return(
                          <option key={taco.tacoId} value={taco.tacoId}>
                            {taco.name}
                          </option>
                        )
                      })}
                    </select>
                  </div>
                  }

              
                    <label >Rating: </label>
                    <input  type="number" min="1" max="5" className="form-control" value={rating}  placeholder="1-5" onChange={handleNumberChange}/>
             
      
                  <label>Description:</label>
                  <textarea className="form-control" rows="2" placeholder="How did you like the taco?!" value={tacoDescription} onChange={handleChange}/>
                  <div className="btn-group">
                    <button type="submit" className="btn btn-primary">Post</button>
                  </div>
              </form>
            
            

        
    </div>
</div>
   );
}
 
export default CreatePost;