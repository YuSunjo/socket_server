import app from '../app';
import redis from "redis";

const PORT = process.env.PORT || 3000;

let redisConnect = {
    host: "localhost",
    port: 6379
}

const connectRedis = async () => {
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