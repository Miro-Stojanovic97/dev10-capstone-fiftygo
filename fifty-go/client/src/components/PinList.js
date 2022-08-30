import { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';

function PinList() {
    const [pins, setPins] = useState([]);
  
    const auth = useContext(AuthContext);
  
    const history = useHistory();
  
    useEffect(() => {
      const init = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.user.token}`
        },
      };

        fetch(`http://localhost:8080/fiftygo/pin/user/${auth.user.appUserId}`, init)
          .then(response => {
            if (response.status === 200) {
              return response.json();
            } else {
              return Promise.reject(`Unexpected status code: ${response.status}`);
            }
          })
          .then(data => setPins(data))
          .catch(console.log);
      }, []); // An empty dependency array tells to run our side effect once when the component is initially loaded.    
  
    const handleDeletePin = (pinId) => {
      const pin = pins.find(pin => pin.pinId === pinId);
  
      //TODO: Are pinDescription / pinCity callable here?
      if (window.confirm(`Delete pin ${pin.pinDescription} in ${pin.pinCity}?`)) {
        const init = {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${auth.user.token}`
          },
        };
  
        fetch(`http://localhost:8080/fiftygo/pin/${pinId}`, init)
          .then(response => {
            if (response.status === 204) {
              // create a copy of the pins array
              // remove the pin that we need to delete
              const newPins = pins.filter(pin => pin.id !== pinId);
  
              // update the pins state variable
              setPins(newPins);
            } else {
              return Promise.reject(`Unexpected status code: ${response.status}`);
            }
          })
          .catch(console.log);
      }
    };
  
    return (
      <>
        <h2 className="mb-4">Pins</h2>
        <button className="btn btn-primary my-4" onClick={() => history.push('/pins/add')}>
          <i className="bi bi-plus-circle"></i> Add Pin
        </button>
        {/* <Link className="btn btn-primary my-4" to="/pins/add">
          <i className="bi bi-plus-circle"></i> Add Pin
        </Link> */}
        <table className="table table-striped table-hover table-sm">
          <thead className="thead-dark">
            <tr>
                <th>Description</th>
                <th>Type</th>
                <th>Date</th>
                <th>Priority</th>
                <th>Did It</th>
                <th>City</th>
                <th>State</th>
                <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {pins.map(pin => (
              <tr key={pin.pinId}>
                <td>{pin.pinDescription}</td>
                <td>{pin.type.typeName}</td>
                <td>{pin.pinDate}</td>
                <td>{pin.pinPriority}</td>
                <td>{pin.pinDidIt ? 'Yes' : 'No'}</td>
                <td>{pin.city.cityName}</td>
                <td>{pin.city.stateAbr}</td>
                <td>
                  <div className="float-right mr-2">
                    {auth.user && auth.user.appUserId && (
                      <Link className="btn btn-primary btn-sm mr-2 mb-1" to={`/pins/edit/${pin.pinId}`}>
                        <i className="bi bi-pencil-square"></i> Edit
                      </Link>
                    )}
        {/* TODO: Determine how we want to handle our roles here */}
                    {auth.user && ( auth.user.hasRole('ROLE_ADMIN') || auth.user.hasRole('ROLE_USER') || auth.user.hasRole('ROLE_PREMIUM') ) && (
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeletePin(pin.pinId)}>
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  
  export default PinList;