import React, {useState} from 'react';  
import axios from 'axios';
import { useHistory} from 'react-router-dom';
import './signUpForm.css';
import logo from './transparentLogo.png'

const SignUpForm = () => {
    const initialUserInfo = {
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        isOwner: false,
    }
    const history = useHistory()
    const [eachEntry, setEachEntry] = useState(initialUserInfo)
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
        signUp();
        
    }
    const handleCheckbox = event => {
      eachEntry.isOwner = !eachEntry.isOwner
    }

    const handleChange = (event) => {
        setEachEntry({ ...eachEntry, [event.target.name]: event.target.value });
      };

    const signUp = async () => {
        let userData = eachEntry;
        const isValid = signUpFormValidation();
        if(isValid){
          console.log(userData);
            let response = await axios.post("https://localhost:44394/api/authentication", userData);
            if (response.data.length !== 0){
                history.push("/Login")
            }
            setEachEntry(initialUserInfo)
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col sm-4 side"></div>
                <div className="col sm-4 d-flex justify-content-center">
                <div>
                <img src={logo} height="300rem" alt="" />
                    <h1 className="title">Signup</h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <h5 className="signupTitle">First Name:</h5>
                    <input  className="form-control " value={eachEntry.firstname} name="firstname" placeholder="First name..." onChange={handleChange}></input>
                    {Object.keys(firstNameError).map((key) => {
                        return <div style={{color: "yellow"}}>{firstNameError[key]} </div>
                    })}
                    </div>
                    <h5 className="signupTitle">Last Name:</h5>
                    <div>
                    <input  className="form-control" value={eachEntry.lastname} name="lastname" placeholder="Last name..." onChange={handleChange}></input>
                    {Object.keys(lastNameError).map((key) => {
                        return <div style={{color: "yellow"}}>{lastNameError[key]} </div>
                    })}
                    </div>
                    <h5 className="signupTitle">Username:</h5>
                    <div>
                    <input  className="form-control" value={eachEntry.username} name="username" placeholder="Username..." onChange={handleChange}></input>
                    {Object.keys(userNameError).map((key) => {
                        return <div style={{color: "yellow"}}>{userNameError[key]} </div>
                    })}
                    </div>
                    <h5 className="signupTitle">Email:</h5>
                    <div>
                    <input  className="form-control" value={eachEntry.email} name="email" placeholder="Email..." onChange={handleChange}></input>
                    {Object.keys(emailError).map((key) => {
                        return <div style={{color: "yellow"}}>{emailError[key]} </div>
                    })}
                    </div>
                    <h5 className="signupTitle">Password:</h5>
                    <div>
                    <input  className="form-control" type="password" value={eachEntry.password} name="password" placeholder="Password..." onChange={handleChange}></input>
                    {Object.keys(passwordError).map((key) => {
                        return <div style={{color: "yellow"}}>{passwordError[key]} </div>
                    })}
                    </div>
                      <div class="form-check">
                      <input type="checkbox" onChange={handleCheckbox} class="form-check-input" id="exampleCheck1"/>
                      <label class="form-check-label" for="exampleCheck1">Are you a taco shop owner?</label>
                    </div>
                    <button className="mt-2 mb-1" type="submit">Sign Up</button>
                    </form>
                    </div>
                </div>
                <div className="col sm-4 side"></div>
            </div>
        </div>
    )
}

export default SignUpForm