import { validateMissionInput } from './../middlewares/validation';
import {
    EncryptedMission, GetMissionBody, MissionPutBody, DeleteResponse, MissionPostBody,
    MissionGetterParam, IMissionInput, GetMissionsBody, PostReponse
} from '../types/mission.enum';
import { LogTypes } from '../types/logTypes.enum';
import { Request, Response } from 'express';
import BaseController from './base.controller';
import { authenticate } from '../config/passport.config';
import { IUser, ILog } from '../types/mongooseTypes.interface';
import missionProxy from '../config/missionsProxy.config';
import * as EncryptionModule from '../businessLogic/encryption.module'
import { insertAuditLog } from '../businessLogic/auditLog.business';
import { NO_CONTENT } from 'http-status-codes'
import { JWTPayload } from '../types/user.enum';


enum EndPoints {
    CREATE_MISSION = "/",
    GET_ALL_MISSIONS_BY_USER = "/",
    GET_SPECIFIC_MISSION_FOR_USER = "/:key",
    UPDATE_MISSION_FOR_USER = "/:key",
    DELETE_MISSION_FOR_USER = "/:key"
}

enum ResponseMessage {
    MISSION_CREATED = "Mission created succesfully",
    MISSION_FAILED_CREATION = "Mission failed to create",
    MISSION_GET_SUCCESS = "Fetched Mission Successfully",
    ALREADY_UPDATED = "User is already updated",
    MISSION_UPDATED = "Mission Updated Succesfully"
}

export default class MissionsController extends BaseController {
    private missionEndPoint = "/";

    private endPointByUserAndKey(user: JWTPayload, key?: string): string {
        return `${this.missionEndPoint}${user._id.toHexString()}${key && `/${key}`}`
    }
    constructor(path: string) {
        super(path);
    }

    intializeRoutes() {
        this.router.use(authenticate());
        this.router.post(EndPoints.CREATE_MISSION,validateMissionInput ,this.createMission);
        this.router.get(EndPoints.GET_SPECIFIC_MISSION_FOR_USER, this.getMission);
        this.router.get(EndPoints.GET_ALL_MISSIONS_BY_USER, this.getAllMissions);
        this.router.put(EndPoints.UPDATE_MISSION_FOR_USER, this.updateMission);
        this.router.delete(EndPoints.DELETE_MISSION_FOR_USER, this.deleteMission);
    }

    private async createMission(req: Request<any, any, MissionPostBody>, res: Response<PostReponse>) {
        console.log(req.user)
        const user = req.user as IUser;
        let { key } = req.body
        let log: ILog;
        key = EncryptionModule.encryptString(key);
        const value = EncryptionModule.encryptObj(req.body.value);
        const body = {
            key,
            value,
            user: user._id
        }
        try {
            const response = await missionProxy.post(this.missionEndPoint, body);
            const mission = EncryptionModule.decryptMission(response.data as EncryptedMission);
            log = await insertAuditLog(user._id, LogTypes.MISSION_CREATED, ResponseMessage.MISSION_CREATED);
            res.json({ log, content: ResponseMessage.MISSION_CREATED, mission })
        } catch (ex) {
            const message = EncryptionModule.decryptString(ex.response.data);
            const status = ex.response.status;
            log = await insertAuditLog(user._id, LogTypes.MISSION_CREATION_FAILED, message);
            res.status(status).json({ log, content: message })
        }

    }
    private defineUserAndEncryptKey(req: Request<MissionGetterParam>): { key: string, user: JWTPayload } {
        const user: JWTPayload = req.user as JWTPayload;
        let { key } = req.params;
        key = EncryptionModule.encryptString(key);
        return { key, user }
    }
    private async getMission(req: Request<MissionGetterParam>, res: Response<GetMissionBody | string>) {
        const { user, key } = this.defineUserAndEncryptKey(req);
        const endPoint = this.endPointByUserAndKey(user, key);
        try {
            const response = await missionProxy.get(endPoint);
            const mission = EncryptionModule.decryptMission(response.data as EncryptedMission);
            return res.json({ mission, content: ResponseMessage.MISSION_GET_SUCCESS });
        } catch (ex) {
            const status = ex.response.status;
            const message = EncryptionModule.decryptString(ex.response.data);
            res.status(status).send(message)
        }
    }

    private async getAllMissions(req: Request, res: Response<GetMissionsBody | string>) {
        const user = req.user as JWTPayload;
        const endPoint = this.endPointByUserAndKey(user);
        try {
            const response = await missionProxy.get(endPoint);
            const encryptedMissions = response.data as EncryptedMission[];
            const missions: IMissionInput[] = encryptedMissions.map(encrypted => EncryptionModule.decryptMission(encrypted));
            return res.json({ missions, content: ResponseMessage.MISSION_GET_SUCCESS });
        } catch (ex) {
            const status = ex.response.status;
            const message = EncryptionModule.decryptString(ex.response.data);
            res.status(status).send(message)
        }
    }

    private async updateMission(req: Request<MissionGetterParam, any, MissionPutBody>, res: Response<PostReponse | string>) {
        const { key: originalKey, user } = this.defineUserAndEncryptKey(req);
        let log: ILog;
        let { key } = req.body;
        let value;
        if (key) key = EncryptionModule.encryptString(key);
        if (req.body.value) value = EncryptionModule.encryptObj(req.body.value);
        const endPoint = this.endPointByUserAndKey(user, originalKey)
        const body = { key, value }
        try {
            const response = await missionProxy.put(endPoint, body);
            if (response.status === NO_CONTENT) return res.status(NO_CONTENT).send(ResponseMessage.ALREADY_UPDATED);
            const mission = EncryptionModule.decryptMission(response.data as EncryptedMission);
            log = await insertAuditLog(user._id, LogTypes.MISSION_UPDATED, ResponseMessage.MISSION_UPDATED);
            res.json({ log, content: ResponseMessage.MISSION_UPDATED, mission })
        } catch (ex) {
            const message = EncryptionModule.decryptString(ex.response.data);
            const status = ex.response.status;
            log = await insertAuditLog(user._id, LogTypes.MISSION_UPDATE_FAILED, message);
            res.status(status).json({ log, content: message })
        }
    }
    private async deleteMission(req: Request<MissionGetterParam, any, any>, res: Response<DeleteResponse | string>) {
        const { key, user } = this.defineUserAndEncryptKey(req);
        const endPoint = this.endPointByUserAndKey(user, key);
        let log: ILog;
        try {
            const response = await missionProxy.delete(endPoint);
            const content = EncryptionModule.decryptString(response.data);
            log = await insertAuditLog(user._id, LogTypes.MISSION_DELETED, content);
            res.json({ log, content });
        } catch (ex) {
            const message = EncryptionModule.decryptString(ex.response.data);
            const { status } = ex.response;
            log = await insertAuditLog(user._id, LogTypes.MISSION_DELETE_FAILED, message);
            res.status(status).json({ log, content: message })
        }
    }


}