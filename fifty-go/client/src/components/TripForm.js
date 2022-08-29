import { useEffect, useState, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import Errors from './Errors';


//See line 240 for main TODO: Add ability to add Pins in the form. Not 100% sure how.


const TRIP_DEFAULT = {
    tripId: 0,
    tripDescription: "",
    tripStartDate: "",
    tripEndDate: "",
    tripTransportation: "",
    tripPriority: 0,
    tripDidIt: 0,
    //...
};


function TripForm() {
  const [trip, setTrip] = useState(TRIP_DEFAULT);
  const [errors, setErrors] = useState([]);

  const auth = useContext(AuthContext);

  const history = useHistory();

//   Not using destructuring...
//   const params = useParams();
//   const id = params.id;

//   // Using destructuring...
  const { id } = useParams();


  useEffect(() => {
//     // Make sure that we have an "id" value...
    if (id) {

      const init = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.user.token}`
        },
      };

      fetch(`http://localhost:8080/fiftygo/trip/${id}`, init)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        .then(data => setTrip(data))
        .then(console.log(trip))
        .catch(console.log);
    }
  }, [id]); // Hey React... please call my arrow function every time the "id" route parameter changes value


  const handleChange = level => (event) => {
     // Make a copy of the object.
    if (!level) {
      if (event.target.type === 'checkbox') {
            setTrip({
              ...trip, [event.target.name] : event.target.checked
            })
            
          } else {
            setTrip({
              ...trip, [event.target.name] : event.target.value
            })
          } 
    } else {
      setTrip({
        ...trip,
        [level]: {
          ...trip[level], [event.target.name] : event.target.value
        }
      })
    }
//     // Update the value of the property that just changed.
//     // We can "index" into the object using square brackets (just like we can do with arrays).
    
// TODO for adding a pin
    // console.log(pin);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    if (id) {
      console.log(trip);
      updateTrip();
    } else {
      addTrip();
    }
  };


  const addTrip = () => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.user.token}`
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
            const TRIP_DEFAULT = {
                tripDescription: "Going to the east coast",
                tripStartDate: "2022-05-06",
                tripEndDate: "2022-05-12",
                tripTransportation: "Car",
                tripPriority: 0,
                tripDidIt: 0,
                Pin {
                    ...
                }
};
};
          }

          */

          // Send the user back to the list route.
          history.push('/trip');
        } else {
          /*
          On the unhappy path, 
          */

          setErrors(data);
        }
      })
      .catch(console.log);
  };


  const updateTrip = () => {
    // assign an ID (this is probably needed anymore)
    trip.tripId = id;
    //console.log(trip);

    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.user.token}`
      },
      body: JSON.stringify(trip)
    };
  
    fetch(`http://localhost:8080/fiftygo/trip/${id}`, init)
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
          // Send the user back to the cards route.
          history.push('/trips');
        } else {
          setErrors(data);
        }
      })
      .catch(console.log);
  };

  return (
    <>
      <h2 className="mb-4">{id ? 'Update Trip' : 'Add Trip'}</h2>

      <Errors errors={errors} />

      {/* const TRIP_DEFAULT = {
            tripId: 0,
            tripDescription: "",
            tripStartDate: "",
            tripEndDate: "",
            tripTransportation: "",
            tripPriority: 0,
            tripDidIt: 0,
            //...
}; */}
       <form onSubmit={handleSubmit}>
         <div className="form-group">
           <label htmlFor="tripDescription">Description:</label>
           <input id="tripDescription" name="tripDescription" type="text" className="form-control"
            value={trip.tripDescription} onChange={handleChange()} />
         </div>
         <div className="form-group">
           <label htmlFor="tripStartDate">Start Date:</label>
           <input id="tripStartDate" name="tripStartDate" type="date" className="form-control"
             value={trip.tripStartDate} onChange={handleChange} />
         </div>
         <div className="form-group">
           <label htmlFor="tripEndDate">End Date:</label>
           <input id="tripEndDate" name="tripEndDate" type="date" className="form-control"
             value={trip.tripEndDate} onChange={handleChange} />
         </div>
         <div className="form-group">
           <label htmlFor="tripPriority">Priority:</label>
           <input id="tripPriority" name="tripPriority" type="number" className="form-control"
             value={trip.tripPriority} onChange={handleChange} />
         </div>
         <div className="form-group">
           <label className="form-check-label" htmlFor="tripDidIt">Did It?:</label>
           <input id="tripDidIt" name="tripDidIt" type="checkbox" className="form-check-input"
             checked={trip.tripDidIt} onChange={handleChange} />
         </div>

        {/* //TODO: Add the ability to add Pins in the form. 
        Not 100% how we should do that yet.  */}


         <div className="mt-4">
           <button className="btn btn-success mr-2" type="submit">
             <i className="bi bi-file-earmark-check"></i> {id ? 'Update Trip' : 'Add Trip'}
           </button>
           <Link className="btn btn-warning" to="/trips">
             <i className="bi bi-stoplights"></i> Cancel
           </Link>
         </div>
       </form>
     </>
   );
 }

            
 export default TripForm;