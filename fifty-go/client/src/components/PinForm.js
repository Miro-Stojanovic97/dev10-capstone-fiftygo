import { useEffect, useState, useContext } from 'react';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import { Link, useHistory, useParams } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import CityList from './CityList';
import Errors from './Errors';

const PIN_DEFAULT = {
    pinId: 0,
    pinDescription: "",
    pinDate: "",
    pinPriority: 0,
    pinDidIt: false,
    city: {
      cityName: "",
      stateAbr: "",
    },
    type: {
      typeId: 0,
      typeName: "",
    },
    userId: 0
};

function PinForm() {
  const [pin, setPin] = useState(PIN_DEFAULT);
  const [errors, setErrors] = useState([]);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState({});
  const [stateChoice, setStateChoice] = useState("");
  const [cities, setCities] = useState(stateChoice);
  const [city, setCity] = useState({});

  const auth = useContext(AuthContext);

  const history = useHistory();

  // Not using destructuring...
  // const params = useParams();
  // const id = params.id;

  // Using destructuring...
  const { id } = useParams();

  const initGET = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.user.token}`
        }
      }

  useEffect(() => { // get all the types and store data in types via setTypes
    fetch("http://localhost:8080/fiftygo/type", initGET)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(`Unexpected status code: ${response.status}`);
      }
    })
    .then(data => setTypes(data))
    .catch(console.log);
  }, []);

  useEffect(() => {
    // Make sure that we have an "id" value...
    if (id) {

      // const init = {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${auth.user.token}`
      //   },
      // };

      fetch(`http://localhost:8080/fiftygo/pin/${id}`, initGET)
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

  const handleChangeType = async (event) => {
    const type = await fetch(`http://localhost:8080/fiftygo/type/${event.target.value}`, initGET)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      // .then(data => setType(data))
      // .then(console.log(type))
      .catch(console.log);
  
      const newPin = {...pin}
    console.log(type);
    newPin.type = type;
    console.log(newPin);
    setPin(newPin);
  }

  useEffect(() => {
    // if the US state name changes in the form, get a different list of cities based on that state.
    fetch(`http://localhost:8080/fiftygo/city/state/${stateChoice}`, initGET)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => setCities(data))
      // .then(console.log(pin))
      .catch(console.log);
  }, [stateChoice]); // hey react, do this whenever stateChoice changes?

  const handleChangeState = (event) => {
    setStateChoice(event.target.value);
  }
  const handleChangeCity = (event) => {
    const newCity = { ...city}
    newCity[event.target.name] = event.target.value;
    setCity(newCity);
  }

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
          history.push('/pinlist');
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
          history.push('/pinlist');
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
            value={pin.pinDescription} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="typeName">Type:</label>
          <select
            id="typeName"
            name="typeName"
            type="text"
            className="form-control"
            defaultValue={pin.type.typeName} onChange={handleChangeType}>
              {types.map(type => (
                <option key={type.typeId} value={type.typeId}>{type.typeName}</option>
              ))}
            </select>
        </div>
        <div className="form-group">
          <label htmlFor="pinDate">Date:</label>
          <input id="pinDate" name="pinDate" type="date" className="form-control"
            value={pin.pinDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="pinPriority">Priority:</label>
          <input id="pinPriority" name="pinPriority" type="number" className="form-control"
            value={pin.pinPriority} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label className="form-check-label" htmlFor="pinDidIt">Did It?:</label>
          <input id="pinDidIt" name="pinDidIt" type="checkbox" className="form-check-input"
            checked={pin.pinDidIt} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="stateChoice">State:</label>
          <select id="stateChoice" name="stateChoice" className="form-control"
            value={stateChoice} onChange={handleChangeState}>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="cityName">City:</label>
          <select id="cityName" name="cityName" className="form-control"
            defaultValue={pin.city.cityName} onChange={handleChangeCity} >
              {console.log(cities)}
              {cities.map(city => (
                <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
              ))}
          </select>
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