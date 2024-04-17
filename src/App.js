
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.js";
// import L from "leaflet";
// import "./App.css";
// import LeafletRoutingMachine from "./LeafletRoutingMachine";
// import { useEffect, useState } from "react";
// import Gif from "../src/img/man1.gif";


// function App() {
//   const [currentPosition, setCurrentPosition] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setCurrentPosition([latitude, longitude]);
//         },
//         (error) => {
//           console.error("Error getting current position:", error.message);
//           setError(error.message);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//       setError("Geolocation is not supported by this browser.");
//     }
//   }, []);

//   const defaultPosition = currentPosition || [25.4618, 78.644]; // Delhi, India

//   useEffect(() => {
//     const map = document.querySelector(".leaflet-container");
//     const updateIconSize = () => {
//       const zoomLevel = map._zoom;
//       const iconSize = [100 / zoomLevel, 81 / zoomLevel]; // Adjust the size based on zoom level
//       DefaultIcon.options.iconSize = iconSize;
//       L.Marker.prototype.options.icon = L.icon(DefaultIcon.options);
//     };
//     if (map) {
//       map.addEventListener("zoomend", updateIconSize);
//     }
//     return () => {
//       if (map) {
//         map.removeEventListener("zoomend", updateIconSize);
//       }
//     };
//   }, []);



//   return (
//     <div className="App">
//       {error && <p>Error: {error}</p>}
//       <MapContainer
//         center={currentPosition || defaultPosition}
//         zoom={9}
//         scrollWheelZoom={true}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         {currentPosition && (
//           <Marker position={currentPosition}>
//             <Popup>Your current location</Popup>
//           </Marker>
//         )}
//         <LeafletRoutingMachine />
//       </MapContainer>
//     </div>
//   );
// }

// let DefaultIcon = L.icon({
//   iconUrl: Gif,
//   iconSize: [100, 81],
//   iconAnchor: [10, 41],
//   popupAnchor: [2, -40],
// });
// L.Marker.prototype.options.icon = DefaultIcon;

// export default App;










import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";
import "./App.css";
import LeafletRoutingMachine from "./LeafletRoutingMachine";
// import { useEffect, useState } from "react";
import Man1Gif from "../src/img/man1.gif"; // Import man1.gif
import Man1Png from "../src/img/man1.png"; // Import man1.png

function App() {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting current position:", error.message);
          setError(error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const defaultPosition = currentPosition || [25.4618, 78.644]; // Delhi, India

  useEffect(() => {
    const map = document.querySelector(".leaflet-container");
    const updateIconSize = () => {
      const zoomLevel = map._zoom;
      const iconSize = [100 / zoomLevel, 81 / zoomLevel]; // Adjust the size based on zoom level
      DefaultIcon.options.iconSize = iconSize/10;
      L.Marker.prototype.options.icon = L.icon(DefaultIcon.options);
    };
    if (map) {
      map.addEventListener("zoomend", updateIconSize);
    }
    return () => {
      if (map) {
        map.removeEventListener("zoomend", updateIconSize);
      }
    };
  }, []);

  return (
    <div className="App">
      {error && <p>Error: {error}</p>}
      <MapContainer
        center={currentPosition || defaultPosition}
        zoom={9}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {currentPosition && (
          <Marker position={currentPosition} icon={DefaultIcon}>
            <Popup>Your current location</Popup>
          </Marker>
        )}
        <LeafletRoutingMachine
          // currentPositionIcon={DefaultIcon}
          destinationIcon={man1PngIcon}
        />
      </MapContainer>
    </div>
  );
}

const DefaultIcon = L.icon({
  iconUrl: Man1Gif,
  iconSize: [60, 50],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
});
L.Marker.prototype.options.icon = DefaultIcon;

const man1GifIcon = L.icon({
  iconUrl: Man1Gif,
  iconSize: [50, 50],
});

const man1PngIcon = L.icon({
  iconUrl: Man1Png,
  iconSize: [50, 50],
});

export default App;
