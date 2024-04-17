import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";

const LeafletRoutingMachine = () => {
  const map = useMap();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [destination, setDestination] = useState("");
  const [previousMarker, setPreviousMarker] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [mapClickEnabled, setMapClickEnabled] = useState(true);

  const handleMapClick = (e) => {
    if (mapClickEnabled) {
      const newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      if (previousMarker) {
        map.removeLayer(previousMarker);
      }
      setPreviousMarker(newMarker);

      if (currentPosition) {
        const newRoutingControl = L.Routing.control({
          waypoints: [currentPosition, [e.latlng.lat, e.latlng.lng]],
          lineOptions: {
            styles: [
              {
                color: "blue",
                weight: 4,
                opacity: 0.7,
              },
            ],
          },
          routeWhileDragging: false,
          geocoder: L.Control.Geocoder.nominatim(),
          addWaypoints: false,
          draggableWaypoints: false,
          fitSelectedRoutes: true,
          showAlternatives: true,
        }).addTo(map);
        setRoutingControl(newRoutingControl);
      }
    }
  };

  const handleSearch = () => {
    if (destination.trim() !== "") {
      if (map && previousMarker) {
        map.removeLayer(previousMarker);
        setPreviousMarker(null);
      }

      // Use Leaflet's geocoding service to search for the destination
      L.Control.Geocoder.nominatim().geocode(destination, (results) => {
        if (results && results.length > 0) {
          const { lat, lng } = results[0].center;
          const newRoutingControl = L.Routing.control({
            waypoints: [currentPosition, [lat, lng]],
            lineOptions: {
              styles: [
                {
                  color: "blue",
                  weight: 4,
                  opacity: 0.7,
                },
              ],
            },
            routeWhileDragging: false,
            geocoder: L.Control.Geocoder.nominatim(),
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: true,
          }).addTo(map);
          setRoutingControl(newRoutingControl);
        } else {
          console.error("Location not found");
        }
      });
    } else {
      console.error("Please enter a destination");
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRefresh = () => {
    if (currentPosition) {
      map.flyTo(currentPosition, 13);
    } else {
      console.error("Current position not available");
    }

    // Disable map click events
    setMapClickEnabled(false);

    const element = document.getElementById("btn_img");

    // Apply the transformation
    element.classList.add("transformation");
  };


  // const handleRefresh = () => {
  //   if (currentPosition) {
  //     // Remove previous marker if exists
  //     if (previousMarker) {
  //       map.removeLayer(previousMarker);
  //       setPreviousMarker(null);
  //     }

  //     // Remove previous routing control if exists
  //     if (routingControl) {
  //       routingControl.remove();
  //       setRoutingControl(null);
  //     }

  //     // Set map view to current position
  //     map.flyTo(currentPosition, 13);
  //   } else {
  //     console.error("Current position not available");
  //   }

  //   // Disable map click events
  //   setMapClickEnabled(false);

  //   // Apply the transformation
  //   const element = document.getElementById("btn_img");
  //   element.classList.add("transformation");
  // };



  const handleSearchBoxFocus = () => {
    setMapClickEnabled(false);
  };

  const handleSearchBoxBlur = () => {
    setMapClickEnabled(true);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting current position:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (currentPosition) {
      L.marker(currentPosition).addTo(map);
    }
  }, [currentPosition, map]);

  useEffect(() => {
    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
      if (routingControl) {
        routingControl.remove();
      }
    };
  }, [currentPosition, map, previousMarker, routingControl, mapClickEnabled]);

  return (
    <div>
      <div></div>
      <div className="search_box">
        <div>
          <input
            id="search_input"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onFocus={handleSearchBoxFocus}
            onBlur={handleSearchBoxBlur}
            onKeyPress = {handleKeyPress}
            placeholder="Enter destination"
          />

          <button id="search_button" onClick={handleSearch}>
            Search
          </button>
          {/* <button onClick={handleRefresh}>Refresh</button> */}
        </div>
        <div style={{ display: "none" }} onClick={handleMapClick}>
          {/* Invisible div to capture map clicks */}
        </div>
      </div>

      {/* <div className="ref_btn">
        <button className="refresh_btn" type="click" onClick={handleRefresh}>
          <img id="btn_img" src="/arrow1.png" alt="Rotate"  />
        </button>
      </div> */}
    </div>
  );
};

export default LeafletRoutingMachine;







