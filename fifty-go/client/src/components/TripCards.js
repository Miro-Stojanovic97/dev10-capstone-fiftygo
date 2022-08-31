import { useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';


function TripCards() {
    const [trips, setTrips] = useState([]);

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
  
        fetch(`http://localhost:8080/fiftygo/trip/user/${auth.user.appUserId}`, init)
            .then(response => {
              if (response.status === 200) {
                return response.json();
              } else {
                return Promise.reject(`Unexpected status code: ${response.status}`);
              }
            })
            .then(data => setTrips(data))
            .catch(console.log);
        }, [auth.user.appUserId, auth.user.token]); // An empty dependency array tells to run our side effect once when the component is initially loaded.

    const handleDeleteTrip = (trip) => {
        //const trip = trips.find(trip => trip.tripId === tripId);
        
        if (window.confirm(`Delete this trip?\n${trip.tripDescription}\nFrom ${trip.tripStartDate} to ${trip.tripEndDate}?`)) {
            const init = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${auth.user.token}`
            },
            };
        
            fetch(`http://localhost:8080/fiftygo/trip/${trip.tripId}`, init)
            .then(response => {
                if (response.status === 204) {
                    // create a copy of the trips array
                    // remove the trip that we need to delete
                    const newTrips = trips.filter(t => trip.tripId !== t.tripId);
        
                    // update the trips state variable
                    setTrips(newTrips);
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                  }
                })
                .catch(console.log);
            }
          };

    return (
        <>
                <div className="container">
                    <h2 className="mt-4">{auth.user.firstName}'s Trips</h2>
                    <button className="btn btn-primary my-4" onClick={() => history.push('/trip/add')}>
                        <i className="bi bi-plus-circle"></i> Add Trip
                    </button>
                    </div>
                    <div className="container">
                        <div className="row">
                            {trips.map(trip => (
                                <div key={trip.tripId + "-key"} className="col-10 offset-1 card mb-5">
                                        <div className="card-body">
                                            <h5 className="card-title mb-3">{trip.tripDescription}</h5>
                                            <div className="col-12">
                                                <h6 className="card-subtitle mb-2">Start date: {trip.tripStartDate}</h6>
                                                <h6 className="card-subtitle mb-2">End date: {trip.tripEndDate}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="card-subtitle mb-2">Priority: {trip.tripPriority}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="card-subtitle mb-2">{trip.tripDidIt ? 'Completed this trip!' : 'Have not completed this trip.'}</h6>
                                            </div>
                                            <div className="col-12 pt-4">
                                                <h6 className="card-text mb-2">There are {trip.pins.length} Pins in this Trip:</h6>
                                                <ul className="list-group list-group-flush">
                                                {trip.pins.map(pin => (
                                                    <li key={pin.pinId} className="list-group-item">
                                                      <h6><strong>{pin.type.typeName}:</strong> {pin.pinDescription}</h6>
                                                      <p>{pin.pinDate}</p>
                                                    <Link className="btn btn-primary btn-sm mr-2 mb-1" to={`/pins/edit/${pin.pinId}`}>
                                                      <i className="bi bi-pencil-square"></i> Edit Pin
                                                    </Link>
                                                    </li>
                                                  ))}
                                                </ul>
                                            </div>
                                            <div className='card-footer'>
                                              <div className="col-6 offset-4 py-1">
                                                {auth.user && auth.user.appUserId && (
                                                <Link className="btn btn-primary btn-sm me-1" to={`/trip/edit/${trip.tripId}`}>
                                                    <i className="bi bi-pencil-square"></i> Edit Trip
                                                </Link>
                                                )}
                                                {auth.user && auth.user.hasRole('ROLE_ADMIN') && (
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTrip(trip)}>
                                                    <i className="bi bi-trash"></i> Delete Trip
                                                </button>
                                                )}
                                              </div>
                                            </div> 
                                        </div>
                                </div>   
                            ))}
                        </div>
                    </div>
        </>
    )
}

export default TripCards;
