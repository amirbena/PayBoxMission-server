import express, { Router } from 'express';


export default class BaseController {
    protected path: string;
    protected readonly router: Router= express.Router();

    constructor(path: string) {
        this.path = path;
        this.intializeRoutes();
    }
    protected intializeRoutes(): void {}
    public getPath(): string{
        return this.path;
    }
    public getRouter(): Router{
       return this.router;
    }
}
