import { UpdateResponse } from './../businessLogic/mission.business';
import mongoose from 'mongoose';
import { Request, Response } from 'express';
import express, { Router } from 'express';
import * as MissionBusiness from '../businessLogic/mission.business';
import * as EncryptionModule from '../businessLogic/encryption.module';
import { EncryptedMission, UpdateEncryptedMission } from '../types/mission.enum';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

enum EndPoints {
    CREATE_MISSION = "",
    ALL_MISSIONS = "/:user",
    GET_UPDATE_DELETE_MISSION = "/:user/:key",

}

interface MissionsParam {
    user: mongoose.Types.ObjectId;
}
interface GetMissionParams {
    user: mongoose.Types.ObjectId;
    key: string;
}
export class MissionController {
    private router: Router = express.Router();
    private path: string;
    constructor(path: string) {
        this.path = path;
        this.intializeRoutes();
    }
    public getPath(): string{
        return this.path;
    }
    public getRouter(): Router{
        return this.router;
    }
    private intializeRoutes() {
        this.router.post(EndPoints.CREATE_MISSION, this.createMission);
        this.router.get(EndPoints.ALL_MISSIONS, this.getAllMissions);
        this.router.get(EndPoints.GET_UPDATE_DELETE_MISSION, this.getSpecificMission);
        this.router.put(EndPoints.GET_UPDATE_DELETE_MISSION, this.updateMission);
        this.router.delete(EndPoints.GET_UPDATE_DELETE_MISSION, this.deleteMission);
    }
    private async createMission(req: Request<any, any, EncryptedMission>, res: Response<EncryptedMission | string>) {
        try {
            const encryptedMission = await MissionBusiness.createMission(req.body);
            res.json(encryptedMission);
        } catch (error) {
            res.status(INTERNAL_SERVER_ERROR).send(EncryptionModule.encryptString(error.message));
        }
    }
    private async getAllMissions(req: Request<MissionsParam>, res: Response<EncryptedMission[] | string>) {
        const { user } = req.params;
        try {
            const encryptedMissions = await MissionBusiness.getAllMissions(user);
            res.json(encryptedMissions);
        } catch (error) {
            res.status(INTERNAL_SERVER_ERROR).send(EncryptionModule.encryptString(error.message));
        }
    }
    private async getSpecificMission(req: Request<GetMissionParams>, res: Response<EncryptedMission | string>) {
        const { user, key } = req.params;
        try {
            const encryptedMission = await MissionBusiness.getMissionByKey(user, key);
            res.json(encryptedMission);
        } catch (error) {
            if ("status" in error) {
                return res.status(error.status).send(error.content);
            }
            res.status(INTERNAL_SERVER_ERROR).send(EncryptionModule.encryptString(error.message));
        }
    }
    private async updateMission(req: Request<GetMissionParams, any, UpdateEncryptedMission>, res: Response<EncryptedMission | string>) {
        const { user, key } = req.params;
        const encryptedMissionToUpdate = req.body
        try {
            const encryptedMission = await MissionBusiness.updateMission(user, key, encryptedMissionToUpdate);
            if("status" in encryptedMission){
                return res.status(encryptedMission.status).send(encryptedMission.content);
            }
            res.json(encryptedMission);
        } catch (error) {
            if ("status" in error) {
                return res.status(error.status).send(error.content);
            }
            res.status(INTERNAL_SERVER_ERROR).send(EncryptionModule.encryptString(error.message));
        }
    }
    private async deleteMission(req: Request<GetMissionParams, any>, res: Response<string>) {
        const { user, key } = req.params;
        try {
            const content = await MissionBusiness.deleteMission(user, key);
            res.send(content);
        } catch (error) {
            if ("status" in error) {
                return res.status(error.status).send(error.content);
            }
            res.status(INTERNAL_SERVER_ERROR).send(EncryptionModule.encryptString(error.message));
        }
    }
}