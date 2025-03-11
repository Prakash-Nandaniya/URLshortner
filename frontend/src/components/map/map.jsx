import React, { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";

// Custom control for reset button
const ResetViewControl = () => {
  const map = useMap();

  useEffect(() => {
    const resetControl = L.control({ position: "topright" });

    resetControl.onAdd = () => {
      const div = L.DomUtil.create("div", "leaflet-control-reset");
      div.innerHTML =
        '<button title="Reset to World View" ;">Auto fit</button>';
      div.onclick = () => {
        map.setView([0, 0], 2);
      };
      return div;
    };

    resetControl.addTo(map);

    return () => {
      resetControl.remove();
    };
  }, [map]);

  return null;
};

const Map = ({ coordinates = [] }) => {
  return (
    <div className="map-card">
      <h5>IP locations</h5>
      <div className="map-container">
        <MapContainer
          center={[0, 0]}
          zoom={2}
          minZoom={2}
          worldCopyJump={true}
          style={{ height: "600px", width: "100%" }}
          zoomControl={false}
          attributionControl={false} // Remove attribution control
        >
          <TileLayer
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            attribution='© <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> © <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            opacity={0.5}
          />
          {coordinates.map((coord, index) => (
            <CircleMarker
              key={index}
              center={coord}
              radius={1.5}
              color="#ff00f3"
              fillColor="#74b9ff"
              fillOpacity={0.8}
              weight={1}
            >
              <Popup>
                Location {index + 1}: [{coord[0]}, {coord[1]}]
              </Popup>
            </CircleMarker>
          ))}
          <ResetViewControl />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
