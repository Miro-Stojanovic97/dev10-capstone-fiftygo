import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthContext from "../contexts/AuthContext";
import Errors from "./Errors";

function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);

    const history = useNavigate();

    const handleSubmit = (event) => {
      event.preventDefault();

      const authAttempt = {
        username,
        password
      };

      const init = {
        method: "POST", 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(authAttempt)
      };

      fetch('http://localhost:8080/api/authenticate', init)
        .then(response => {
          if(response.status === 200) {
            return response.json();
          } else if (response.status === 403) {
            return null;
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        .then(data => {
          if (data) {
            auth.login(data.jwt_token);
            history.push('/');
          } else {
            setErrors(['login failure']);
          }
        })
        .catch(console.log);
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      };

    return (
    <>
    <div className="container">
        <h1 className="display-3">Login 🌍</h1>
    </div>
        
    <Errors errors={errors} />
    <div className="container login-form">
      <form onSubmit={handleSubmit}>
        <div className="col-6 col-lg-4 offset-lg-4 offset-3 mt-5 form-group">
          <label htmlFor="username">Username</label>
          <input className="form-control" id="username" type="text" 
            onChange={handleUsernameChange} value={username} />
        </div>
        <div className="col-6 offset-3 col-lg-4 offset-lg-4 mt-3 form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control" id="password" type="password" 
            onChange={(event) => setPassword(event.target.value)} value={password} />
        </div>
        <div>
          <button className="btn btn-primary mt-5" type="submit">Login</button>
        </div>
        <div className="mt-3">
          <Link to="/register">I don't have an account</Link>
        </div>
      </form>
    </div>
    </>
  );
}

export default Login;