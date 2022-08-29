import { Link, NavLink } from "react-router-dom";
import React from 'react';

//TODO: Implement responsive design using Bootstrap.
//Nav links shouldn't collapse into eachother. Flex/float?
function Nav() {

    return (
        //potentially add 'fixed-top' if we have to scroll a lot w/ pins/trips
        <>
            <div className="header">
                <div className="menu-bar">
                    <nav className="navbar navbar-expand navbar-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/">
                                {/* <img src="../images/fiftyGO3.png" alt="FiftyGO"/> */}
                            </a>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="navbar-brand nav-link" aria-current="page" href="/features">Features</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="navbar-brand nav-link" aria-current="page" href="/pinlist">Pins</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="navbar-brand nav-link" aria-current="page" href="/trips">Trips</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="navbar-brand nav-link" aria-current="page" href="/map">MapView</a>
                                    </li>
                                </ul>
                            </div>
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                <a href="/login" className="btn btn-outline-light btn-rounded nav-login" role="button" aria-pressed="true">Login</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Nav;