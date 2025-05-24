import { useEffect, useRef, useState } from 'react';

const Map = ({ onLocationSelect }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [coordinates, setCoordinates] = useState('');

  useEffect(() => {
    if (!window.L) return;

    navigator.geolocation.getCurrentPosition((position) => {
      let { latitude, longitude } = position.coords;
      const map = window.L.map(mapRef.current).setView([latitude, longitude], 13);

      window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        minZoom: 1,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      // Add click event handler
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;

        // Remove existing marker if any
        if (markerRef.current) {
          map.removeLayer(markerRef.current);
        }

        // Add new marker
        markerRef.current = window.L.marker([lat, lng])
          .addTo(map)
          .bindPopup(`Selected Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`)
          .openPopup();

        // Update coordinates text
        setCoordinates(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);

        // Call the callback with coordinates
        if (onLocationSelect) {
          onLocationSelect({ latitude: lat, longitude: lng });
        }
      });
    });
  }, [onLocationSelect]);

  return (
    <div>
      <div id="map" ref={mapRef} style={{ height: 200 }}></div>
      {coordinates && (
        <input
          type="text"
          value={coordinates}
          readOnly
          className="input input-bordered w-full mt-2"
          placeholder="Click on the map to select location"
        />
      )}
    </div>
  );
};

export default Map;
