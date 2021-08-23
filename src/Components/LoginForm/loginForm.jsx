import React, { useState } from 'react';
import axios from 'axios';
import { useHistory, Link} from 'react-router-dom';
import { toast } from 'react-toastify';


const LoginForm = (props) => {
  const {setUserToken} = props
  const logInValues = {
    username: "",
    password: ""
}
  const history = useHistory()
  const [logInInfo, setLogInInfo] = useState(logInValues);
const handleChange = (event) => {
  setLogInInfo({ ...logInInfo, [event.target.name]: event.target.value });
}
const handleSubmit = (event) => {
  event.preventDefault();
  logIn();
}

const logIn = async () => {
  let userData = logInInfo;
  let res = await axios.post("https://localhost:44394/api/authentication/login", userData).catch(function(error) {
    if (error.response) {
      toast.error('Either your username or password is incorrect')
    }
  });
  if (res !== undefined){
    setUserToken(res.data.token)
    history.push("/")
  }
}
  
  
  return ( 
    <div className="container">
            <div className="row">
                <div className="col sm-4"></div>
                <div className="col sm-4">
                <div>
                    <h1 className="title">Login</h1>
                    <form onSubmit={handleSubmit}>
                      <div>
                        <h5 className="signupTitle">Username:</h5>
                    <input className="form-control" name="username" placeholder="Please enter your username..." onChange={handleChange}></input>
                    </div>
                    <div>
                      <h5 className="signupTitle">Password:</h5>
                    <input className="form-control" type="password" name="password" placeholder="Please enter your password..." onChange={handleChange}></input>
                    <button  type="submit" className="mt-2">Login</button>
                    <Link to="/Signup">
                    <button  type="submit" className="mt-2 ms-2">Signup</button>
                    </Link>
                    </div>
                    </form>
                    </div>
                </div>
                <div className="col sm-4"></div>
            </div>
        </div>
   );
}
 
export default LoginForm;
