import { Server } from "socket.io"

function socketServer(server) {

    const io = new Server(server, {
        cors: { origin: "*" }
    })
    console.log("✔ socket io running");

    io.on("connection", (socket) => {
        console.log("✔ user connected", socket.id);

        // new comment
        socket.on("newComment", (data) => {
            io.emit("commentAdded", data);
        });

        // new reply
        socket.on("newReply", (data) => {
            io.emit("replyAdded", data);
        });

        socket.on("disconnect", () => {
            console.log("✗ user disconnected", socket.id);
        });
    })

    return io;
}


export { socketServer }