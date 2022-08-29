import { Link, NavLink } from "react-router-dom";
import React from 'react';

//TODO: Implement responsive design using Bootstrap.
//Nav links shouldn't collapse into eachother. Flex/float?
function Footer() {

    return (
        //potentially add 'fixed-top' if we have to scroll a lot w/ pins/trips
        <>
            <section className="footer-outer">
                <footer className="text-center text-white app-footer">
                    <div className="register-text">
                            <p className="justify-content-center align-items-center">
                                <span className="reg-message">Your next adventure awaits!</span>
                                <a href="/register" className="btn btn-outline-light btn-rounded reg-btn" role="button" aria-pressed="true">Sign Up Today</a>
                            </p>
                    </div>
                    <div className="copyright-text">
                        © 2022: OPERATION ALKEMI
                    </div>
                </footer>
            </section>

        </>
    )
}

export default Footer;