import React from "react";
import { MapContainer, Marker, Popup, TileLayer, FeatureGroup, Polygon, GeoJSON, ZoomControl } from "react-leaflet";
import { statesData } from '../us-states';
import { click } from "@testing-library/user-event/dist/click";


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

    // todo: snap zoom to state on click. Currently unable to find proper
    // keywords to make fitBounds/getBounds do what I want 
    // function zoomToFeature(event) {
    //     TileLayer.fitBounds(event.target.getBounds());
    // //     var feature = event.target;
    // //    var featureBounds = feature.getBounds;
    // //     fitBounds(featureBounds);
    //  }

    //maps through each state, finding its name
    var onEachFeature = function(feature, layer) {
        const stateName = feature.properties.name;
        // layer.bindPopup(stateName); //appends popup with state name. TODO: Do something cooler
        //changes style of state based on mouse events
            // const stateBounds = layer.target.getBounds();
            // console.log(stateBounds);
        layer.on({
            mouseover: highlightFeatureOn,
            mouseout: highlightFeatureOff,
            click: highlightFeatureClick
        });
    }

    // mapContainerCenter() {
    //     const mainCenter = [39, -96];
    //     const mainZoom = 4;
    //     let newCenter = features.geometry 
    //     onclick.feature: return newCenter;
    // }

    return (
        <>
        {/* TODO: make functional buttons w/ seperate map view zoom */}
        <button className="map-button main">Home</button>
        <button className="map-button">HI</button>
        <button className="map-button">AK</button>
        {/* 39, -96 zoom-4 is center of USA */}
        {/* Map container defines the map, and its attributes */}
        <MapContainer center={[39, -96]} zoom={4}
                                        scrollWheelZoom={true}
                                        zoomControl={false}
                                        doubleClickZoom={true}
                                        minZoom={4}
                                        dragging={true}
                                        maxBounds={[[20, -60],[55, -130]]}
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
        </MapContainer>
        <p className="map-text">MapView ©</p>
        </>
    )
}

export default MapView;