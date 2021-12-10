import app from '../server/app';
import {ioServer} from "../ioServer/IoServer";

const PORT = process.env.PORT || 3000;

const startApplication = () => {
    app.listen(PORT, async () => {
        console.log(PORT);
        console.log("socket server start");
    })
}

startApplication();
ioServer();