// Set the access token for Mapbox
mapboxgl.accessToken = "pk.eyJ1IjoiYmFudGFtY29tdGVjaCIsImEiOiJjbGpkNzYwM3cxczRqM3ZuNThyZm83NXNjIn0.L6wSiYNbyqcFiYGeqPT--A";

// Initialize an empty FeatureCollection for map locations
let mapLocations = {
    type: "FeatureCollection",
    features: []
};

// Initialize an empty array for selected map locations
let selectedMapLocations = [];

// Create a new map instance
let map = new mapboxgl.Map({
    container: "map", // ID of the map container
    style: "mapbox://styles/bantamcomtech/cltixdjp6017x01qe28j9fns7", // Map style URL
    center: [-96.2731308, 39.5], // Initial geographical center of the map
    zoom: 3.5 // Initial zoom level
});

// Media query for responsive map zoom
let mq = window.matchMedia("(min-width: 480px)");
if (mq.matches) {
    // If the screen width is greater than 480px, set zoom level to 2
    map.setZoom(3.5);
} else {
    // If the screen width is less than 480px, set zoom level to 2
    map.setZoom(2);
}

// Get location elements from the DOM
let listLocations = document.getElementById("location-list").childNodes;

// Function to retrieve geolocation data from the DOM elements
function getGeoData() {
    listLocations.forEach(function (location) {
        console.log(location);
        let locationLat = location.querySelector("#locationLatitude").value;
        let locationLong = location.querySelector("#locationLongitude").value;
        let locationInfo = location.querySelector(".locations-map_card").innerHTML;
        let coordinates = [locationLong, locationLat];
        let locationID = location.querySelector("#locationID").value;
        let stageTag = location.querySelector("#stageTag").value;


        // Create geolocation data for the map point
        let geoData = {
            type: "Feature",
            geometry: { type: "Point", coordinates: coordinates },
            properties: { id: locationID, description: locationInfo, stageTag: stageTag }
        };


        // Add the geolocation data to mapLocations if it's not already included
        if (mapLocations.features.includes(geoData) === false) {
            mapLocations.features.push(geoData);
        }
    });
    console.log(mapLocations);
}

// Call getGeoData to populate mapLocations
getGeoData();

// Function to add points to the map
function addMapPoints() {
    // Add a new layer for the location points
map.addLayer({
    id: "locations",
    type: "circle",
    source: {
        type: "geojson",
        data: mapLocations
    },
    paint: {
        "circle-radius": 7,
        "circle-stroke-width": 1,
        "circle-color": [
            "match",
            ["get", "stageTag"],
            "Early", "#F2AE40",
            "Mid", "#35B9E9",
            "Late", "#FB97AA",
            "#fdcc39" // Default color
        ],
        "circle-opacity": 1,
        "circle-stroke-color": "white"
    }
});


    // Add click event for location points to show a popup
    map.on("click", "locations", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Adjust the coordinates for wrap around
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Show a popup with the location information
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map);
    });

    // Add click event for smooth flying to the location point
    map.on("click", "locations", (e) => {
        map.flyTo({
            center: e.features[0].geometry.coordinates,
            speed: 0.5,
            curve: 1,
            easing(t) {
                return t;
            },
        });
    });

    // Change the cursor to a pointer when hovering over a location point
    map.on("mouseenter", "locations", () => {
        map.getCanvas().style.cursor = "pointer";
    });

    // Revert the cursor when not hovering over a location point
    map.on("mouseleave", "locations", () => {
        map.getCanvas().style.cursor = "";
    });
}

// Add map points when the map loads
map.on("load", function (e) {
    addMapPoints();
});
