const socket = io();
const markers = {}; // Track markers by socket.id

// Initialize map
const map = L.map("map").setView([20.5937, 78.9629], 5); // Default view

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Store current location
let myCoords = null;

// Re-send location every 3 seconds to keep all clients updated
setInterval(() => {
    if (myCoords) {
        socket.emit("send-location", myCoords);
    }
}, 3000);

// Get current location
if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;
        myCoords = { latitude, longitude };
        socket.emit("send-location", myCoords);
    }, console.error, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    });
} else {
    alert("Geolocation not supported");
}

// Receive all users' locations
socket.on("received-location", ({ id, latitude, longitude }) => {
    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup(id === socket.id ? "You" : `User: ${id}`);
    }

    if (id === socket.id) {
        map.setView([latitude, longitude], 13);
    }
});

// Remove disconnected user marker
socket.on("user-disconnect", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});
