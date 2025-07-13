 Real-Time Location Tracker

A beginner-friendly Node.js application that shows 
live user locations on a map using Express, Socket.IO, EJS, and Leaflet.js. Multiple users can open the app, and their real-time positions will be marked on the map with automatic updates and disconnections.

live : https://realtime-tracker-gxbx.onrender.com/



 🔧 Tech Stack

- Backend: Node.js, Express.js, Socket.IO
- Frontend: EJS, Leaflet.js, HTML, CSS, JavaScript
- Real-Time: WebSockets via Socket.IO

 ✨ Features

- 📍 Tracks user's location in real-time using browser geolocation
- 🗺️ Displays all active users on an interactive map (Leaflet)
- 🔁 Auto-updates location every few seconds
- ❌ Removes marker when a user disconnects


📁 Project Structure realtime-tracker/
├── public/
│ ├── css/
│ │ └── style.css
│ └── js/
│ └── script.js
├── views/
│ └── index.ejs
├── index.js
├── package.json
└── .gitignore  


