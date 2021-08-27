import React from 'react';

const AddTaco = (props) => {
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

                    
                    <h5 className="signupTitle">Shop Address:</h5>
                    <div>
                    <ShopAddressSearch setAddress={setAddress} setLat={setLat} setLng={setLng}/>
                    {/* <input  className="form-control" value={eachEntry.address} name="address" placeholder="Address..." onChange={handleChange}></input> */}
                    
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