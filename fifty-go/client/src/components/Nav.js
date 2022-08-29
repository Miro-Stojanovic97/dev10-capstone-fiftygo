import { Link, NavLink } from "react-router-dom";
import React, { useContext } from 'react';
import fiftyGoLogo from '../images/fiftyGO3.png';
import { authenticate } from "../services/AuthApi";
import AuthContext from "../contexts/AuthContext";

//TODO: Implement responsive design using Bootstrap.
//Nav links shouldn't collapse into eachother. Flex/float?
function Nav() {

    const auth = useContext(AuthContext);

    return (
        //potentially add 'fixed-top' if we have to scroll a lot w/ pins/trips
        <>
            <div className="header">
                <div className="menu-bar">
                    <nav className="navbar navbar-expand navbar-light">
                        <div className="container-fluid">
                            {/* TODO: Get the picture to the top-left corner */}
                            <div className="col-lg-1">
                            <a className="logo d-flex align-items-center" href="/">
                                <img src={fiftyGoLogo} alt="FiftyGo" height="40"/>
                            </a>
                            </div>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="navbar-brand nav-link" aria-current="page" href="/features">Features</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="navbar-brand nav-link" aria-current="page" href="/pinlist">Pins</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="navbar-brand nav-link" aria-current="page" href="/tripcards">Trips</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="navbar-brand nav-link" aria-current="page" href="/map">MapView</a>
                                    </li>
                                </ul>
                            </div>
                            <ul className="navbar-nav">
                                {!auth.user && (
                                    <li className="nav-item">
                                <Link to="/login" className="btn btn-outline-light btn-rounded nav-login" role="button" aria-pressed="true">Login</Link>
                                </li>
                                )}
                                {auth.user && (
                                    <li className="nav-item">
                                    <button onClick={() => auth.logout()} className="btn btn-outline-light btn-rounded nav-login" role="button" aria-pressed="true">Logout</button>
                                    </li>
                                )}
                                
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Nav;