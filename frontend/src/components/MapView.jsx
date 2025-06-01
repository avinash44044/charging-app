import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Fix default marker icon path
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function MapView({ chargers }) {
  const center = [chargers[0]?.location.latitude || 20, chargers[0]?.location.longitude || 77];

  return (
    <div style={{ height: "400px", margin: "20px 0" }}>
      <MapContainer center={center} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />
        {chargers.map((station) => (
          <Marker
            key={station._id}
            position={[station.location.latitude, station.location.longitude]}
          >
            <Popup>
              <b>{station.name}</b><br />
              Status: {station.status}<br />
              Power: {station.powerOutput} kW<br />
              Type: {station.connectorType}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
