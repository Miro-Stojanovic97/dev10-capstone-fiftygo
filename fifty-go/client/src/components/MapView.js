import React, { Component } from "react";
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import { layerGroup } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, Polygon, GeoJSON } from "react-leaflet";
import { statesData } from '../us-states';
import { click } from "@testing-library/user-event/dist/click";


function MapView() {

    //state layer stylings
    var mainStyle = {
        fillColor: "orange", 
        fillOpacity: 1,
        color: "black",
        weight: 1, 
    }
    var highlightStyle = {
        fillColor: "white",
        weight: 1,
        fillOpacity: 1,
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

    //maps through each state, finding its name
    var onEachFeature = function(feature, layer) {
        const stateName = feature.properties.name;
        layer.bindPopup(stateName); //appends popup with state name. TODO: Do something cooler
        //changes style of state based on mouse events
        layer.on({
            mouseover: highlightFeatureOn,
            mouseout: highlightFeatureOff
        });
    }

    return (
        <>
        {/* TODO: make functional buttons w/ seperate map view zoom */}
        <button className="map-button main">Home</button>
        <button className="map-button">HI</button>
        <button className="map-button">AK</button>
        {/* <button className="map-button">PR</button> */}
        {/* 39, -96 zoom-4 is center of USA */}
        <MapContainer center={[39, -96]} zoom={4}scrollWheelZoom={false}
                                        zoomControl={false}
                                        doubleClickZoom={false}
                                        //there are tons of options in here
                                        dragging={false} > 
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

            />
            
            {/* Overlay state border polygons */}
            <GeoJSON 
                style={{fillColor: "orange", 
                        fillOpacity:1,
                        color: "black",
                        weight: 1, }}
                data={statesData.features} 
                //call function that scans through each feature (state)
                onEachFeature={onEachFeature}
            />           

        </MapContainer>
        <p className="display-6" style={{textAlign:"right", color: "navy", fontWeight: 700}}>MapView ©</p>
        </>
    )
}

export default MapView;