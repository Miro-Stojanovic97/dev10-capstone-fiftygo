import { useEffect, useState } from 'react';

//TODO: figure out exactly what needs to be in here
const PIN_DEFAULT = {
    pin_description: "",
    pin_date: "",
    pin_priority: 0,
    pin_did_it: 0
};

function Pins() {
    // Define our state variables.
    // We use destructuring to get the individual values that are returned from the useState function call.
    // const [pins, setPins] = useState([]);
    // const [pin, setPin] = useState(PIN_DEFAULT);
    // const [editPinId, setEditPinId] = useState(0);
    // const [currentView, setCurrentView] = useState('List'); // Add, Edit
    // const [errors, setErrors] = useState([]);
    
    // useEffect(() => {
    //     fetch('http://localhost:8080/api/pin')
    //       .then(response => {
    //         if (response.status === 200) {
    //           return response.json();
    //         } else {
    //           return Promise.reject(`Unexpected status code: ${response.status}`);
    //         }
    //       })
    //       .then(data => setPins(data))
    //       .catch(console.log);
    //   }, []);
    
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

      //handleDeletePanel
      //... ... ...
      // TODO:



    return (
        <>
        <h1 className="display-1">Pins 🌍</h1>
        <p1> TODO: Fill out pins page </p1>
        </>
    )
}

export default Pins;