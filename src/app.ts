import {createServer} from "http";
import {ioServer} from "./ioServer/IoServer";

class Server {

    constructor() {
    }

    createServer() {

        const server1 = createServer();
        ioServer();
        return server1;
    }

}
const server: Server = new Server();

export default server.createServer();