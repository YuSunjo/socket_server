import {createServer} from "http";
import socket from "socket.io";
import redis from "redis";

const PORT = process.env.PORT || 3000;

const httpServer = createServer();

let redisConnect = {
    host: "localhost",
    port: 6379
}

httpServer.listen(PORT, () => {
    console.log(PORT);
    console.log("socket server start");
})

const io = new socket.Server(httpServer, {});

const client = redis.createClient(redisConnect);
client.on('error', (error) => {
    console.log(error);
})

io.on('connect', (ioSocket) => {
    console.log(ioSocket.id);
    console.log("hello");
})

type Message = {
    text: string;
    date: Date;
    key: string;
}
