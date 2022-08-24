import React, { Component } from "react";
import { toBePartiallyChecked } from "@testing-library/jest-dom/dist/matchers";
import { layerGroup } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, Polygon, GeoJSON } from "react-leaflet";
import { statesData } from '../us-states';
import { click } from "@testing-library/user-event/dist/click";

//import useSwr from "swr"; can help w fetching map data from url

function MapView() {

    // function changeCountryColor(event) {
    //     event.target.setStyle({
    //       color: "green",
    //       fillColor: this.state.color,
    //       fillOpacity: 1,
    //     });
    //   };

    

    function onEachFeature(state, layer) {
        const stateName = state.properties.name;
        console.log(stateName);
        layer.bindPopup(stateName);
        
        
        //layer.mouseover

        // layer.on({ 
        //     mouseover: this.highlightFeature,
        // })
        //layer.options.fillOpacity = Math.random(); //0-1 (0.1, 0.2, 0.3)
        // const colorIndex = Math.floor(Math.random() * this.colors.length);
        // layer.options.fillColor = this.colors[colorIndex]; //0
    
        // layer.on(
        //   changeCountryColor(click)
        // );
      };
     
    //   function colorChange(event) {
    //     this.setState({ color: event.target.value });
    //   };

    return (
        <>
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
                        fillOpacity: 1,
                        color: "black",
                        weight: 1, }}
                data={statesData.features} 
                onEachFeature={onEachFeature}
                eventHandlers={{
                    mouseover: (e) => {
                      let layer = e.target;
                      layer.setStyle({
                        dashArray: "",
                        fillColor: "orange",
                        fillOpacity: 1,
                        weight: 2,
                        opacity: 1,
                        color: "white",
                      })
                    },
                    mouseout: (e) => {
                      let layer = e.target;
                      layer.setStyle({
                        fillColor: "orange",
                        fillOpacity: 0.7,
                        weight: 1,
                        color: 'black',
                      });
                    },
                    click: (e) => {
      
                    }
                  }}
            />           

        </MapContainer>
        <p className="display-6" style={{textAlign:"right", color: "navy", fontWeight: 700}}>MapView ©</p>

        </>
    )
}

export default MapView;