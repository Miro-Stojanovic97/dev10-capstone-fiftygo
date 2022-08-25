import { useEffect, useState } from "react";
import { Routes, Route, Switch, Redirect } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Home from "./components/Home";
import Pins from "./components/Pins";
import Trips from "./components/Trips";
import Contact from './components/Contact';
import MapView from "./components/MapView";
import PinForm from "./components/PinForm";

function App() {
  
        // "null" means that we don't have a logged in user
        // anything other than null, means we have a logged in user
    //   const [user, setUser] = useState(null);
    //   const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);
      
    //   useEffect(() => {
    //     const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    //     if (token) {
    //       login(token);
    //     }
    //     setRestoreLoginAttemptCompleted(true);
    //   }, []);

    //   const login = (token) => {
    //     localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

//TODO: FINISH UPDATING
    //     const { sub: username, authorities, userId, phoneNumber } = jwt_decode(token);

    //     const roles = authorities.split(',');
//TODO: FINISH UPDATING
    //     // create our user object
    //     const userToLogin = {
    //       userId,
    //       username,
    //       roles,
    //       token,
    //       hasRole(role) {
    //         return this.roles.includes(role);
    //       }
    //     };

    //     console.log(userToLogin);

    //     // update the global user state variable
    //     setUser(userToLogin);
    //   };

    // const logout = () => {
    //   setUser(null);
    //   localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    // };

    // const auth = {
    //   user,
    //   login,
    //   logout
    // };

    // If we haven't attempted to restore the login yet...
  // then don't render the App component.
  // if (!restoreLoginAttemptCompleted) {
  //   return null;
  // }

  return (
    <>
      <Nav  className="navbar navbar-expand-lg bg-light"/>
      <div className="container mt-5">
        <div className="row">
          <div className="col-11">
            
          </div>
          <div className="col">
            
          </div>
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/pins" element={<Pins />} />
          <Route exact path="/trips" element={<Trips />} />
          <Route exact path="/map" element={<MapView />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
