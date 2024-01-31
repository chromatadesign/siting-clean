// Set the access token for Mapbox
mapboxgl.accessToken="pk.eyJ1IjoiYmFudGFtY29tdGVjaCIsImEiOiJjbG9mdXZ6NXgwcDJtMnFtdXRoeHR0emM0In0.Qr4CnqFyXMwYq1ZTcLOf0A";

// Initialize an empty FeatureCollection for map locations
let mapLocations4 = {type: "FeatureCollection", features: []};

// Array to store selected map locations
let selectedMapLocations4 = [];

// Initialize Mapbox map with given parameters
let map4 = new mapboxgl.Map({
    container: "map4", // HTML element ID for the map container
    style: "mapbox://styles/bantamcomtech/cljd844ss002801qr04a75a06", // Map style URL
    center: [-96, 38.5], // Initial geographical center of the map
    zoom: 2 // Initial zoom level
});

// Media query for responsive behavior
let mq4 = window.matchMedia("");
if (mq4.matches) {
    map4.setZoom(2);
} else {
    map4.setZoom(2);
}

// Get location elements from the document
let listLocations4 = document.getElementById("location-list4").childNodes;

// Function to retrieve geographical data from the location elements
function getGeoData4() {
    listLocations4.forEach(function(location4) {
        console.log(location4);
        
        // Extract latitude, longitude, and other location info
        let locationLat4 = location4.querySelector("#locationLatitude4").value;
        let locationLong4 = location4.querySelector("#locationLongitude4").value;
        let locationInfo4 = location4.querySelector(".locations-map_card4").innerHTML;
        let coordinates4 = [locationLong4, locationLat4];
        let locationID4 = location4.querySelector("#locationID4").value;

        // Create GeoJSON data for the location
        let geoData4 = {
            type: "Feature",
            geometry: { type: "Point", coordinates: coordinates4 },
            properties: { id: locationID4, description: locationInfo4 }
        };

        // Add the location to the map if it's not already included
        if (mapLocations4.features.includes(geoData4) === false) {
            mapLocations4.features.push(geoData4);
        }
    });
    console.log(mapLocations4);
}
getGeoData4();

// Function to add points to the map
function addMapPoints4() {
    // Add a new layer with the locations
    map4.addLayer({
        id: "locations",
        type: "circle",
        source: {
            type: "geojson",
            data: mapLocations4
        },
        paint: {
            "circle-radius": 7,
            "circle-stroke-width": 1,
            "circle-color": "#575ec8",
            "circle-opacity": 1,
            "circle-stroke-color": "white"
        }
    });

    // Add click event listener for the location points
    map4.on("click", "locations", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Adjust the coordinates for wraparound
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Show a popup with the location information
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map4);
    });

    // Add another click event to fly to the clicked location
    map4.on("click", "locations", (e) => {
        map4.flyTo({
            center: e.features[0].geometry.coordinates,
            speed: 0.5,
            curve: 1,
            easing(t) {
                return t;
            }
        });
    });

    // Change the cursor to a pointer when hovering over a location
    map4.on("mouseenter", "locations", () => {
        map4.getCanvas().style.cursor = "pointer";
    });

    // Revert the cursor when not hovering over a location
    map4.on("mouseleave", "locations", () => {
        map4.getCanvas().style.cursor = "";
    });
}

// Add map points after the map loads
map4.on("load", function(e) {
    addMapPoints4();
});

// Handling for an enlarged map display
let enlargedMap2 = document.getElementById("enlarged-map2");
if (enlargedMap2) {
    enlargedMap2.style.display = "none";
    enlargedMap2.style.zIndex = 150;
    enlargedMap2.style.opacity = 0;
}
