import { useEffect, useState, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import Errors from './Errors';

const PIN_DEFAULT = {
    pinDescription: "",
    pinType: "",
    pinDate: "",
    pinPriority: 0,
    pinDidIt: 0,
    pinCity: "",
    pinState: ""
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
      fetch(`http://localhost:8080/api/pin/${id}`)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        .then(data => setPin(data))
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (id) {
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

    fetch('http://localhost:8080/api/oin', init)
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
    pin.id = id;

    const init = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.user.token}`
      },
      body: JSON.stringify(pin)
    };
  
    fetch(`http://localhost:8080/api/pin/${id}`, init)
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
          history.push('/pin');
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
    pinCity: "",
    pinState: ""
}; */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input id="description" name="description" type="text" className="form-control"
            value={pin.pinDescription} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input id="type" name="type" type="text" className="form-control"
            value={pin.pinDescription} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input id="date" name="date" type="date" className="form-control"
            value={pin.pinDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority:</label>
          <input id="priority" name="priority" type="number" className="form-control"
            value={pin.pinPriority} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="didIt">Did It?:</label>
          <input id="didIt" name="didIt" className="form-control"
            value={pin.pinDidIt} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input id="city" name="city" className="form-control"
            value={pin.pinCity} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="state">State:</label>
          <input id="state" name="dstate" className="form-control"
            value={pin.pinState} onChange={handleChange} />
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