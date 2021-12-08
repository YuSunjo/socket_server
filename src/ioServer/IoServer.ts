import app from '../server/app';
import socket from "socket.io";
import {redisConnect, topic} from "../application/application";
import redis from "redis";
import Redis from "ioredis"

export const ioServer = () => {
    const io = new socket.Server(app, {});
    const sub = new Redis(6379, "3.38.124.11");
    const pub = new Redis(6379, "3.38.124.11");
    console.log(topic)
    sub.subscribe(topic, (err, count) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log("sub")
        }
    })

    sub.on("message", (channel, message) => {
        console.log("sdf");
        const object = JSON.parse(message);
        console.log(message)
        io.to(object.notificationMemberId).emit(object.notificationTemplate, object.boardId, object.commentMemberNickname);
    })

    // 프론트에서 emit 하면 그에 맞는 이벤트 발생시켜줌
    io.on('connect', (ioSocket) => {
        console.log(ioSocket.id);
        console.log("hello");
        let memberId = ioSocket.handshake.query['memberId'];
        console.log(memberId)
        // @ts-ignore
        ioSocket.join(memberId)

        ioSocket.on("NOTIFICATION", (response) => {
            io.to(ioSocket.id).emit('NOTIFICATION')
        })
    })


}
