import { MissionController } from './controllers/mission.controller';
import "./config/dotenv.config";
import "./config/connection.config";
import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Express } from 'express';

export default class App {
    private app: Express = express();
    private port: number;
    private origin = ["http://localhost:5000/"];
    private controller = new MissionController('/');

    private intialiazeMiddlewares() {
        this.app.use(cors({ origin: this.origin }))
        this.app.use(bodyParser.json());
    }

    private intialiazeRoutes() {
        this.app.use(this.controller.getPath(),this.controller.getRouter())
    }

    constructor(port: number) {
        this.port = port;
        this.intialiazeMiddlewares();
        this.intialiazeRoutes();
    }

    public listen() {
        return this.app.listen(this.port, () => {
            console.log(`Wellcome to ${this.port} port`)
        })
    }
}