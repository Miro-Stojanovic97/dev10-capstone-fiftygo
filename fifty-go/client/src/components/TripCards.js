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
        }, []); // An empty dependency array tells to run our side effect once when the component is initially loaded.

    const handleDeleteTrip = (tripId) => {
        const trip = trips.find(trip => trip.tripId === tripId);
        
        if (window.confirm(`Delete trip ${trip.tripDescription} from ${trip.tripStartDate} to ${trip.tripEndDate}?`)) {
            const init = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${auth.user.token}`
            },
            };
        
            fetch(`http://localhost:8080/fiftygo/trip/${tripId}`, init)
            .then(response => {
                if (response.status === 204) {
                    // create a copy of the trips array
                    // remove the trip that we need to delete
                    const newTrips = trips.filter(trip => trip.id !== tripId);
        
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
                    <h2 className="mb-4">Trips</h2>
                    <button className="btn btn-primary mt-4" onClick={() => history.push('/trip/add')}>
                        <i className="bi bi-plus-circle"></i> Add Trip
                    </button>
                    </div>
                    <div className="container">
                        <div className="row">
                            {trips.map(trip => {
                              {console.log(trip)}
                                <div className="col-12">
                                    <div key={trip.tripId + "-key"} className="card mb-5">
                                        <div className="card-body">
                                            <h5 className="card-title mb-3">{trip.tripDescription}</h5>
                                            <div className="col-12">
                                                <h6 className="card-subtitle mb-2">{trip.tripStartDate + "-" + trip.tripEndDate}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="card-subtitle mb-2">Priority: {trip.tripPriority}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="card-subtitle mb-2">Completed?: {trip.tripDidIt}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="card-text mb-2">Pins: {trip.pins}</h6>
                                            </div>
                                            <div className="col-12">
                                                {auth.user && auth.user.appUserId && (
                                                <Link className="btn btn-primary btn-sm mr-2" to={`/pins/edit/${trip.tripId}`}>
                                                    <i className="bi bi-pencil-square"></i> Edit
                                                </Link>
                                                )}
                                                {auth.user && auth.user.hasRole('ROLE_ADMIN') && (
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTrip(trip.id)}>
                                                    <i className="bi bi-trash"></i> Delete
                                                </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>   
                            })}
                        </div>
                    </div>
        </>
    )
}

export default TripCards;
