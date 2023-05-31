import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function Map() {
    const position = [58.515135, 31.242741]; // координаты адреса

    const customMarker = new L.Icon({
        iconUrl: 'https://play-lh.googleusercontent.com/5WifOWRs00-sCNxCvFNJ22d4xg_NQkAODjmOKuCQqe57SjmDw8S6VOSLkqo6fs4zqis',
        iconSize: [64, 64],
    });
    return (
        <MapContainer center={position} zoom={16} style={{ width: '800px', height: '500px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position} icon={customMarker}>
                <Popup>Великий Новгород, ул. Псковская, д.34</Popup>
            </Marker>
        </MapContainer>
    );
}

export default Map;
