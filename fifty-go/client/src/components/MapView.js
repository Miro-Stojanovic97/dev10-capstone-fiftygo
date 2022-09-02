import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, GeoJSON, Polyline } from "react-leaflet";
import { statesData } from '../us-states';
import AuthContext from '../contexts/AuthContext';

function MapView() {

    //set pins and trips from database w/ useState and useEffect
    const [pin, setPin] = useState([]);
    const [trip, setTrip] = useState([]);
    const auth = useContext(AuthContext);

    const init = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth.user.token}`
        },
      };

    useEffect(() => {
        fetch(`http://localhost:8080/fiftygo/pin/user/${auth.user.appUserId}`, init)
            .then(response => {
              if (response.status === 200) {
                return response.json();
              } else {
                return Promise.reject(`Unexpected status code: ${response.status}`);
              }
            })
            .then(data => setPin(data))
            .then(console.log(pin));
        }, []);

        useEffect(() => {
            fetch(`http://localhost:8080/fiftygo/trip/user/${auth.user.appUserId}`, init)
                .then(response => {
                  if (response.status === 200) {
                    return response.json();
                  } else {
                    return Promise.reject(`Unexpected status code: ${response.status}`);
                  }
                })
                .then(data => setTrip(data))
                .then(console.log(trip));
            }, []);



    //styling to render orange map layer     
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
        //changes style of state layer based on click event
    function highlightFeatureClick(event) {
        var feature = event.target;
        feature.setStyle(clearStyle);
    }
   

    //maps through each state, finding its name
    var onEachFeature = function(feature, layer) {
        //changes style of state based on mouse events
        layer.on({
            mouseover: highlightFeatureOn,
            mouseout: highlightFeatureOff,
            click: highlightFeatureClick
        });
    }


    //in case of future debugging needs
        // console.log(pin);
        // console.log(trip);
  
    
    //gets pin icon and defines a className based on pinPriority that is styled in CSS
        //grayscale of pin varies by pinPriority (the lower the priority, the dimmer the tone)
    function getIcon(pin, iconSizer) {
        return L.icon({
            iconUrl: "https://unpkg.com/leaflet@1.8.0/dist/images/marker-icon.png", 
            iconSize: [iconSizer],
            className: "leafletPin" + "-" + pin.pinPriority
        })
    }
    //defines the color of the polylines based on tripPriority
    function getColor(tripPriority) {
        let colors = ["red", "blue", "green", "purple", "brown"];
        let chosenColor = colors[tripPriority - 1];
        return chosenColor;
    }


    return (
        <>
    
        {/* Map container defines the map, and its attributes */}
        <MapContainer center={[39, -96]} zoom={4}
                                        scrollWheelZoom={true}
                                        zoomControl={false} //toggles on/off the zoom buttons
                                        doubleClickZoom={true}
                                        minZoom={3} 
                                        dragging={true} //defines if you can click and pan
                                        maxBounds={[[10, -30],[72, -175]]} //defines map scope
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

            {/* Maps through pins and then sets a marker icon for each pin, along with a pop-up */}
            { pin.map((pin) => (
                //icon={getIcon(pin.pinPriority * 5)}
                <Marker position={[pin.city.latitude, pin.city.longitude]} icon={getIcon(pin, 27)}>
                    <Popup className='map-pin-pop'>
                        <p className="pop-head"> {pin.pinDescription} </p>
                        <p className="pop-txt"> {pin.city.cityName}, {pin.city.stateAbr} </p>
                        <p className="pop-txt"> {pin.pinDate} </p>
                        <p className="pop-txt"> Priority level: {pin.pinPriority} </p>
                        <p className="pop-txt"> {pin.pinDidIt ? 'Completed!' : 'Not Completed Yet!'} </p>
                        <Link className="map-pin-btn btn btn-primary btn-sm mb-2" to={`/pins/edit/${pin.pinId}`}>
                        <i className="bi bi-pencil-square"></i> Edit Pin
                        </Link>
                    </Popup>
                </Marker>
            ))}

            {/* Maps through trips and then sets a polyline through each of its pins, along with a pop-up */}
            { trip.map((trip) => (
                <Polyline className="map-poly-line" pathOptions={{"color": getColor(trip.tripPriority), "weight": 8, "opacity": 1}} positions={trip.pins.map(pin => [pin.city.latitude, pin.city.longitude])} 
                children={
                <Popup className='map-trip-pop'>
                    <p className="pop-head"> {trip.tripDescription} </p>
                    <p className="pop-txt"> {trip.tripStartDate} </p>
                    <p className="pop-txt"> {trip.tripEndDate} </p>
                    <p className="pop-txt"> Priority: {trip.tripPriority} </p>
                    <p className="pop-txt"> {trip.tripDidIt ? 'Completed!' : 'Not Completed Yet!'} </p>
                    <Link className="map-trip-btn btn btn-primary btn-sm mb-2" to={`/trip/edit/${trip.tripId}`}>
                    <i className="bi bi-pencil-square"></i> Edit Trip
                    </Link>
                </Popup>} eventHandlers={{
                    click: (e) => {
                        e.target.openPopup()
                  },
                    mouseover: (e) => {
                        for (let t = 0; t < 80; t++) {
                            setTimeout(() => {
                                e.target.setStyle({weight: (7 + t / 20)})
                            }, t); 
                        }},
                    mouseout: (e) => {
                        for (let t = 0; t < 80; t++) {
                            setTimeout(() => {
                                e.target.setStyle({weight: (12 - (t / 20))})
                            }, t); 
                        } 
                    }}}>
                </Polyline>

                // <legend 
            ))}
            

        </MapContainer>

        <p className="map-text">MapView ©</p>

        </>
    )
}

export default MapView;