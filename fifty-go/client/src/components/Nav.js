import { Link } from "react-router-dom";

//TODO: Implement responsive design using Bootstrap.
    //Nav links shouldn't collapse into eachother. Flex/float?
function Nav() {

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">FiftyGO</a>
                {/* TODO: Could possibly add a .img logo here instead of text^ */}
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button> */}
                {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link pins" to="/pins">Pins</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link trips" to="/trips">Trips</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link map" to="/map">MapView</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link login" to="/login">Login</Link>
                    </li>
                </ul>
            {/* </div> */}
            </div>
        </nav>
    )
}

export default Nav;