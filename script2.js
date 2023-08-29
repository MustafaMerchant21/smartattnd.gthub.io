const API_KEY = 'AIzaSyCNAwtqMaWIndTJRMLRC7Yw0GTWRSyy0h4';

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.getElementById("latitude").textContent = latitude;
    document.getElementById("longitude").textContent = longitude;

    // Create Google Maps link
    const googleMapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
    document.getElementById("google-maps-link").innerHTML = `<a href="${googleMapsLink}" target="_blank">View on Google Maps</a>`;

    // Call Google Geolocation API to get location data
    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log("Google Geolocation API response:", data);

        // Call Google Places API to get nearest landmark
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&rankby=distance&key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const nearestLandmark = data.results[0].name;
            console.log("Nearest landmark:", nearestLandmark);

            // Display the nearest landmark on the webpage
            document.getElementById("nearest-landmark").textContent = nearestLandmark;
        })
        .catch(error => {
            console.error("Error calling Google Places API:", error);
        });
    })
    .catch(error => {
        console.error("Error calling Google Geolocation API:", error);
    });
}

// Call getLocation function when the page loads
getLocation();

// Refresh location and link every second
setInterval(getLocation, 1000);
