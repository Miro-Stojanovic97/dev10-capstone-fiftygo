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
  city: {
    stateAbr: "NJ",
    cityName: "Trenton",
  },
  typeId: 0,
  appUserId: 0,
};

function PinForm() {
  const [pin, setPin] = useState(PIN_DEFAULT);
  const [errors, setErrors] = useState([]);
  const [types, setTypes] = useState([]);
  const [states, setStates] = useState([]);
  const [stateChoice, setStateChoice] = useState({});
  const [cities, setCities] = useState([]);
  const [cityChoice, setCityChoice] = useState({});

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

  useEffect(() => { // get the current pin we'd like to edit
    // Make sure that we have an "id" value...
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
        .catch(console.log);
    }
  }, [id]); // call every time the "id" route parameter changes value


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
  }, []); // only do this when the page loads

  useEffect(() => { // get all the States and store data in states via setStates?
    fetch("http://localhost:8080/fiftygo/city/states", initGET)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(`Unexpected status code: ${response.status}`);
      }
    })
    .then(data => setStates(data))
    .catch(console.log);
  }, []); // only do this when the page loads. 

  useEffect(() => {
    getCitiesByState(pin.city.stateAbr);
  }, [stateChoice]);

  const getCitiesByState = (stateAbr) => {
    fetch(`http://localhost:8080/fiftygo/city/state/${stateAbr}`, initGET)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then((data) => setCities(data))
      .catch(console.log);
  };

  const handleChangeState = (event) => {
    setStateHelper(event.target.value).then(() =>
      getCitiesByState(event.target.value)
    );
  }

  const setStateHelper = (stateAbbr) => {
    return new Promise((resolve) => {
      setStateChoice(stateAbbr);
      resolve();
    });
  };

  const handleChangeCity = (event) => {
    setCityChoice(event.target.value);
  };

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
          history.push('/pinlist'); // Send the user back to the list route.
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

  const typeMapper = (currentTypeId) => {
    if (currentTypeId != 0) {
      const newTypesArr = types.filter(type => type.typeId !== currentTypeId);
      newTypesArr.unshift(types.filter(type => type.typeId === currentTypeId)[0]);

      const typesArr = newTypesArr.map(type => <option key={type.typeId} value={type.typeId}>{type.typeName}</option>)
      
      return typesArr;
    } 
  }

  const stateMapper = (currentStateAbr) => {
    if (currentStateAbr) {

      const newStatesArr = states.filter(state => state.stateAbr !== currentStateAbr)
      
      newStatesArr.unshift(states.filter(state => state.stateAbr === currentStateAbr)[0]);
      
      const statesArr = newStatesArr.map(state => <option key={state.stateAbr} value={state.stateAbr}>{state.stateName}</option> )
      
      return statesArr;
    }
  }

  const cityMapper = () => { // pass in pin.cityId
    if (cities.length > 0) {
        return cities.map(city => <option key={city.cityId} value={city.cityId}>{city.cityName}</option> );
    }
  };

  return (
    <>
    <div className='container my-2'>
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
          <select id="typeId" name="typeId" type="text" className="form-control" onChange={handleChange}>
              {typeMapper(pin.typeId)}
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
          <select id="stateChoice" name="stateChoice" className="form-control" onChange={handleChangeState}>
              {stateMapper(cityChoice.stateAbr ? cityChoice.stateAbr : "")}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="cityId">City:</label>
          <select id="cityId" name="cityId" className="form-control"
              onChange={handleChange} >
                <option></option>
              {cityMapper()}
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
    </div>
      
    </>
  );
}

            
export default PinForm;