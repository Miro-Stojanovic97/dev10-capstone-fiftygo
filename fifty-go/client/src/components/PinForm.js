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
    cityId: 0,
    typeId: 0,
    appUserId: 0
};

const TYPE_DEFAULT = {
  typeId: 0,
  typeName: ""
}

const CITY_DEFAULT = {
  cityId: 0,
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
  //const [city, setCity] = useState(CITY_DEFAULT);
  const [errors, setErrors] = useState([]);
  const [types, setTypes] = useState([]);
  const [states, setStates] = useState([]);
  const [stateChoice, setStateChoice] = useState({});
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [currentState, setCurrentState] = useState({});

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
  }, []); // only do this when the page loads. This list doesn't need to be reloaded.

  useEffect(() => { //if stateChoice changes, please update currentCity
    fetch(`http://localhost:8080/fiftygo/city/state/${stateChoice}`, initGET)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(`Unexpected status code: ${response.status}`);
      }
    })
    .then(data => setCurrentCity(data))
    .catch(console.log);


  }, [stateChoice])


  // make a useEffect to get currentState? use {currentCity.stateAbr}
  useEffect(() => {
    if (currentCity) {
    setCurrentState(currentCity.stateAbr);
    }
  }, [currentCity]) // when there's a current city, or if current city changes, gimme a new current state.

  useEffect(() => {
    if (currentState) {
      setStateChoice(currentState.stateAbr);
    }
  }, [currentState])
  
  // useEffect(() => {
  //   // if the US state name changes in the form, get a different list of cities based on that state.
  //   if (currentState) {
  //     //console.log("currentState", currentState);
  //     fetch(`http://localhost:8080/fiftygo/city/state/${stateChoice}`, initGET)
  //     .then(response => {
  //       if (response.status === 200) {
  //         return response.json();
  //       } else {
  //         return Promise.reject(`Unexpected status code: ${response.status}`);
  //       }
  //     })
  //     .then(data => setCities(data))
  //     .catch(console.log);
  //   } else {
  //     setErrors("uh oh no cities loaded.")
  //   }
    
  // }, [stateChoice]); // if the currentState changes, gimme a new list of cities.


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

  const typeMapper = (currentTypeId) => {
    if (currentTypeId != 0) {
      const newTypesArr = types.filter(type => type.typeId !== currentTypeId);
      newTypesArr.unshift(types.filter(type => type.typeId === currentTypeId)[0]);

      const typesArr = newTypesArr.map(type => <option key={type.typeId} value={type.typeId}>{type.typeName}</option>)
      
      return typesArr;
    } 
  }

// need a way to get teh current state based on the currentCity.stateAbr
// currentState == currentCity.stateAbr

  const stateMapper = (currentStateAbr) => {
    if (currentStateAbr) {

      const newStatesArr = states.filter(state => state.stateAbr !== currentStateAbr)
      
      newStatesArr.unshift(states.filter(state => state.stateAbr === currentStateAbr)[0]);
      
      const statesArr = newStatesArr.map(state => <option key={state.stateAbr} value={state.stateAbr}>{state.stateName}</option> )
      //console.log(statesArr);
      return statesArr;
    }
  }

  useEffect(() => {
    if (pin.cityId != 0) {

      fetch(`http://localhost:8080/fiftygo/city/${pin.cityId}`, initGET)
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then(data => setCurrentCity(data))
      .catch(console.log);
    }
  }, [pin])

  // What I'd LIKE to have happen:
    // use pin.cityId to get a whole cityObj.
    // use that cityObj to setStateChoice(cityObj.stateAbr)
    // use the stateChoice to setCities(stateChoice)
    // then do the method where we rearrange the List<City> to have the current pin's city at the top as the default.

  const cityMapper = (currentCityId) => { // pass in pin.cityId
    if (currentCityId != 0) {
      console.log("currentState", currentState);
      console.log("currentCityId: ", currentCityId) //make sure we are getting the cityId. We are.
      console.log("currentCity before if: ", currentCity)
      if (currentCity.stateAbr == stateChoice && cities.length > 0) {// only actually do this if we really have a current City in state
        console.log("currentCity inside if:", currentCity); // make sure we still get the right city (we aren't getting anything!! >:( )
        const newCitiesArr = cities.filter(city => city.stateAbr !== currentCity.stateAbr)
        console.log("cities", cities);
      
        newCitiesArr.unshift(cities.filter(city => city.stateAbr === currentCity.stateAbr)[0]);

        console.log("newCitiesArr", newCitiesArr);
        
        const citiesArr = newCitiesArr.map(city => <option key={city.cityId} value={city.cityId}>{city.cityName}</option> )
        
        return citiesArr;
      } else { //currentCity doesn't match stateChoice, just give me cities
        return cities.map(city => <option key={city.cityId} value={city.cityId}>{city.cityName}</option> );
      }

      // then if we had a cityObj, we'd use its stateAbr to get all cities from that state
      
          // The rest fails because we aren't getting a city...
      
      //const newCitiesArr = cities.filter(city => city.cityId != currentCityId);
      //console.log(newCitiesArr);
      //newCitiesArr.unshift(cities.filter(city => city.cityId == currentCityId)[0]);

      //const citiesArr = newCitiesArr.map(city => <option key={city.cityId} value={city.cityId}>{city.cityName}</option> )
      
      
      // return citiesArr;
    }
  }

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
              {stateMapper(currentCity.stateAbr)}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="cityId">City:</label>
          <select id="cityId" name="cityId" className="form-control"
              onChange={handleChange} >
              {cityMapper(currentCity.cityId)}
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