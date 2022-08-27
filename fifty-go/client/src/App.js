import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import AuthContext from "./contexts/AuthContext";

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

    // const confirmUser = () => {
    //   if (!user) {
    //     replace({
    //       pathname: "/login"
    //     })
    //   }
    // }

    const login = (token) => {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

  //TODO: FINISH UPDATING
      const { sub: username, firstName, lastName, authorities, appUserId } = jwt_decode(token);

      const roles = authorities.split(',');
  //TODO: FINISH UPDATING
      // create our user object
      const userToLogin = {
        appUserId,
        firstName,
        lastName,
        username,
        roles,
        token,
        hasRole(role) {
          return this.roles.includes(role);
        }
      };

      console.log("userToLogin", userToLogin);

// update the global user state variable
      setUser(userToLogin);
      //console.log("user: ", user);
      //console.log(user.username);
    };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  };

  //const auth = useContext(AuthContext);

  const auth = {
    user,
    login,
    logout
  };

  // // If we haven't attempted to restore the login yet...
  // // then don't render the App component.
  // if (!restoreLoginAttemptCompleted) {
  //   return null;
  // }

  return (
    <>
   <AuthContext.Provider value={auth}>
     <Router> 

       <div id="outer-cont">
         <div id="main">
           <Nav />
           <div className="row">
             <div className="col"></div>
             <div className="col-11"></div>
             <div className="col"></div>
           </div>
           <Switch>
             <Route exact path="/">
               <Home />
             </Route>
             <Route path="/pins">
              {console.log("in routes", auth)}
              {auth.user ? (<Pins />) : (<Redirect to="/login" />)}
             </Route>
             {/* <Route path="/pins" component={Login} onEnter={confirmUser} /> */}
               
             
             <Route path="/trips">
               {auth.user ? (
                 <Trips /> ) : (
                   <Redirect to="/login" /> 
                 )}
             </Route>
             <Route path="/map">
               {auth.user ? (
                 <MapView /> ) : (
                   <Redirect to="/login" />
               )}
             </Route>
             <Route path="/login">
               <Login />
             </Route>
             <Route path="/register">
               <Register />
             </Route>
           </Switch>
         </div>
       </div>
       <Footer />

     </Router>
     </AuthContext.Provider>
   </>
  );
}

export default App;