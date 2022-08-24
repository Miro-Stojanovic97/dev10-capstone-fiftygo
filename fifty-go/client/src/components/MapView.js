import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
//import useSwr from "swr"; can help w fetching map data from url

function MapView() {
    
    //const map = L.map('map').setView([51.505, -0.09], 13);
    
    return (
        <>
        <button className="map-button main">Home</button>
        <button className="map-button">HI</button>
        <button className="map-button">AK</button>
        <button className="map-button">PR</button>
        <MapContainer center={[39, -96]} zoom={4}scrollWheelZoom={true}
                                        zoomControl={true}
                                        doubleClickZoom={true}
                                        //there are tons of options in here
                                        dragging={true} > 
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                //url="http://{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg"
                //url="http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

            />

        </MapContainer>

        <p className="display-6" style={{textAlign:"right", color: "navy", fontWeight: 700}}>MapView ©</p>

        </>
    )
}

export default MapView;