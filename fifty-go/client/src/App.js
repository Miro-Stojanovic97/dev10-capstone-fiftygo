import { useEffect, useState } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import jwt_decode from 'jwt-decode';

import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Pins from "./components/Pins";
import Trips from "./components/Trips";
import Contact from './components/Contact';
import MapView from "./components/MapView";
import PinForm from "./components/PinForm";
import AuthContext from "./contexts/AuthContext";

const LOCAL_STORAGE_TOKEN_KEY = 'fiftyGoToken';

function App() {

  // "null" means that we don't have a logged in user
  // anything other than null, means we have a logged in user
    const [user, setUser] = useState(null);
    const [restoreLoginAttemptCompleted, setRestoreLoginAttemptCompleted] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      if (token) {
        login(token);
      }
      setRestoreLoginAttemptCompleted(true);
    }, []);

    const login = (token) => {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

  //TODO: FINISH UPDATING
      const { sub: username, authorities, userId } = jwt_decode(token);

      const roles = authorities.split(',');
  //TODO: FINISH UPDATING
      // create our user object
      const userToLogin = {
        userId,
        username,
        roles,
        token,
        hasRole(role) {
          return this.roles.includes(role);
        }
      };

      console.log(userToLogin);

  //     // update the global user state variable
      setUser(userToLogin);
    };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  };

  const auth = {
    user,
    login,
    logout
  };

  // If we haven't attempted to restore the login yet...
  // then don't render the App component.
  if (!restoreLoginAttemptCompleted) {
    return null;
  }

  return (
<AuthContext.Provider value={auth}>
    <Router>

      <div id="outer-cont">
        <div id="main">
          <Nav />
          <div className="row">
            <div className="col"></div>
            <div className="col-11">

            </div>
            <div className="col"></div>
          </div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/pins">
              <Pins />
            </Route>
            <Route exact path="/trips">
              <Trips />
            </Route>
            <Route exact path="/map">
              <MapView />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
          </Switch>
        </div>
      </div>
      <Footer />

    </Router>
    </AuthContext.Provider>
  );
}

export default App;
