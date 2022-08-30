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
      }, [auth.user.appUserId, auth.user.token]); // An empty dependency array tells to run our side effect once when the component is initially loaded.    
  
    const handleDeletePin = (pinId) => {
      const pin = pins.find(pin => pin.pinId === pinId);
  
      //TODO: maybe imporve message
      if (window.confirm(`Delete this pin?\n${pin.pinDescription}`)) {
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
              window.location.reload();
            } else {
              return Promise.reject(`Unexpected status code: ${response.status}`);
            }
          })
          .catch(console.log);
      }
    };
  
    return (
      <>
      <div className='container'>
        <h2 className="mt-4">Pins</h2>
        <button className="btn btn-primary my-4" onClick={() => history.push('/pins/add')}>
          <i className="bi bi-plus-circle"></i> Add Pin
        </button>
        {/* <Link className="btn btn-primary my-4" to="/pins/add">
          <i className="bi bi-plus-circle"></i> Add Pin
        </Link> */}
        <table className="table table-striped table-hover table-sm" id='pinlist-table'>
          <thead>
            <tr>
                <th scope="col">
                  <div className='p-1'>Description</div>
                </th>
                <th scope="col">
                  <div className='p-1'>Type</div> 
                </th>
                <th scope="col">
                  <div className='p-1'>Date</div> 
                </th>
                <th scope="col">
                  <div className='p-1'>Priority</div> 
                </th>
                <th scope="col">
                  <div className='p-1'>Completed</div> 
                </th>
                <th scope="col">
                  <div className='p-1'>City</div>
                </th>
                <th scope="col">
                  <div className='p-1 me-1'>State</div> 
                </th>
                <th scope="col">
                  <div className='p-1'></div> 
                </th>
            </tr>
          </thead>
          <tbody>
            {pins.map(pin => (
              <tr key={pin.pinId}>
                <td>
                  <div className='p-1'>{pin.pinDescription}</div> 
                </td>
                <td>
                  <div className='p-1'>{pin.type.typeName}</div> 
                </td>
                <td>
                  <div className='p-1'>{pin.pinDate}</div> 
                </td>
                <td>
                  <div className='p-1'>{pin.pinPriority}</div> 
                </td>
                <td>
                  <div className='p-1'>{pin.pinDidIt ? 'Did it!' : 'Not Yet'}</div> 
                </td>
                <td>
                  <div className='p-1'>{pin.city.cityName}</div> 
                </td>
                <td>
                  <div className='p-1'>{pin.city.stateAbr}</div> 
                </td>
                <td>
                  <div className="row align-self-center p-1 me-1">
                      {auth.user && auth.user.appUserId && (
                      <Link className="btn btn-primary btn-sm me-1 mb-1" to={`/pins/edit/${pin.pinId}`}>
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
      </div>
        
      </>
    );
  }
  
  export default PinList;