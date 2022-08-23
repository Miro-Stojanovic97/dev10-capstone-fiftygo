import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import Nav from "./components/Nav";
//import Message from "./components/Message";
import Login from "./components/Login";
import Home from "./components/Home";
import Pins from "./components/Pins";
import Trips from "./components/Trips";
import MapView from "./components/MapView";

import Form from "./components/PinForm";

function App() {
  
  
  
  return (
    <>
      <Nav  className="navbar navbar-expand-lg bg-light"/>
      <div className="container mt-5">
        <div className="row">
          <div className="col-11">
            
          </div>
          <div className="col">
            
          </div>
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/pins" element={<Pins />} />
          <Route exact path="/trips" element={<Trips />} />
          <Route exact path="/map" element={<MapView />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
