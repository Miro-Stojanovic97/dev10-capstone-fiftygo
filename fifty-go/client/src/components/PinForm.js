import { useEffect, useState, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import Errors from './Errors';

const PIN_DEFAULT = {
    pinId: 1,
    pinDescription: "",
    pinDate: "",
    pinPriority: 0,
    pinDidIt: false,
    cityId: 1,
    typeId: 0,
    appUserId: 0
};

const TYPE_DEFAULT = {
  typeId: 1,
  typeName: ""
}

const CITY_DEFAULT = {
  cityId: 1840003046,
  cityName: "Milwaukee",
  stateAbr: "WI",
  stateName: "Wisconsin",
  latitude: 43.0642,
  longitude: -87.9675
}

const STATE_DEFAULT = CITY_DEFAULT.stateAbr;

function PinForm() {
  const [pin, setPin] = useState(PIN_DEFAULT);
  const [pinType, setPinType] = useState(TYPE_DEFAULT);
  const [city, setCity] = useState(CITY_DEFAULT);
  const [errors, setErrors] = useState([]);
  const [types, setTypes] = useState([]);
  const [stateChoice, setStateChoice] = useState(STATE_DEFAULT);
  const [cities, setCities] = useState([]);

  const auth = useContext(AuthContext);
  const history = useHistory();
  const { id } = useParams();


  const initGET = {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.user.token}`
        }
      }


// const getPinType = () => { // get the current pin's type and store data in type via setType??
//     fetch(`http://localhost:8080/fiftygo/type/${pin.typeId}`, initGET)
//     .then(response => {
//       if (response.status === 200) {
//         return response.json();
//       } else {
//         return Promise.reject(`Unexpected status code: ${response.status}`);
//       }
//     })
//     .then(data => setPinType(data))
//     .catch(console.log);
//   } // want to set type so we can have it in the form...


useEffect(() => { // get the current pin we'd like to edit
    // Make sure that we have an "id" value...
    //console.log(pin);
    if (id) {
      fetch(`http://localhost:8080/fiftygo/pin/${id}`, initGET)
        .then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        .then(data => setPin(data))
        //.then(getPinType()) // would really like to get the type....
        .catch(console.log);
    }
  }, [id]); // Hey React... please call my arrow function every time the "id" route parameter changes value


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
    //.then(() => getPinType({pin})) // maybe how I can get type to update what we see if the form field??? TODO!
    .catch(console.log);
  }, []); // only do this when the page loads


  // useEffect(() => { // get the current pin's city and store data in city via setCity
  //   fetch(`http://localhost:8080/fiftygo/city/${pin.cityId}`, initGET)
  //   .then(response => {
  //     if (response.status === 200) {
  //       return response.json();
  //     } else {
  //       return Promise.reject(`Unexpected status code: ${response.status}`);
  //     }
  //   })
  //   .then(data => setCity(data))
  //   .catch(console.log);
  // }, [pin.cityId]); // TODO: do this when pin is set, but not really working....??

  
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
  }, [stateChoice]); // hey react, do this fetch and stuff whenever stateChoice changes!


  const handleChangeState = (event) => {
    setStateChoice(event.target.value);
  }


  const handleChange = (event) => {
    // Make a copy of the object.
    const newPin = { ...pin };

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
    pin.appUserId = auth.user.appUserId;
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
        if (data.pinId) {
          // Send the user back to the list route.
          history.push('/pinlist');
        } else {
          setErrors(data); // can get validation error messages from server
        }
      })
      .catch(console.log);
  };


  const updatePin = () => {

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
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pinDescription">Description:</label>
          <input id="pinDescription" name="pinDescription" type="text" className="form-control"
            value={pin.pinDescription} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="typeName">Type:</label>
          <select id="typeId" name="typeId" type="text" className="form-control" defaultValue={pinType.typeName} onChange={handleChange}>
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
          <label htmlFor="cityId">City:</label>
          <select id="cityId" name="cityId" className="form-control"
              defaultValue={city.cityName} onChange={handleChange} >
              {/* {console.log(cities)} */}
              {cities.map(city => (
                <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
              ))}
          </select>
        </div>
        <div className="mt-4">
          <button className="btn btn-success me-2" type="submit">
            <i className="bi bi-file-earmark-check"></i> {id ? 'Update Pin' : 'Add Pin'}
          </button>
          <Link className="btn btn-warning me-2" to="/pinlist">
            <i className="bi bi-stoplights"></i> Cancel
          </Link>
          <Link className="btn btn-warning" to="/tripcards">
            <i className="bi bi-stoplights"></i> View Trips
          </Link>
        </div>
      </form>
    </>
  );
}

            
export default PinForm;