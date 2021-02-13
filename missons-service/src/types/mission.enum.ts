
import mongoose from "mongoose";


export interface IMissionInput {
    user: mongoose.Types.ObjectId,
    key: string,
    value: Record<string, any>
}

export type EncryptedMission = {
    user: mongoose.Types.ObjectId,
    key: string,
    value: string
}

export interface UpdateEncryptedMission{
    user: mongoose.Types.ObjectId,
    key?: string,
    value?: string
}

export enum MissionMessages{
    NOT_FOUND= "Mission not found",
    DELETED= "Mission Deleted Successfully"
}

export type GetMissionBody = {
    mission: IMissionInput,
    content: string
}
export type GetMissionsBody = {
    missions: IMissionInput[],
    content: string
}


export interface MissionGetterParam {
    key: string
}