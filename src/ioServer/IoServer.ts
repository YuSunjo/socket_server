import app from '../server/app';
import socket from "socket.io";
import {redisConnect, topic} from "../application/application";
import redis from "redis";
import Redis from "ioredis"

const redis2 = new Redis()

export const ioServer = () => {
    const io = new socket.Server(app, {});
    const pub = redis.createClient(redisConnect);
    const sub = redis.createClient(redisConnect);

    sub.on('subscribe', function (channel, count) {
        console.log("subscribe")
        console.log(channel, count)
    });

    sub.on('message', function (channel, message) {
        console.log(channel, message)
    });

    io.on('connect', (ioSocket) => {
        console.log(ioSocket.id);
        console.log("hello");
        let broadcastId = ioSocket.handshake.query['broadcastId'];
        console.log(broadcastId)

        ioSocket.on("NOTIFICATION", (response) => {
            io.to(ioSocket.id).emit('NOTIFICATION')
        })
    })


}
