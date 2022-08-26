import { useEffect, useState } from 'react';

//TODO: figure out exactly what needs to be in here
const PIN_DEFAULT = {
    pinDescription: "",
    pinType: "",
    pinDate: "",
    pinPriority: 0,
    pinDidIt: 0,
    pinCity: {},
    pinState: {}
};


function Pins() {
    // Define our state variables.
    // We use destructuring to get the individual values that are returned from the useState function call.
    const [pins, setPins] = useState([]);
    const [pin, setPin] = useState(PIN_DEFAULT);
    const [editPinId, setEditPinId] = useState(0);
    const [currentView, setCurrentView] = useState('List'); // Add, Edit
    const [errors, setErrors] = useState([]);
    

    useEffect(() => {
        fetch('http://localhost:8080/fiftygo/pin')
          .then(response => {
            if (response.status === 200) {
              return response.json();
            } else {
              return Promise.reject(`Unexpected status code: ${response.status}`);
            }
          })
          .then(data => setPins(data))
          .catch(console.log);
      }, []);
    

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


      const handleEditPin = (pinId) => {
        // Update the pinId state variable to the pinId that we need to edit.
        setEditPinId(pinId);
    
        // Find the pin in the array of pins for the pinId that we need to edit.
        const pin = pins.find(pin => pin.id === pinId);
    
        // Create a copy of the pin to edit.
        const editPin = { ...pin };
    
        // Update the pin state variable with the pin object that we need to edit.
        setPin(editPin);
    
        // Update the current view to display the form.
        setCurrentView('Edit');
      };


      const handleDeletePin = (pinId) => {
        const pin = pin.find(pin => pin.id === pinId);
    
        if (window.confirm(`Delete this activity Pin?: ${pin.pin_description}`)) {
          const init = {
            method: 'DELETE'
          };
    
          fetch(`http://localhost:8080/fiftygo/pin/${pinId}`, init)
            .then(response => {
              if (response.status === 204) {
                // create a copy of the pins array
                // remove the pin that we need to delete
                const newPins = pin.filter(pin => pin.id !== pinId);
    
                // update the state variable
                setPins(newPins);
    
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
    
        if (editPinId === 0) {
          addPin();
        } else {
          updatePin();
        }
      };


      const addPin = () => {
        const init = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
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
                "pinId": 3,
                "pinDescription": "Test!",
                "pinDate": "2022-10-31",
                "pinPriority": 1,
                "pinDidIt": false,
                "city": {
                  "cityId": 1630035577,
                  "cityName": "San Juan",
                  "stateAbr": "PR",
                  "stateName": "Puerto Rico",
                  "latitude": 18.3985,
                  "longitude": -66.0610
                },
                "type": {
                  "typeId": 26,
                  "typeName": "ski"
                },
                "userId": 4
              }
    
              */
    
              // create a copy of the pins array
              const newPins = [...pins];
    
              // add the new pin
              newPins.push(data);
    
              // update the pins state variable
              setPins(newPins);
    
              resetState();
            } else {
              /*
    
              On the unhappy path, "data" is an array that looks this:
    
              [
                "Pin `description` is required.",
                "Pin `date` must be ##//##/##??.",
                "Pin `priority` must be between 1 and 5.",
                "Pin `did it` must be yes(1) or no(0)."
                ...?
              ]
    
              */
    
              setErrors(data);
            }
          })
          .catch(console.log);
      };


      const updatePin = () => {
        // assign an ID
        pin.id = editPinId;
    
        const init = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(pin)
        };
      
        fetch(`http://localhost:8080/fiftygo/pin/${editPinId}`, init)
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
              // create a copy of the pins array
              const newPins = [...pins];
    
              // we need to determine the index of the pin that we are editing
              const indexToUpdate = newPins.findIndex(pin => pin.id === editPinId);
    
              // we need to update the pin at that index
              newPins[indexToUpdate] = pin;
    
              // update the pins state variable
              setPins(newPins);
    
              resetState();
            } else {
              setErrors(data);
            }
          })
          .catch(console.log);
      };


      const resetState = () => {
        setPin(PIN_DEFAULT);
        setEditPinId(0);
        setCurrentView('List');
        setErrors([]);
      };


    return (
        <>
        <h1 className="display-1">Pins 🌍</h1>
        <p> TODO: Fill out pins page </p>

        {(currentView === 'Add' || currentView === 'Edit') && (
        <>
          <h2 className="mb-4">{editPinId > 0 ? 'Update Pin' : 'Add Pin'}</h2>

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

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="pin-description">Description:</label>
              <input id="pin-description" name="pin-description" type="text" className="form-control"
                value={pin.description} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="pin-type">Type:</label>
              <select id="pin-type" name="pin-type" className="form-control"
                value={pin.type} onChange={handleChange}>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="pin-date">Date:</label>
              <input id="pin-date" name="pin-date" type="pin-date" className="form-control"
                value={pin.date} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="pin-priority">Priority [1-5]:</label>
              <input id="pin-priority" name="pin-priority" type="number" className="form-control"
                value={pin.priority} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="pin-did-it">Did it:</label>
              <input id="pin-did-it" name="pin-did-it" type="number" className="form-control"
                value={pin.didIt} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="pin-state">State:</label>
              <select id="pin-state" name="pin-state" className="form-control"
              //not sure if pin.city.state declaration will work right
                value={pin.city.state} onChange={handleChange}> 
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="pin-city">City:</label>
              <select id="pin-city" name="pin-city" className="form-control"
                value={pin.city} onChange={handleChange}>
              </select>
            </div>
            <div className="mt-4">
              <button className="btn btn-success mr-2" type="submit">
                <i className="bi bi-file-earmark-check"></i> {editPinId > 0 ? 'Update Pin' : 'Add Pin'}
              </button>
              <button className="btn btn-warning" type="button" onClick={resetState}>
                <i className="bi bi-stoplights"></i> Cancel
              </button>
            </div>
          </form>
        </>
      )}

      {currentView === 'List' && (
        <>
          <h2 className="mb-4">Pins</h2>
          <button className="btn btn-primary my-4" onClick={() => setCurrentView('Add')}>
            <i className="bi bi-plus-circle"></i> Add Pin
          </button>
          <table className="table table-striped table-hover table-sm">
            <thead className="thead-dark">
              <tr>
                <th>Description</th>
                <th>Type</th>
                <th>Date</th>
                <th>Priority</th>
                <th>Did It</th>
                <th>City</th>
                <th>State</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {pins.map(pin => (
                <tr key={pin.id}>
                  <td>{pin.description}</td>
                  <td>{pin.type}</td>
                  <td>{pin.date}</td>
                  <td>{pin.priority}</td>
                  <td>{pin.didIt}</td>
                  <td>{pin.city}</td>
                  <td>
                    <div className="float-right mr-2">
                      <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEditPin(pin.id)}>
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeletePin(pin.id)}>
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

        </>
    )
}

export default Pins;