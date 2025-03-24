import React from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cardId = params.get('id'); // Get card ID from URL

  const indiaCenter = [20.5937, 78.9629];
  const zoomLevel = 5;

  return (
    <div>
      <h2>{cardId ? `Map View for Card ID: ${cardId}` : 'Map View of India'}</h2>
      <MapContainer center={indiaCenter} zoom={zoomLevel} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
      </MapContainer>
    </div>
  );
};

export default MapView;

