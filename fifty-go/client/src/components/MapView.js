import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
//import useSwr from "swr"; can help w fetching map data from url

function MapView() {
    
    //const map = L.map('map').setView([51.505, -0.09], 13);
    
    return (
        <>
        
        <button>Home</button>
        <button>Hawaii</button>
        <button>Alaska</button>
        <button>Puerto Rico</button>
        <MapContainer center={[39, -96]} zoom={4}scrollWheelZoom={false}
                                        zoomControl={false}
                                        doubleClickZoom={false}
                                        //there are tons of options in here
                                        dragging={false} > 
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'

            />

        </MapContainer>

        <p className="display-1">MapView ©</p>

        </>
    )
}

export default MapView;