import Mission from '../models/mission.model';
import { EncryptedMission, MissionMessages, UpdateEncryptedMission, IMissionInput } from '../types/mission.enum';
import * as EncryptionModule from './encryption.module';
import mongoose from 'mongoose';
import { NOT_FOUND, NO_CONTENT } from 'http-status-codes';


export interface UpdateResponse {
    status: number,
    content: string
}

export const createMission = async (encryptedMission: EncryptedMission): Promise<EncryptedMission> => {
    const missionToCreate = EncryptionModule.decryptMission(encryptedMission);
    const mission = await Mission.create(missionToCreate);
    return EncryptionModule.encryptMission(mission);
}

export const getAllMissions = async (user: mongoose.Types.ObjectId): Promise<EncryptedMission[]> => {
    const missions = await Mission.find({ user })
    return missions.map(mission => EncryptionModule.encryptMission(mission))
}


export const getMissionByKey = async (user: mongoose.Types.ObjectId, encryptedKey: string): Promise<EncryptedMission> => {
    const key = EncryptionModule.decryptString(encryptedKey);
    const mission = await Mission.findOne({ user, key });
    if (!mission) {
        const content = EncryptionModule.encryptString(MissionMessages.NOT_FOUND)
        throw {
            status: NOT_FOUND,
            content
        }
    }
    return EncryptionModule.encryptMission(mission);
}
const buildObjectToUpdate = (encryptedMission: UpdateEncryptedMission): Record<string, any> => {
    let bodyToUpdate: Record<string, any> = {}
    if (encryptedMission.key) {
        bodyToUpdate = Object.assign(bodyToUpdate, {
            key: EncryptionModule.decryptString(encryptedMission.key)
        })
    }
    if (encryptedMission.value) {
        bodyToUpdate = Object.assign(bodyToUpdate, {
            key: EncryptionModule.decryptObj(encryptedMission.value)
        })
    }
    return bodyToUpdate;
}
export const updateMission = async (user: mongoose.Types.ObjectId, encryptedKey: string, encryptedMission: UpdateEncryptedMission): Promise<EncryptedMission | UpdateResponse> => {
    const missionToUpdate: Record<string, any> = buildObjectToUpdate(encryptedMission);
    if (!Object.keys(missionToUpdate).length) {
        return {
            status: NO_CONTENT,
            content: EncryptionModule.encryptString("Already Updated")
        }
    }
    const key = EncryptionModule.decryptString(encryptedKey);
    const result = await Mission.update({ key, user }, missionToUpdate).exec();
    if (!result) {
        const content = EncryptionModule.encryptString(MissionMessages.NOT_FOUND)
        throw {
            status: NOT_FOUND,
            content
        }
    }
    const updatedMission= await Mission.findOne({ key, user }) ;
    if(!updatedMission){
        const content = EncryptionModule.encryptString(MissionMessages.NOT_FOUND)
        throw {
            status: NOT_FOUND,
            content
        }
    }
    return EncryptionModule.encryptMission(updatedMission)
}


export const deleteMission = async (user: mongoose.Types.ObjectId, encryptedKey: string) => {
    const key = EncryptionModule.decryptString(encryptedKey);
    const result = await Mission.deleteOne({ user, key }).exec();
    if (!result) {
        const content = EncryptionModule.encryptString(MissionMessages.NOT_FOUND)
        throw {
            status: NOT_FOUND,
            content
        }
    }
    return EncryptionModule.encryptString(MissionMessages.DELETED);
}