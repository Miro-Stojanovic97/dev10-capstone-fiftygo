import { useEffect, useState } from 'react';

//TODO: figure out exactly what needs to be in here
const TRIP_DEFAULT = {
    tripId: 0,
    tripDescription: "",
    tripStartDate: "",
    tripEndDate: "",
    tripTransportation: "",
    tripPriority: 0,
    tripDidIt: 0,
};


function Trips() {
    // Define our state variables.
    // We use destructuring to get the individual values that are returned from the useState function call.
    const [trips, setTrips] = useState([]);
    const [trip, setTrip] = useState(TRIP_DEFAULT);
    const [editTripId, setEditTripId] = useState(0);
    const [currentView, setCurrentView] = useState('Cards'); // Add, Edit
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        fetch('http://localhost:8080/fiftygo/trip')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => setTrips(data))
            .catch(console.log);
    }, []);


    const handleChange = (event) => {
        // Make a copy of the object.
        const newTrip = { ...trip };

        // Update the value of the property that just changed.
        // We can "index" into the object using square brackets (just like we can do with arrays).
        if (event.target.type === 'checkbox') {
            newTrip[event.target.name] = event.target.checked;
        } else {
            newTrip[event.target.name] = event.target.value;
        }

        setTrip(newTrip);
    };


    const handleEditTrip = (tripId) => {
        // Update the tripId state variable to the tripId that we need to edit.
        setEditTripId(tripId);

        // Find the trip in the array of trips for the tripId that we need to edit.
        const trip = trips.find(trip => trip.id === tripId);

        // Create a copy of the trip to edit.
        const editTrip = { ...trip };

        // Update the trip state variable with the trip object that we need to edit.
        setTrip(editTrip);

        // Update the current view to display the form.
        setCurrentView('Edit');
    };


    const handleDeleteTrip = (tripId) => {
        const trip = trip.find(trip => trip.id === tripId);

        if (window.confirm(`Delete this Trip?: ${trip.tripDescription}`)) {
            const init = {
                method: 'DELETE'
            };

            fetch(`http://localhost:8080/fiftygo/trip/${tripId}`, init)
                .then(response => {
                    if (response.status === 204) {
                        // create a copy of the pins array
                        // remove the trip that we need to delete
                        const newTrips = trip.filter(trip => trip.id !== tripId);

                        // update the state variable
                        setTrips(newTrips);

                        resetState();
                    } else {
                        return Promise.reject(`Unexpected status code: ${response.status}`);
                    }
                })
                .catch(console.log);
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        if (editTripId === 0) {
            addTrip();
        } else {
            updateTrip();
        }
    };


    const addTrip = () => {
        const init = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trip)
        };

        fetch('http://localhost:8080/fiftygo/trip', init)
            .then(response => {
                if (response.status === 201 || response.status === 400) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                if (data.id) {
                    /*
                    On the happy path, "data" is an object that looks this:
                    {
                      "tripId": 1,
                      "tripDescription": "Test!",
                      "tripStartDate": "2022-10-31",
                      "tripEndDate": "2022-11-31",
                      "transportation": "Car",
                      "tripPriority": 1,
                      "tripDidIt": false,
                      "pin": {
                        ...
                      },
                      "userId": 4
                    }
                    */

                    // create a copy of the trips array
                    const newTrips = [...trips];

                    // add the new pin
                    newTrips.push(data);

                    // update the Trips state variable
                    setTrips(newTrips);

                    resetState();
                } else {
                    setErrors(data);
                }
            })
            .catch(console.log);
    };


    const updateTrip = () => {
        // assign an ID
        trip.id = editTripId;

        const init = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trip)
        };

        fetch(`http://localhost:8080/fiftygo/trip/${editTripId}`, init)
            .then(response => {
                if (response.status === 204) {
                    return null;
                } else if (response.status === 400) {
                    return response.json();
                } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                }
            })
            .then(data => {
                if (!data) {
                    // create a copy of the Trips array
                    const newTrips = [...trips];

                    // we need to determine the index of the pin that we are editing
                    const indexToUpdate = newTrips.findIndex(trip => trip.id === editTripId);

                    // we need to update the trip at that index
                    newTrips[indexToUpdate] = trip;

                    // update the Trips state variable
                    setTrips(newTrips);

                    resetState();
                } else {
                    setErrors(data);
                }
            })
            .catch(console.log);
    };


    const resetState = () => {
        setTrip(TRIP_DEFAULT);
        setEditTripId(0);
        setCurrentView('Cards');
        setErrors([]);
    };


    return (
        <>
            <h1 className="display-1">Trips 🌍</h1>
            <p>Temporarily a table until trips can render, then TODO: switch to card collection</p>
            {(currentView === 'Add' || currentView === 'Edit') && (
                <>
                    <h2 className="mb-4">{editTripId > 0 ? 'Update Trip' : 'Add Trip'}</h2>

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

                    <form className="container" onSubmit={handleSubmit}>
                        <div className="form-group mt-3">
                            <label htmlFor="trip-description">Description:</label>
                            <input id="trip-description" name="trip-description" type="text" className="form-control"
                                value={trip.tripDescription} onChange={handleChange} />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="start-date">Start Date:</label>
                            <select id="start-date" name="start-date" type="date" className="form-control"
                                value={trip.tripStartDate} onChange={handleChange}>
                            </select>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="end-date">End Date:</label>
                            <select id="end-date" name="end-date" type="date" className="form-control"
                                value={trip.tripEndDate} onChange={handleChange}>
                            </select>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="transportation">Transportation:</label>
                            <input id="transportation" name="transportation" type="text" className="form-control"
                                value={trip.tripTransportation} onChange={handleChange} />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="trip-priority">Priority [1-5]:</label>
                            <input id="trip-priority" name="trip-priority" type="number" className="form-control"
                                value={trip.tripPriority} onChange={handleChange} />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="trip-did-it">Did It:</label>
                            <input id="trip-did-it" name="trip-did-it" type="number" className="form-control"
                                value={trip.tripDidIt} onChange={handleChange} />
                        </div>
                        <div className="mt-4">
                            <button className="btn btn-success" type="submit">
                                <i className="bi bi-file-earmark-check"></i> {editTripId > 0 ? 'Update Trip' : 'Add Trip'}
                            </button>
                            <button className="btn btn-warning" type="button" onClick={resetState}>
                                <i className="bi bi-stoplights"></i> Cancel
                            </button>
                        </div>
                    </form>
                </>
            )}


            {/* Temporary to see if trips can render, then swtich from table to card collection */}
            {currentView === 'Cards' && (
                <>
                <div className="container">
                    <h2 className="mb-4">Trips</h2>
                    <button className="btn btn-primary my-4" onClick={() => setCurrentView('Add')}>
                        <i className="bi bi-plus-circle"></i> Add Trip
                    </button>
                    {/* <table className="table table-striped table-hover table-sm">
                        <thead className="thead-dark">
                            <tr>
                                <th>Description</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Transportation</th>
                                <th>Priority</th>
                                <th>Did It</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trips.map(trip => (
                                <tr key={trip.tripId}>
                                    <td>{trip.tripDescription}</td>
                                    <td>{trip.tripStartDate}</td>
                                    <td>{trip.tripEndDate}</td>
                                    <td>{trip.tripPriority}</td>
                                    <td>{trip.tripDidIt}</td>
                                    <td>
                                        <div className="float-right mr-2">
                                            <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEditTrip(trip.id)}>
                                                <i className="bi bi-pencil-square"></i> Edit
                                            </button>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTrip(trip.id)}>
                                                <i className="bi bi-trash"></i> Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                    </div>

                    {/* card view */}
                    <div className="container">
                        <div className="row">
                            {trips.map(trip => {
                                <div className="col-4">
                                    <div key={trip.tripId + "-key"} className="card mb-5">
                                    <div className="row no-gutters">
                                        <div className="card-body">
                                            <h5 className="card-title mb-3">{trip.tripDescription}</h5>
                                            <div className="col-12">
                                                <h6 className="card-subtitle mb-2 text-muted">{trip.tripStartDate + "-" + trip.tripEndDate}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="card-subtitle mb-2">Priority: {trip.tripPriority}</h6>
                                            </div>
                                            <div className="col-6">
                                                <h6 className="card-subtitle mb-2">Completed?: {trip.tripDidIt}</h6>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEditTrip(trip.id)}>
                                                    <i className="bi bi-pencil-square"></i> Edit
                                                </button>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTrip(trip.id)}>
                                                    <i className="bi bi-trash"></i> Delete
                                                </button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>   
                            })}
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

export default Trips;