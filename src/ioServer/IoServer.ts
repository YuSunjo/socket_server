import app from '../server/app';
import socket from "socket.io";
import Redis from "ioredis"

export const topic = "socket.io";

export let redisConnect = {
    host: "3.38.124.11",
    port: 6379
}

export const ioServer = () => {
    const io = new socket.Server(app, {
        cors: {
            origin: '*',
        }
    });
    const sub = new Redis(redisConnect.port, redisConnect.host);
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
        const object = JSON.parse(message);
        console.log(message)
        io.to(object.notificationMemberId).emit(object.notificationTemplate, object);
    })

    // 프론트에서 emit 하면 그에 맞는 이벤트 발생시켜줌
    // on 그에 해당하는 이벤트 발생
    io.on('connect', (ioSocket) => {
        console.log("connect");
        let memberId = ioSocket.handshake.query['memberId'];
        console.log(memberId)
        // @ts-ignore
        ioSocket.join(memberId)

        ioSocket.on("CREATE_COMMENT", (response) => {
            console.log("CREATE_COMMENT")
            console.log(response)
            io.to(ioSocket.id).emit('CREATE_COMMENT', response)
        })

        ioSocket.on("CREATE_RE_COMMENT", (response) => {
            console.log("CREATE_COMMENT")
            console.log(response)
            io.to(ioSocket.id).emit('CREATE_RE_COMMENT', response)
        })

        ioSocket.on('disconnect', () => {
            console.log("disconnect");
        });
    })

}
