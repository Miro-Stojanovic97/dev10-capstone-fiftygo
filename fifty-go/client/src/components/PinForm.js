
import { useEffect, useState, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Errors from "./Errors";
const PIN_DEFAULT = {
  pinId: 1,
  pinDescription: "",
  pinDate: "",
  pinPriority: 0,
  pinDidIt: false,
  city: {
    stateAbr: "AL",
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
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.user.token}`,
    },
  };

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/fiftygo/pin/${id}`, initGET)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        .then((data) => {
          setPin(data);
          setStateChoice(data.city.stateAbr);
        })
        .catch(console.log);
    }
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:8080/fiftygo/type", initGET)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then((data) => setTypes(data))
      .catch(console.log);
  }, []);
  
  useEffect(() => {
    fetch("http://localhost:8080/fiftygo/city/states", initGET)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then((data) => setStates(data))
      .catch(console.log);
  }, []);

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
  };

  const setStateHelper = (stateAbbr) => {
    return new Promise((resolve) => {
      setStateChoice(stateAbbr);
      resolve();
    });
  };

  const handleChangeCity = (event) => {
    const selectedCityId = event.target.value;
    setCityChoice(selectedCityId);
    const newPin = {...pin };
    const cityObj = cities.filter(city => city.cityId == selectedCityId)[0];
    newPin["city"] = cityObj;
    newPin["cityId"] = cityObj.cityId;
    console.log("newPin", newPin);
    setPin(newPin);
  };

  const handleChange = (event) => {
    const newPin = { ...pin };
    if (event.target.type === "checkbox") {
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.user.token}`,
      },
      body: JSON.stringify(pin),
    };
    fetch("http://localhost:8080/fiftygo/pin", init)
      .then((response) => {
        if (response.status === 201 || response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then((data) => {
        if (data.pinId) {
          history.push("/pinlist");
        } else {
          setErrors(data);
        }
      })
      .catch(console.log);
  };

  const updatePin = () => {
    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.user.token}`,
      },
      body: JSON.stringify(pin),
    };

    fetch(`http://localhost:8080/fiftygo/pin/${id}`, init)
      .then((response) => {
        if (response.status === 204) {
          return null;
        } else if (response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then((data) => {
        if (!data) {
          history.push("/pinlist");
        } else {
          setErrors(data);
        }
      })
      .catch(console.log);
  };

  const typeMapper = (currentTypeId) => {
    if (currentTypeId != 0 && types.length > 0) {
      const newTypesArr = types.filter((type) => type.typeId != currentTypeId);
      newTypesArr.unshift(
        types.filter((type) => type.typeId == currentTypeId)[0]
      );
      const typesArr = newTypesArr.map((type) => (
        <option key={type.typeId} value={type.typeId}>
          {type.typeName}
        </option>
      ));
      return typesArr;
      } else {
        const typesArr = types.map((type) => (
          <option key={type.typeId} value={type.typeId}>
            {type.typeName}
          </option>
          
        ));
        typesArr.unshift(<option key={"no-type"}></option>);
        return typesArr;
      }
  };

  const stateMapper = (currentStateAbr) => {
    if (currentStateAbr && states.length > 0) {
      const newStatesArr = states.filter(
        (state) => state.stateAbr !== currentStateAbr
      );
      newStatesArr.unshift(
        states.filter((state) => state.stateAbr === currentStateAbr)[0]
      );
      const statesArr = newStatesArr.map((state) => (
        <option key={state.stateAbr} value={state.stateAbr}>
          {state.stateName}
        </option>
      ));
      return statesArr;
    } else {
      const statesArr = states.map((state) => (
        <option key={state.stateAbr} value={state.stateAbr}>
          {state.stateName}
        </option>
      ));
      statesArr.unshift(<option key={"no-state"}></option>);
      return statesArr;
    }
  };

  const cityMapper = () => {
    if (cities.length > 0) {
        const citiesArr = cities.map((city) => (
          <option key={city.cityId} value={city.cityId}>
            {city.cityName}
          </option>
        ));
        citiesArr.unshift(<option key={"no-city!"}></option>);
        return citiesArr;
    }
  };

  return (
    <>
      <div className="container col-5 mb-5 mt-5">
        <h2 className="mb-4">{id ? "Update Pin" : "Add Pin"}</h2>
        <Errors errors={errors} />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="pinDescription">Description:</label>
            <input
              id="pinDescription"
              name="pinDescription"
              type="text"
              className="form-control"
              value={pin.pinDescription}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="typeName">Type:</label>
            <select
              id="typeId"
              name="typeId"
              type="text"
              className="form-control"
              value={types ? types[0] : ""}
              onChange={handleChange}
            >
              {typeMapper(pin.typeId)}
            </select>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="pinDate">Date:</label>
            <input
              id="pinDate"
              name="pinDate"
              type="date"
              className="form-control"
              value={pin.pinDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="pinPriority">Priority:</label>
            <input
              id="pinPriority"
              name="pinPriority"
              type="number"
              className="form-control"
              value={pin.pinPriority}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label className="form-check-label me-2" htmlFor="pinDidIt">
              Did It?:
            </label>
            <input
              id="pinDidIt"
              name="pinDidIt"
              type="checkbox"
              className="form-check-input"
              checked={pin.pinDidIt}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="stateChoice">State:</label>
            <select
              id="stateChoice"
              name="stateChoice"
              className="form-control"
              onChange={handleChangeState}
            >
              {pin ? <option></option> : ""}
              {stateMapper(pin.city.stateAbr)}
            </select>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="cityId">City:</label>
            <select
              id="cityId"
              name="cityId"
              className="form-control"
              onChange={handleChangeCity}
            >
              {cityMapper()}
            </select>
          </div>
          <div className="mt-4">
            <button className="btn btn-success me-2" type="submit">
              <i className="bi bi-file-earmark-check"></i>{" "}
              {id ? "Update Pin" : "Add Pin"}
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