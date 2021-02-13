import { ILog } from './mongooseTypes.interface';
import mongoose from "mongoose";


export interface IMission {
    user: mongoose.Types.ObjectId,
    key: string,
    value: Record<string, any>
}

export type EncryptedMission = {
    user: mongoose.Types.ObjectId,
    key: string,
    value: string
}


export type PostReponse = {
    log: ILog,
    content: string,
    mission?: IMission
}

export type DeleteResponse={
    log:ILog,
    content: string
}
export type GetMissionBody = {
    mission: IMission,
    content: string
}
export type GetMissionsBody = {
    missions: IMission[],
    content: string
}

export interface MissionPostBody {
    key: string,
    value: Record<string, any>
}

export interface MissionPutBody {
    key?: string,
    value?: Record<string, any>
}

export interface MissionGetterParam {
    key: string
}