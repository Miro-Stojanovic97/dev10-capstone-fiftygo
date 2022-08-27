import React, { useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';


import Errors from "./Errors";
import AuthContext from "../contexts/AuthContext";

export default function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const auth = useContext(AuthContext);

    const history = useHistory();

    const handleSubmit = async (event) => {
      event.preventDefault();

      // const authAttempt = {
      //   username,
      //   password
      // };

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
    };

    //   fetch('http://localhost:8080/authenticate', init)
    //     .then(response => {
    //       if(response.status === 200) {
    //         return response.json();
    //       } else if (response.status === 403) {
    //         return null;
    //       } else {
    //         return Promise.reject(`Unexpected status code: ${response.status}`);
    //       }
    //     })
    //     .then(data => {
    //       if (data) {
    //         auth.login(data.jwt_token);
    //         history.push('/');
    //       } else {
    //         setErrors(['login failure']);
    //       }
    //     })
    //     .catch(console.log);
    // }

    // const handleUsernameChange = (event) => {
    //     setUsername(event.target.value);
    //   };

    return (
    <>
    <div className="container">
        <h1 className="display-3">Login 🌍</h1>
    </div>
        
    <Errors errors={errors} />
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="col-6 col-lg-4 offset-lg-4 offset-3 mt-5 form-group">
          <label htmlFor="username">Username</label>
          <input
            className="form-control"
            id="username"
            type="text" 
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="col-6 offset-3 col-lg-4 offset-lg-4 mt-3 form-group">
          <label htmlFor="password">Password</label>
          <input
            className="form-control"
            id="password"
            type="password" 
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className="center">
          <button className="btn btn-primary mt-5" type="submit">Login</button>
        </div>
        <div className="mt-3 center">
          <Link to="/register">I don't have an account</Link>
        </div>
      </form>
    </div>
    </>
  );
}

