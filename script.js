// Replace 'YOUR_API_KEY' with your actual API key from Google Cloud Console
const API_KEY = 'AIzaSyCNAwtqMaWIndTJRMLRC7Yw0GTWRSyy0h4';

// Function to get and display geolocation
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

// Refresh location every second
setInterval(function(){
    // Refresh location every second
    setInterval(getLocation, 1000);
    console.log("Refreshing...");
}, 1000);
// Refresh location every second
setInterval(getLocation, 1000);

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.getElementById("latitude").textContent = latitude;
    document.getElementById("longitude").textContent = longitude;

    // Call Google Geolocation API
    fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log("Google Geolocation API response:", data);
    })
    .catch(error => {
        console.error("Error calling Google Geolocation API:", error);
    });
}

// Call the function to get geolocation when the page loads
getLocation();
