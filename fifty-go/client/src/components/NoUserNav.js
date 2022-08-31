import { Link, NavLink } from "react-router-dom";
import React, { useContext } from 'react';
import fiftyGoLogo from '../images/fiftyGO3.png';
import { authenticate } from "../services/AuthApi";
import AuthContext from "../contexts/AuthContext";


function NoUserNav() {

    const auth = useContext(AuthContext);

    return (
        <>
            <div className="header">
                <div className="menu-bar">
                    <nav className="navbar navbar-expand navbar-light">
                        <div className="container-fluid">
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
                                </ul>
                            </div>
                            <ul className="navbar-nav">
                                {!auth.user && (
                                    <li className="nav-item">
                                <Link to="/login" className="btn btn-outline-light btn-rounded nav-login" role="button" aria-pressed="true">Login</Link>
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

export default NoUserNav;