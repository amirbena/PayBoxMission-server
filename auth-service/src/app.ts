import BaseController from './controllers/base.controller';
import MissionsController from './controllers/mission.controller';
import "./config/passport.config";
import "./config/connection.config";
import cors from 'cors';
import * as bodyParser from 'body-parser';
import UserController from './controllers/user.controller';
import LogController from './controllers/log.controller';
import express, { Express } from 'express';
import * as dotenv from 'dotenv';
import { Server } from 'http';
import { insertAuditLog } from './businessLogic/auditLog.business';
import path from 'path';

export default class App {
    private app: Express = express();
    private port: number;
    private origin = ["http://localhost:3000/"];
    private controllers: BaseController[] = [
        new UserController("/users"),
        new LogController("/logs"),
        new MissionsController('/missions')
    ];


    private intialiazeMiddlewares() {
        this.app.use(cors({ origin: this.origin }))
        this.app.use(bodyParser.json());
    }

    private intialiazeRoutes() {
        this.controllers.forEach(controller => this.app.use(controller.getPath(), controller.getRouter()))
    }

    constructor(port: number) {
        this.port = port;
        this.intialiazeMiddlewares();
        this.intialiazeRoutes();
    }

    public listen(): Server {
        return this.app.listen(this.port, () => {
            console.log(`Wellcome to ${this.port} port`)
        })
    }

}