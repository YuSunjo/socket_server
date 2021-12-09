import {createServer} from "http";

class Server {
    createServer() {
        return createServer((req, res) => {
            const headers = {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
                'Access-Control-Max-Age': 2592000, // 30 days
            };
        });
    }
}
const server: Server = new Server();

export default server.createServer();