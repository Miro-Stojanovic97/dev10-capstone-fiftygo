import { useEffect, useState, useContext } from "react";
import { useHistory } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';
import CityOption from "./CityOption";
import Errors from './Errors';

function CityList({ stateAbr }) {

    //use state abr to do a fetch for all cities of a certain state. returns List<City>
    //use this list: for each item in the list, turn the City into:
            // <option value="{city}">{cityName}<option/>
    
    const [cities, setCities] = useState([]);
    const auth = useContext(AuthContext);
    const history = useHistory();

    // get cities by stateAbr and setCities. then we can use cities.
    useEffect(() => {

        if(stateAbr) {
            const init = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${auth.user.token}`
            },
        }
        fetch (`http:localhost:8080/fiftygo/city/state/${stateAbr}`, init)
        .then(response => {
            if (response.status === 200) {
              return response.json();
            } else {
              return Promise.reject(`Unexpected status code: ${response.status}`);
            }
          })
          .then(data => console.log(data))
          .then(data => setCities(data))
          .catch(console.log);
        }
      }, [stateAbr]); // hey react, please do this every time stateAbr changes value

    const cityOptionFactory = () => {
        return cities.map(c => {
            return ( <CityOption
                key={c.cityId + "-key"}
                city={c}
                />
            )
        })
    }
    
        return (
            <>{cityOptionFactory()}</>
            
        );
    }

    export default CityList;
    