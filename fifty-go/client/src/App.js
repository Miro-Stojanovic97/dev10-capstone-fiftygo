import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import Contact from './components/Contact';
import Errors from "./components/Errors";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import MapView from "./components/MapView";
import Nav from "./components/Nav";
import PinForm from "./components/PinForm";
import Pins from "./components/Pins";
import PinList from "./components/PinList";
import Register from "./components/Register";
import Trips from "./components/Trips";
import AuthContext from "./contexts/AuthContext";
import { refreshToken } from "./services/AuthApi";


const LOCAL_STORAGE_TOKEN_KEY = 'fiftyGoToken';

function App() {

  const REFRESH_TIMER = 20 * 60 * 1000;

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
      // set token in local storage
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);

      // decode the token to access an AppUser object
      const { sub: username, firstName, lastName,  appUserId, authorities: authoritiesString } = jwtDecode(token);

      const roles = authoritiesString.split(',');
 
      // create our user object with values from decoder
      const user = {
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

      // check to make sure we have created a user with appropriate fields set
      console.log("user", user);

      // update the global user STATE variable (having trouble with this line)
      setUser(user);

      // return user to the caller (didn't have this line before)
      return user;
    };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
  };

  //const auth = useContext(AuthContext);

  const auth = {
    user: user ? { ...user } : null,
    login,
    logout
  };

  // // If we haven't attempted to restore the login yet...
  // // then don't render the App component.
  if (!restoreLoginAttemptCompleted) {
    return null;
  }

  // const refresh = () => {
  //   refreshToken()
  //     .then(data => {
  //       auth.onAuthenticated(data);
  //       setTimeout(refresh, REFRESH_TIMER);
  //     });
  // }

  // useEffect(() => {
  //   refresh();
  // }, []);

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
             {/* <Route path="/pinlist">
              {console.log("in routes", auth)}
              {auth.user ? (<PinList />) : (<Redirect to="/login" />)}
             </Route> */}
             <Route path="/pins">
              {console.log("in routes", auth)}
              {auth.user ? (<Pins />) : (<Redirect to="/login" />)}
             </Route>
             <Route path={['/pins/add', '/pins/edit/:id']}>
              {auth.user ? (
                <PinForm />
              ) : (
                <Redirect to="/login" />
              )}
            </Route>
             
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