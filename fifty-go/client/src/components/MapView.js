function MapView() {
    
    const map = L.map('map').setView([51.505, -0.09], 13);
    
    return (
        <>
        <h1 className="display-1">Map 🌍</h1>
        <div id="map">
            
        </div>
        
        <p1> TODO: Implement Map</p1>
        </>
    )
}

export default MapView;