import { useEffect, useState, useContext, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import Errors from './Errors';
import Messages from './Messages';

function PinList() {
    const [pins, setPins] = useState([]);
    const [trips, setTrips] = useState([]);
    const [error, setError] = useState([]);
    const [message, setMessage] = useState([]);
  
    const auth = useContext(AuthContext);
    const history = useHistory();
    const ref = useRef(null);

    const delay = ms => new Promise(
      resolve => setTimeout(resolve, ms)
    );

    // const clear = async event => {
    //     await delay(5000);
    //     setError();
    //     setMessage();
    // };

    useEffect(() => {
      setError("");
    }, []);

    useEffect(() => {
      setMessage("");
    }, []);
  
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
      
    useEffect(() => {
      const init = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.user.token}`
        }
      }

      fetch(`http://localhost:8080/fiftygo/trip/user/${auth.user.appUserId}`, init)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            setError("Something went wrong, sorry about that!")
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        //.then(data => console.log(data))
        .then((data) => setTrips(data))
        .catch(console.log);
    }, []);
  
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

    const addPinToTrip = ( event, pinId, tripId ) => {
      event.currentTarget.disabled = true;
      // use pin Id and Trip Id in requestBody to make http request like: 

      // ### add a pin(5) to a trip(3)
      // POST {{base_url}}/trip/addpin HTTP/1.1
      // Content-Type: application/json
      // Authorization: Bearer {{jwt}}

      // {
      //     "pinId": 5,
      //     "tripId": 3
      // }
      //console.log("pinId: ", pinId, "tripId: ", tripId);
      console.log(event.target.id);

      const pinTrip = {
        'pinId': `${pinId}`,
        'tripId': `${tripId}`
      }
      const init = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.user.token}`
        },
        body: JSON.stringify(pinTrip)
      }
      console.log("init add pin", init);

      if (pinId != 0 && tripId != 0 ) {
        fetch(`http://localhost:8080/fiftygo/trip/addpin`, init)
      .then(response => {
        if (response.status === 204) {
          return null;
        } else if (response.status === 201) {
          const successMsg = "Your pin was added to this trip!";
          //newMsgs = messages.push(msg);
          return successMsg;
        } else if (response.status === 500) {
          return Promise.reject("Can't add pin to same trip twice.")
        } else if (response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => {
        if (!data) {
          // Send the user back to the list route.
          
          history.push('/pinlist');
        } else{
          history.push('/pinlist');
        }
      })
      .catch(console.log);
      }

      const btnId = `PT-btn-${pinId}-${tripId}`;
      //disableBtn(btnId);
    }



    const makeAddPinToTripModals = () => {
      // show trips in a pop-up with buttons on each trip, include a cancel button to back out back to /pinlist
      //console.log("trips", trips);
       // return a modal with trips on it with buttons for "add to this trip"

      const pinsArr = pins.map(pin => (
        <div  key={pin.pinId} 
              id={"modal-" + pin.pinId} 
              className="modal fade" 
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalLabel" 
              aria-hidden="true"
              >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div id={"modal-" + pin.pinId + "-error"}></div>
                <div id={"modal-" + pin.pinId + "-messsage"}></div>
              <div className="modal-header">
                <h4 className="modal-title">Choose a trip for your Pin:</h4>
                <button type="button" className="close btn" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h5>Your pin:</h5>
                <p>{pin.pinDescription}</p>
                  </li>
                  <li className="list-group-item">
                  <h5>Your trips:</h5>
                  </li>
                </ul>
                
                <div className='container'>
                  
                  {trips.map(trip => (
                    // thinking that we have a pin id for each modal, then trips, and each trip has pins attached.
                    // if trip.pins has a pin with pinId == pin.pinId, disable the button or something
                    <div key={"pin-" + pin.pinId + "-to-trip-" + trip.tripId} className='card mb-2'>

                      <div className='card-body'>
                        <h5 className='card-title'>{trip.tripDescription}</h5>
                        <p className='card-text'>{trip.tripDescription} ({trip.tripStartDate} to {trip.tripEndDate})</p>
                      </div>
                      <div className='card-footer'>
                        {trip.pins.find(p => p.pinId == pin.pinId) ? <p className='mb-0'>Your pin is on this trip already!"</p> : <button id={'PT-btn-' + pin.pinId + '-' + trip.tripId} onClick={(event) => addPinToTrip(event, pin.pinId, trip.tripId)} className="btn btn-primary btn-sm">Add your Pin to this Trip!</button>}
                      </div>
                    </div>
                  ))}
                  
                </div>
                
          
              </div>
              <div className="modal-footer">
                <p>Don't see a good trip for this Pin? Head to the Trips page to start a new Trip!</p>
                {/* <Link className="btn btn-warning" data-dismiss="modal" target="_blank" to="/tripcards" >
                  <i className="bi bi-stoplights"></i> View Trips
                </Link> */}
                {/* Strugglin to get this link to both redirect AND close the modal. seems to be one or the other, so omitting it for now. */}
              </div>
            </div>
          </div>
        </div>
        
      ))
      return pinsArr;
    }

    const handleAddPinToTrip = (pinId) => {
// or does this button just need to be connected to the modal???
    }
  
    return (
      <>
      <div className='container'>
        <h2 className="mt-4">{auth.user.firstName}'s Pins</h2>
        <Errors />
        <Messages />
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
                <td className='vert-center'>
                  <div className="row align-self-center p-1 m-1">
                      {auth.user && auth.user.appUserId && (pins.length <= 10) && (
                      <Link className="btn btn-primary btn-sm mb-2" to={`/pins/edit/${pin.pinId}`}>
                        <i className="bi bi-pencil-square"></i> Edit
                      </Link>
                    )}
                    {auth.user && auth.user.appUserId && (
                      <button   type='button'
                                // id={pin.pinId + "-pin-to-trip"} 
                                className="btn btn-success btn-sm mb-2" 
                                data-toggle="modal" 
                                data-target={"#modal-" + pin.pinId} 
                                //onClick={() => handleAddPinToTrip(pin.pinId)}
                                >Connect this pin to a Trip
                        {/* <i className="bi bi-pencil-square"></i> */}
                      </button>
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
      {makeAddPinToTripModals(pins)}
      
      </>
    );
  }
  
  export default PinList;