import {createServer} from "http";

class Server {
    createServer() {
        return createServer();
    }
}
const server: Server = new Server();

export default server.createServer();