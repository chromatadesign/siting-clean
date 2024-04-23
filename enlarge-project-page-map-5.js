// Setting the access token for Mapbox
mapboxgl.accessToken = "pk.eyJ1IjoiYmFudGFtY29tdGVjaCIsImEiOiJjbGpkNzYwM3cxczRqM3ZuNThyZm83NXNjIn0.L6wSiYNbyqcFiYGeqPT--A";

// Initializing an empty feature collection for map locations
let mapLocations2 = {
    type: "FeatureCollection",
    features: []
};

// An array to store selected map locations (currently unused)
let selectedMapLocations2 = [];

// Get coordinates from the DOM elements
const latitude2 = parseFloat(document.getElementById("p-latitude").textContent);
const longitude2 = parseFloat(document.getElementById("p-longitude").textContent);

// Creating a new Mapbox map instance
let map2 = new mapboxgl.Map({
    container: "map2",
    style: "mapbox://styles/bantamcomtech/cljd844ss002801qr04a75a06",
    center: [longitude2, latitude2], // Use dynamic coordinates as the initial center
    zoom: 5
});

// Setting up a media query (currently empty and not functional)
let mq2 = window.matchMedia("");
if (mq2.matches) {
    map2.setZoom(7);
} else {
    map2.setZoom(7);
}

// Retrieving map location elements from the document
let listLocations2 = document.getElementById("location-list2").childNodes;

// Function to extract geo-data from HTML elements and add to the map feature collection
function getGeoData2() {
    listLocations2.forEach(function (location2) {
        console.log(location2);

        // Extracting values
        let locationLat2 = location2.querySelector("#locationLatitude2").value;
        let locationLong2 = location2.querySelector("#locationLongitude2").value;
        let locationInfo2 = location2.querySelector(".locations-map_card2").innerHTML;
        let coordinates2 = [locationLong2, locationLat2];
        let locationID2 = location2.querySelector("#locationID2").value;
        let stageTag2 = location2.querySelector("#stageTag2").value;


        // Creating a geo-data object
        let geoData2 = {
            type: "Feature",
            geometry: { type: "Point", coordinates: coordinates2 },
            properties: { id: locationID2, description: locationInfo2, stageTag: stageTag2 }
        };


        // Adding the geo-data object to the feature collection if not already present
        if (mapLocations2.features.includes(geoData2) === false) {
            mapLocations2.features.push(geoData2);
        }
    });
    console.log(mapLocations2);
}

// Calling the function to process and add geo-data
getGeoData2();

// Function to add points to the map based on the feature collection
function addMapPoints2() {
    // Adding a layer of circle markers to the map
map2.addLayer({
    id: "locations",
    type: "circle",
    source: {
        type: "geojson",
        data: mapLocations2
    },
    paint: {
        "circle-radius": 7,
        "circle-stroke-width": 2,
        "circle-color": [
            "match",
            ["get", "stageTag"],
            "Early", "#F2AE40",
            "Mid", "#35B9E9",
            "Late", "#FB97AA",
            "#D2D2D2" // Default color
        ],
        "circle-opacity": 1,
        "circle-stroke-color": "white"
    }
});


    // Adding a click event to show a popup with location details
    map2.on("click", "locations", (e) => {
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.description;

        // Adjusting coordinates for popup if necessary
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Creating and adding the popup
        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map2);
    });

    // Adding another click event to fly to the clicked location
    map2.on("click", "locations", (e) => {
        map2.flyTo({
            center: e.features[0].geometry.coordinates,
            speed: 0.5,
            curve: 1,
            easing(t) {
                return t;
            },
        });
    });

    // Changing the cursor to a pointer when hovering over locations
    map2.on("mouseenter", "locations", () => {
        map2.getCanvas().style.cursor = "pointer";
    });

    // Reverting the cursor when not hovering over locations
    map2.on("mouseleave", "locations", () => {
        map2.getCanvas().style.cursor = "";
    });
}

// Adding the map points after the map has loaded
map2.on("load", function (e) {
    addMapPoints2();
});

// Handling the enlarged map display (currently hiding it)
let enlargedMap = document.getElementById("enlarged-project-map");
if (enlargedMap) {
    enlargedMap.style.display = "none";
    enlargedMap.style.zIndex = 150;
    enlargedMap.style.opacity = 0;
}
