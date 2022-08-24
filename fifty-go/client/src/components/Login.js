import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { authenticate } from '../services/authApi';
import UserContext from '../contexts/UserContext';

function Login() {
    
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    // const [errors, setErrors] = useState([]);

    // const auth = useContext(UserContext);

    // const handleChangeUsername = (evt) => {
    //     setUsername(evt.target.value);
    // };  
    
    // const handleChangePassword = (evt) => {
    //     setPassword(evt.target.value);
    // };

    // const handleSubmit = (evt) => {
    //     evt.preventDefault();

    //     authenticate(username, password)
    //     .then(data => {
    //         auth.onAuthenticated(data);
    //     })
    //     .catch(err => {
    //         setErrors([err]);
    //     });
    // };
    
    
    return (
    <>
        <h1 className="display-1">Login 🌍</h1>
        <p1>TODO: Fill out login page </p1>
        
        {/* TODO: from Brendan's secured solar farm project */}
        {/* <h2 className="mb-4">Login</h2>

        {errors.length > 0 && (
            <div className="alert alert-danger">
            <p>The following errors were found:</p>
            <ul>
                {errors.map(error => (
                <li key={error}>{error}</li>
                ))}
            </ul>
            </div>
        )}

        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input id="username" name="username" type="text" className="form-control"
                value={username} onChange={handleChangeUsername} />
            </div>
            <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input id="password" name="password" type="password" className="form-control"
                value={password} onChange={handleChangePassword} />
            </div>
            <div className="mt-4">
            <button className="btn btn-success mr-2" type="submit">
                <i className="bi bi-file-earmark-check"></i> Login
            </button>
            <Link className="btn btn-warning" to="/solarpanels">
                <i className="bi bi-stoplights"></i> Cancel
            </Link>
            </div>
        </form> */}
    </>
  );
}

export default Login;