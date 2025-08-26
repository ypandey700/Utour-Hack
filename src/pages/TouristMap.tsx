import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet/dist/images/marker-shadow.png",
});

interface Destination {
  name: string;
  lat: number;
  lng: number;
  type: string;
}

const destinations: Destination[] = [
  { name: "Kedarnath Temple", lat: 30.7346, lng: 79.0669, type: "Temple" },
  { name: "Badrinath Temple", lat: 30.7433, lng: 79.4930, type: "Temple" },
  { name: "Gangotri Temple", lat: 30.9946, lng: 78.9398, type: "Temple" },
  { name: "Yamunotri Temple", lat: 31.0136, lng: 78.4601, type: "Temple" },
  { name: "Rishikesh", lat: 30.0869, lng: 78.2676, type: "Spiritual" },
  { name: "Haridwar", lat: 29.9457, lng: 78.1642, type: "Spiritual" },
  { name: "Valley of Flowers", lat: 30.7280, lng: 79.6050, type: "National Park" },
  { name: "Jim Corbett Park", lat: 29.5300, lng: 78.7747, type: "Wildlife" },
  { name: "Nainital", lat: 29.3803, lng: 79.4636, type: "Hill Station" },
  { name: "Mussoorie", lat: 30.4599, lng: 78.0664, type: "Hill Station" },
];

function Routing({ from, to }: { from: [number, number]; to: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    if (!from || !to) return;

    const control = L.Routing.control({
      waypoints: [L.latLng(from[0], from[1]), L.latLng(to[0], to[1])],
      routeWhileDragging: true,
      show: false,
    }).addTo(map);

    return () => map.removeControl(control);
  }, [from, to, map]);

  return null;
}

const LiveMap = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        err => console.error(err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  return (
    <div className="h-[600px] w-full">
      <MapContainer
        center={userLocation || [30.3165, 78.0322]}
        zoom={8}
        className="h-full w-full rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && (
          <Marker position={userLocation}>
            <Popup>You are here 📍</Popup>
          </Marker>
        )}

        {destinations.map((dest, idx) => (
          <Marker
            key={idx}
            position={[dest.lat, dest.lng]}
            eventHandlers={{
              click: () => setSelectedDest(dest),
            }}
          >
            <Popup>
              <strong>{dest.name}</strong> <br />
              Type: {dest.type} <br />
              <button
                className="mt-1 text-blue-600 underline"
                onClick={() => setSelectedDest(dest)}
              >
                Navigate here
              </button>
            </Popup>
          </Marker>
        ))}

        {userLocation && selectedDest && (
          <Routing from={userLocation} to={[selectedDest.lat, selectedDest.lng]} />
        )}
      </MapContainer>
    </div>
  );
};

export default LiveMap;
