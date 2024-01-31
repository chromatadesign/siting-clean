// Set the access token for Mapbox
mapboxgl.accessToken = "pk.eyJ1IjoiYmFudGFtY29tdGVjaCIsImEiOiJjbG9mdXV6NGkwc2hqMm1xZW9oajNpbGY0In0.TXWumDIlMm3SwVlURA-RuA";

// Initialize an empty FeatureCollection for map locations
let mapLocations3 = {
    type: "FeatureCollection",
    features: []
};

// Array to store selected map locations (currently unused)
let selectedMapLocations3 = [];

// Create a new map instance
let map3 = new mapboxgl.Map({
    container: "map3", // ID of the map container
    style: "mapbox://styles/bantamcomtech/cljd844ss002801qr04a75a06", // Map style URL
    center: [-96, 38.5], // Initial geographical center of the map
    zoom: 2 // Initial zoom level
});

// Media query for responsive design (currently unused)
let mq3 = window.matchMedia("");
if (mq3.matches) {
    map3.setZoom(2);
} else {
    map3.setZoom(2);
}

// Get the list of location elements from the DOM
let listLocations3 = document.getElementById("location-list3").childNodes;

// Function to extract geographical data from the DOM elements
function getGeoData3() {
    listLocations3.forEach(function(location3) {
        console.log(location3); // Log the location element

        // Extract latitude, longitude, and other information from the DOM elements
        let locationLat3 = location3.querySelector("#locationLatitude3").value;
        let stagetype3 = stagetype3.querySelector("#stage3").value;
        let locationLong3 = location3.querySelector("#locationLongitude3").value;
        let locationInfo3 = location3.querySelector(".locations-map_card3").innerHTML;
        let coordinates3 = [locationLong3, locationLat3];
        let locationID3 = location3.querySelector("#locationID3").value;

        // Create a GeoJSON feature for the location
        let geoData3 = {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: coordinates3
            },
            properties: {
                id: locationID3,
                description: locationInfo3,
                stagetype: stagetype3
            },
        };

        // Add the feature to the FeatureCollection if it's not already included
        if (!mapLocations3.features.includes(geoData3)) {
            mapLocations3.features.push(geoData3);
        }
    });
    console.log(mapLocations3); // Log the updated FeatureCollection
}

// Call the function to process the geo data
getGeoData3();

// Function to add points to the map based on the geo data
function addMapPoints3() {
    // Add a layer for the location points
    map3.addLayer({
    id: "locations",
    type: "circle",
    source: {
        type: "geojson",
        data: mapLocations3
    },
    paint: {
        "circle-radius": 7,
        "circle-stroke-width": 1,
        "circle-color": [
            "match",
            ["get", "stagetype"],
            "Early", "#F2AE40",
            "Mid", "#35B9E9",
            "Late", "#FB97AA",
            "#686868" // Default color
        ],
        "circle-opacity": 1,
        "circle-stroke-color": "white",
    },
});


    // Add a click event listener to display a popup with the location information
    map3.on("click", "locations", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Adjust the coordinates for the popup if the location wraps around the globe
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Create and add the popup
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map3);
    });

    // Add a click event listener to smoothly fly to the location point
    map3.on("click", "locations", (e) => {
        map3.flyTo({
            center: e.features[0].geometry.coordinates,
            speed: 0.5,
            curve: 1,
            easing(t) {
                return t;
            },
        });
    });

    // Change the cursor to a pointer when hovering over a location point
    map3.on("mouseenter", "locations", () => {
        map3.getCanvas().style.cursor = "pointer";
    });

    // Revert the cursor when it leaves a location point
    map3.on("mouseleave", "locations", () => {
        map3.getCanvas().style.cursor = "";
    });
}

// Call the function to add map points when the map loads
map3.on("load", function(e) {
    addMapPoints3();
});
