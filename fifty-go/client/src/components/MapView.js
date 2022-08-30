import { useEffect, useState, useContext } from 'react';
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, FeatureGroup, Polygon, GeoJSON, ZoomControl } from "react-leaflet";
import { statesData } from '../us-states';
import { click } from "@testing-library/user-event/dist/click";
import AuthContext from '../contexts/AuthContext';

function MapView() {

    //base layer styling
    var mainStyle = {
        fillColor: "orange", 
        fillOpacity: 1,
        color: "black",
        weight: 1, 
    }
    //styling when mouse hovers over state feature
    var highlightStyle = {
        fillColor: "white",
        weight: 1,
        fillOpacity: 1,
    }
    //styling when clicking on state
    var clearStyle = {
        fillOpacity: 0,
    }

    //changes style of state layer based on mouse on event
    function highlightFeatureOn(event) {
        var feature = event.target;
        feature.setStyle(highlightStyle);
    }

    //changes style of state layer based on mouse off event 
    function highlightFeatureOff(event) {
        var feature = event.target;
        feature.setStyle(mainStyle);
    }

    function highlightFeatureClick(event) {
        var feature = event.target;
        feature.setStyle(clearStyle);
    }
   

    //maps through each state, finding its name
    var onEachFeature = function(feature, layer) {
        const stateName = feature.properties.name;
        // layer.bindPopup(stateName); //appends popup with state name. TODO: Do something cooler
        //changes style of state based on mouse events
        layer.on({
            mouseover: highlightFeatureOn,
            mouseout: highlightFeatureOff,
            click: highlightFeatureClick
        });
    }


    function getIcon(iconSizer) {
        return L.icon({
            iconUrl: require("../images/fiftyGO3.png"), 
            iconSize: [iconSizer]
        })
    }

    const [pins, setPins] = useState([]);
    const auth = useContext(AuthContext);

    const init = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.user.token}`
        },
      };

    const fetchPins = () => {
        fetch(`http://localhost:8080/fiftygo/pin/user/${auth.user.appUserId}`, init)
            .then(response => {
              if (response.status === 200) {
                return response.json();
              } else {
                return Promise.reject(`Unexpected status code: ${response.status}`);
              }
            })
            .then(data => setPins(data));
        }

    // const pinCoordinates = () => {
    //     pins.map
    // }

    useEffect(() => {
        fetchPins();
    }, []);
    
    
    //positions can be the latitude/longitude of the Pins. size is like priority

    let pinsLiteral = [
        {"name": "west", "position": [39,-96], "size": 40},
        {"name": "east", "position": [35,-93], "size": 50},
        {"name": "north", "position": [45,-90], "size": 60}]

    return (
        <>
    
        {/* Map container defines the map, and its attributes */}
        <MapContainer center={[39, -96]} zoom={4}
                                        scrollWheelZoom={true}
                                        zoomControl={false}
                                        doubleClickZoom={true}
                                        minZoom={3}
                                        dragging={true}
                                        maxBounds={[[10, -30],[72, -175]]}
                                        > 
            {/* TileLayer allows you to add/overlay map layers */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                zIndex={2} //zIndex changes layering order
            />
            
            {/* The <GeoJSON/> tag in leaflet allows you to quickly import data from 
            a geoJSON file and define its attributes for your map  */}
            <GeoJSON 
                style={{fillColor: "orange", 
                        fillOpacity: 1,
                        color: "black",
                        weight: 1, }}
                data={statesData.features} 
                //on each feature (states), call function to map through them 
                onEachFeature={onEachFeature}
            />  
            { pinsLiteral.map((pinsLiteral) => (
                <Marker position={pinsLiteral.position} icon={getIcon(pinsLiteral.size)}>
                    <Popup>
                        {pinsLiteral.name}
                    </Popup>
                </Marker>
            ))}
            

        </MapContainer>
        <p className="map-text">MapView ©</p>
        </>
    )
}

export default MapView;