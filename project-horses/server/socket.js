module.exports = (io) => {
    io.sockets.on("connect", (socket) => {
        socket.emit("after-connect", "Socket Io wita");
        socket.broadcast.emit("after-connect", "Socket Io wita");
    });
};
