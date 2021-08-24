import React, {useState} from 'react';  
import axios from 'axios';
import { useHistory} from 'react-router-dom';


const RegisterShop = () => {
  
    const initialShopInfo = {
        userid: "",
        shopname: "",
        address: "",        
    }
    const history = useHistory()
    const [eachEntry, setEachEntry] = useState(initialShopInfo)
    const [eachTimeEntry, setEachTimeEntry] = useState()
    const [firstNameError, setFirstNameError] = useState({})
    const [lastNameError, setLastNameError] = useState({})
    const [userNameError, setUserNameError] = useState({})
    const [emailError, setEmailError] = useState({})
    const [passwordError, setPasswordError] = useState({})

    const signUpFormValidation = () => {
        const firstNameError = {};
        const lastNameError = {};
        const userNameError = {};
        const emailError = {};
        const passwordError = {};
        let isValid = true;
        if (eachEntry.firstname.trim().length === 0 ){
            firstNameError.firstNameEmpty = "First name is required";
            isValid = false;
        }
        if(eachEntry.lastname.trim().length === 0){
            lastNameError.lastNameEmpty = "last name is required";
            isValid = false;
        }
        if(eachEntry.username.trim().length === 0) {
            userNameError.userNameEmpty = "username is required"
            isValid = false;
        }
        if(eachEntry.email.trim().length === 0){
            emailError.emailEmpty = "email is required"
            isValid = false;
        }
        if(eachEntry.password.trim().length === 0){
            passwordError.passwordEmpty = "password is required"
            isValid = false;
        }
        setFirstNameError(firstNameError);
        setLastNameError(lastNameError);
        setUserNameError(userNameError)
        setEmailError(emailError)
        setPasswordError(passwordError)
        return isValid;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        Register();
        
    }
    const handleChange = (event) => {
        setEachEntry({ ...eachEntry, [event.target.name]: event.target.value });
      };

      const handleTimeChange = (event) => {
        setEachTimeEntry({...eachTimeEntry, [event.target.name]: event.target.value})
        console.log(eachTimeEntry);
      }

    const Register = async () => {
        let userData = eachEntry;
        const isValid = signUpFormValidation();
        if(isValid){
          console.log(userData);
            let response = await axios.post("https://localhost:44394/api/authentication", userData);
            if (response.data.length !== 0 && userData.isOwner == false){
                history.push("/Login")
            }
            else {
              history.push("/RegisterShop")
            }
            setEachEntry(initialShopInfo)
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col sm-4 side"></div>
                <div className="col sm-4">
                <div>
                    <h1 className="title">Register your shop!</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h5 className="signupTitle">Shop Name:</h5>
                    <input  className="form-control " value={eachEntry.firstname} name="firstname" placeholder="First name..." onChange={handleChange}></input>
                    {Object.keys(firstNameError).map((key) => {
                        return <div style={{color: "yellow"}}>{firstNameError[key]} </div>
                    })}
                    </div>
                    <h5 className="signupTitle">Shop Address:</h5>
                    <div>
                    <input  className="form-control" value={eachEntry.lastname} name="lastname" placeholder="Last name..." onChange={handleChange}></input>
                    {Object.keys(lastNameError).map((key) => {
                        return <div style={{color: "yellow"}}>{lastNameError[key]} </div>
                    })}
                    </div>
                    <h5 className="signupTitle">Monday Open:</h5>
                    <form>
                      <label for="1open">Select a time:</label>
                      <input type="time" name="[1].Open"  onChange={handleTimeChange}/>
                    </form>
                    <h5 className="signupTitle">Monday Close:</h5>
                    <form>
                      <label for="1.close">Select a time:</label>
                      <input type="time"  name="[2].Close"  onChange={handleTimeChange}/>
                    </form>

                    <h5 className="signupTitle">Tuesday Open:</h5>
                    <form>
                      <label for="2open">Select a time:</label>
                      <input type="time" id="2open" name="[2].Open" onChange={handleTimeChange} />
                    </form>
                    <h5 className="signupTitle">Tuesday Close:</h5>
                    <form>
                      <label for="2close">Select a time:</label>
                      <input type="time" id="2close" name="[2].Close"  onChange={handleTimeChange} />
                    </form>

                    <h5 className="signupTitle">Wednesday Open:</h5>
                    <form>
                      <label for="3open">Select a time:</label>
                      <input type="time" id="3open" name="[3].Open"  onChange={handleTimeChange}/>
                    </form>
                    <h5 className="signupTitle">Wednesday Close:</h5>
                    <form>
                      <label for="3close">Select a time:</label>
                      <input type="time" id="3close" name="[3].Close"  onChange={handleTimeChange}/>
                    </form>

                    <h5 className="signupTitle">Thursday Open:</h5>
                    <form>
                      <label for="4open">Select a time:</label>
                      <input type="time" id="4open" name="[4].Open"  onChange={handleTimeChange}/>
                    </form>
                    <h5 className="signupTitle">Thursday Close:</h5>
                    <form>
                      <label for="4close">Select a time:</label>
                      <input type="time" id="4close" name="[4].Close" onChange={handleTimeChange}/>
                    </form>

                    <h5 className="signupTitle">Friday Open:</h5>
                    <form>
                      <label for="5open">Select a time:</label>
                      <input type="time" id="5open" name="[5].Open"  onChange={handleTimeChange}/>
                    </form>
                    <h5 className="signupTitle">Friday Close:</h5>
                    <form>
                      <label for="5close">Select a time:</label>
                      <input type="time" id="5close" name="[5].Close" onChange={handleTimeChange} />
                    </form>

                    <h5 className="signupTitle">Saturday Open:</h5>
                    <form>
                      <label for="6open">Select a time:</label>
                      <input type="time" id="6open" name="[6].Open" onChange={handleTimeChange}/>
                    </form>
                    <h5 className="signupTitle">Saturday Close:</h5>
                    <form>
                      <label for="6close">Select a time:</label>
                      <input type="time" id="6close" name="[6].Close" onChange={handleTimeChange} />
                    </form>

                    <h5 className="signupTitle">Sunday Open:</h5>
                    <form>
                      <label for="7open">Select a time:</label>
                      <input type="time" id="7open" name="[7].Open"  onChange={handleTimeChange}/>
                    </form>
                    <h5 className="signupTitle">Sunday Close:</h5>
                    <form>
                      <label for="7close">Select a time:</label>
                      <input type="time" id="7close" name="[7].Close"  onChange={handleTimeChange}/>
                    </form>

                    <button className="mt-2 mb-1" type="submit">Register Shop</button>
                    </form>
                    </div>
                </div>
                <div className="col sm-4 side"></div>
            </div>
        </div>
    )
}

export default RegisterShop