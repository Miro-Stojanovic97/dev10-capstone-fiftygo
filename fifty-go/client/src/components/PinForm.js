import { useEffect, useState, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import Errors from './Errors';

const PIN_DEFAULT = {
    pinId: 0,
    pinDescription: "",
    pinDate: "",
    pinPriority: 0,
    pinDidIt: false,
    city: {
      cityId: 0,
      cityName: "",
      stateAbr: "",
      stateName: "",
      cityLatitude: "1.0000",
      cityLongitude: "1.0000"
    },
    type: {
      typeId: 0,
      typeName: ""
    },
    userId: 0
};

function PinForm() {
  const [pin, setPin] = useState(PIN_DEFAULT);
  const [errors, setErrors] = useState([]);

  const auth = useContext(AuthContext);

  const history = useHistory();

  // Not using destructuring...
  // const params = useParams();
  // const id = params.id;

  // Using destructuring...
  const { id } = useParams();

  useEffect(() => {
    // Make sure that we have an "id" value...
    if (id) {

      const init = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.user.token}`
        },
      };

      fetch(`http://localhost:8080/fiftygo/pin/${id}`, init)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        .then(data => setPin(data))
        // .then(console.log(pin))
        .catch(console.log);
    }
  }, [id]); // Hey React... please call my arrow function every time the "id" route parameter changes value

  const handleChange = (event) => {
    // Make a copy of the object.
    const newPin = { ...pin };

    // Update the value of the property that just changed.
    // We can "index" into the object using square brackets (just like we can do with arrays).
    if (event.target.type === 'checkbox') {
      newPin[event.target.name] = event.target.checked;
    } else {
      newPin[event.target.name] = event.target.value;
    }

    setPin(newPin);
    //console.log(pin);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (id) {
      //console.log(pin);
      updatePin();
    } else {
      addPin();
    }
  };

  const addPin = () => {
    const init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.user.token}`
      },
      body: JSON.stringify(pin)
    };

    fetch('http://localhost:8080/fiftygo/pin', init)
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
            const PIN_DEFAULT = {
                pinDescription: "dgsdgsdg",
                pinType: "Ski",
                pinDate: "2022-12-12",
                pinPriority: 5,
                pinDidIt: 1,
                pinCity: "Milwaukee",
                pinState: "WI"
};
          }

          */

          // Send the user back to the list route.
          history.push('/pin');
        } else {
          /*

          On the unhappy path, "data" is an array that looks this:

          [
            "Pin `section` is required.",
            "Pin `row` must be a positive number less than or equal to 250.",
            "Pin `column` must be a positive number less than or equal to 250.",
            "Pin `material` is required."
          ]

          */

          setErrors(data);
        }
      })
      .catch(console.log);
  };

  const updatePin = () => {
    // assign an ID (this is probably needed anymore)
    pin.pinId = id;
    //console.log(pin);

    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.user.token}`
      },
      body: JSON.stringify(pin)
    };
  
    fetch(`http://localhost:8080/fiftygo/pin/${id}`, init)
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
          // Send the user back to the list route.
          history.push('/pins');
        } else {
          setErrors(data);
        }
      })
      .catch(console.log);
  };

  return (
    <>
      <h2 className="mb-4">{id ? 'Update Pin' : 'Add Pin'}</h2>

      <Errors errors={errors} />


      {/* const PIN_DEFAULT = {
          pinDescription: "",
          pinType: "",
          pinDate: "",
          pinPriority: 0,
          pinDidIt: 0,
          city: {

          },
          type: {

          }
          }; */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pinDescription">Description:</label>
          <input id="pinDescription" name="pinDescription" type="text" className="form-control"
            defaultValue={pin.pinDescription} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="type.typeName">Type:</label>
          <input id="type.typeName" name="type.typeName" type="text" className="form-control"
            defaultValue={pin.type.typeName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="pinDate">Date:</label>
          <input id="pinDate" name="pinDate" type="date" className="form-control"
            defaultValue={pin.pinDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="pinPriority">Priority:</label>
          <input id="pinPriority" name="pinPriority" type="number" className="form-control"
            defaultValue={pin.pinPriority} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-check-label" htmlFor="pinDidIt">Did It?:</label>
          <input id="pinDidIt" name="pinDidIt" type="checkbox" className="form-check-input"
            checked={pin.pinDidIt} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="city.stateAbr">State:</label>
          <input id="city.stateAbr" name="city.stateAbr" className="form-control"
            defaultValue={pin.city.stateAbr} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="city.cityName">City:</label>
          <input id="city.cityName" name="city.cityName" className="form-control"
            defaultValue={pin.city.cityName} onChange={handleChange} />
        </div>
        <div className="mt-4">
          <button className="btn btn-success mr-2" type="submit">
            <i className="bi bi-file-earmark-check"></i> {id ? 'Update Pin' : 'Add Pin'}
          </button>
          <Link className="btn btn-warning" to="/pins">
            <i className="bi bi-stoplights"></i> Cancel
          </Link>
        </div>
      </form>
    </>
  );
}

export default PinForm;