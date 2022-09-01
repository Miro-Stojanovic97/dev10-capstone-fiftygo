import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from "../contexts/AuthContext";
import Errors from './Errors';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [errors, setErrors] = useState([]);

  const auth = useContext(AuthContext);

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    
    // Make sure that the user didn't make a mistake in entering their password.
    if (password !== confirmPassword) {
      setErrors(['your passwords don\'t match']);
      return;
    }

    /*

    POST http://localhost:8080/api/appuser HTTP/1.1
    Content-Type: application/json

    {
      "username": "test@test.com",
      "password": "P@ssw0rd!",
      "firstName": "Fname",
      "lastName": "Lname"
    }

    */

    const appUser = {
      username,
      password,
      firstName,
      lastName
    };
    
    const initCreateAccount = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appUser)
    };
    
    fetch('http://localhost:8080/create_account', initCreateAccount)
      .then((response) => {
        if (response.status !== 201) {
          return Promise.reject("Registration failed. Please ensure that no fields are blank, password is more than 8 charcters, and U=username may be in use, so please try another.");
        }
        return response.json();
      })
      //.then(data => console.log(data))
      .then((data) => authenticate(data))
      .then(() => {
        history.push("/");
      })
      .catch((data) => {
        setErrors([data, "Login failed."]);;
      });
  };

  const authenticate = async () => {
    console.log(username)
    const response = await fetch("http://localhost:8080/authenticate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    // This code executes if the request is successful
    if (response.status === 200) {
        const { jwt_token } = await response.json();
        console.log(jwt_token);
        // NEW: login!
        auth.login(jwt_token);
        history.push("/");
    } else if (response.status === 403) {
        setErrors(["Login failed."]);
    } else {
        setErrors(["Unknown error."]);
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };


  return (
    <>
    <div className="container mt-3">
        <h1 className="display-3">Register 🌍</h1>
    </div>

      {errors.length > 0 ? <Errors errors={errors} /> : ""}
    <div className="container">
      <form onSubmit={handleSubmit}>
      <div className="col-6 col-lg-4 offset-lg-4 offset-3 mt-5 form-group">
          <label htmlFor="firstName">First Name</label>
          <input className="form-control" id="firstName" type="text" 
            onChange={(event) => setFirstName(event.target.value)} value={firstName}/>
        </div>
        <div className="col-6 col-lg-4 offset-lg-4 offset-3 mt-3 form-group">
          <label htmlFor="lastName">Last Name</label>
          <input className="form-control" id="lastName" type="text"
            onChange={(event) => setLastName(event.target.value)} value={lastName}/>
        </div>
        <div className="col-6 col-lg-4 offset-lg-4 offset-3 mt-3 form-group">
          <label htmlFor="username">Username</label>
          <input className="form-control" id="username" type="text" 
            onChange={handleUsernameChange} value={username} />
        </div>
        <div className="col-6 col-lg-4 offset-lg-4 offset-3 mt-3 form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control" id="password" type="password" 
            onChange={(event) => setPassword(event.target.value)} value={password} />
        </div>
        <div className="col-6 col-lg-4 offset-lg-4 offset-3 mt-3 form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input className="form-control" id="confirmPassword" type="password" 
            onChange={(event) => setConfirmPassword(event.target.value)} value={confirmPassword} />
        </div>
        <div className="center">
          <button className="btn btn-primary mt-5" type="submit">Register</button>
        </div>
        <div className="mt-3 center">
            <Link to="/login">I have an existing account</Link>
        </div>
      </form>
    </div>
    </>
  );
}

export default Register;