const express = require('express');
const path = require('path');
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set view engine and public folder
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

// Real-time location tracking
io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("send-location", (coords) => {
        io.emit("received-location", { id: socket.id, ...coords });
    });

    socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
        io.emit("user-disconnect", socket.id);
    });
});

const PORT = 3002;
server.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
