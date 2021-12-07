import app from '../server/app';
import redis from "redis";
import {ioServer} from "../ioServer/IoServer";

const PORT = process.env.PORT || 3000;

export const topic = "socket.io";

export let redisConnect = {
    host: "3.38.124.11",
    port: 6379
}

const connectRedis = async () => {
    console.log("redis connect")
    const client = redis.createClient(redisConnect);
    client.on('error', (error) => {
        console.log(error);
    })
}

const startApplication = () => {
    app.listen(PORT, async () => {
        await connectRedis();
        console.log(PORT);
        console.log("socket server start");
    })
}

startApplication();
ioServer();