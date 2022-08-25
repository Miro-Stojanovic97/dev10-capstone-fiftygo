import { useEffect, useState } from 'react';

//TODO: figure out exactly what needs to be in here
const PIN_DEFAULT = {
    pinDescription: "",
    pinDate: "",
    pinPriority: 0,
    pinDidIt: 0
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
        fetch('http://localhost:8080/api/pin')
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
        setEditPinId(PinId);
    
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
    
          fetch(`http://localhost:8080/api/pin/${pinId}`, init)
            .then(response => {
              if (response.status === 204) {
                // create a copy of the pins array
                // remove the pin that we need to delete
                const newPin = pin.filter(pin => pin.id !== pinId);
    
                // update the solar panels state variable
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
    
        fetch('http://localhost:8080/api/pin', init)
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
                "pinId": 1,
                "pinDescription": "Visiting friends in NYC",
                "pinDate": "2022-10-31",
                "pinPriority": 1,
                "pinDidIt": 2000,
                ?"typeId": 26,
                ?"cityId": 1630035577
              }
    
              */
    
              // create a copy of the pins array
              const newPins = [...pins];
    
              // add the new solar panel
              newPins.push(data);
    
              // update the solar panels state variable
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
      
        fetch(`http://localhost:8080/api/pin/${editPinId}`, init)
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
              <label htmlFor="description">Section:</label>
              <input id="description" name="description" type="text" className="form-control"
                value={pin.pinDescription} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="date">Row:</label>
              <input id="date" name="date" type="date" className="form-control"
                value={pin.pinDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="priority">Column:</label>
              <input id="priority" name="priority" type="number" className="form-control"
                value={pin.pinPriority} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="yearInstalled">Year Installed:</label>
              <input id="yearInstalled" name="yearInstalled" type="number" className="form-control"
                value={solarPanel.yearInstalled} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="material">Material:</label>
              <select id="material" name="material" className="form-control"
                value={solarPanel.material} onChange={handleChange}>
                <option>POLY_SI</option>
                <option>MONO_SI</option>
                <option>A_SI</option>
                <option>CD_TE</option>
                <option>CIGS</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="tracking">Is Tracking?
                <input id="tracking" name="tracking" type="checkbox"
                  checked={solarPanel.tracking} onChange={handleChange} />
              </label>
            </div>
            <div className="mt-4">
              <button className="btn btn-success mr-2" type="submit">
                <i className="bi bi-file-earmark-check"></i> {editSolarPanelId > 0 ? 'Update Solar Panel' : 'Add Solar Panel'}
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
          <h2 className="mb-4">Solar Panels</h2>
          <button className="btn btn-primary my-4" onClick={() => setCurrentView('Add')}>
            <i className="bi bi-plus-circle"></i> Add Solar Panel
          </button>
          <table className="table table-striped table-hover table-sm">
            <thead className="thead-dark">
              <tr>
                <th>Section</th>
                <th>Row-Column</th>
                <th>Year Installed</th>
                <th>Material</th>
                <th>Is Tracking?</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {solarPanels.map(solarPanel => (
                <tr key={solarPanel.id}>
                  <td>{solarPanel.section}</td>
                  <td>{solarPanel.row}-{solarPanel.column}</td>
                  <td>{solarPanel.yearInstalled}</td>
                  <td>{solarPanel.material}</td>
                  <td>{solarPanel.tracking ? 'Yes' : 'No'}</td>
                  <td>
                    <div className="float-right mr-2">
                      <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEditPanel(solarPanel.id)}>
                        <i className="bi bi-pencil-square"></i> Edit
                      </button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDeletePanel(solarPanel.id)}>
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