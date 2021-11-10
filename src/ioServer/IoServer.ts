import app from '../app';
import socket from "socket.io";

export const ioServer = () => {
    const io = new socket.Server(app, {});

    io.on('connect', (ioSocket) => {
        console.log(ioSocket.id);
        console.log("hello");
    })
}

