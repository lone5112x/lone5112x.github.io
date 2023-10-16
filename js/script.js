// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Check if the browser supports the Geolocation API
    if ('geolocation' in navigator) {
        // Request the user's position
        navigator.geolocation.getCurrentPosition(function (position) {
            // Get the user's latitude and longitude
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Use a reverse geocoding service to get the user's location
            const reverseGeocodingUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
            fetch(reverseGeocodingUrl)
                .then(response => response.json())
                .then(data => {
                    // Extract the user's email address if available
                    const userEmail = data?.address?.email;
                    
                    if (userEmail) {
                        // Populate the input field with the user's email address
                        document.getElementById('email').value = userEmail;
                    }
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        });
    }
});