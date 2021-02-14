import { EncryptedMission, IMissionInput } from '../types/mission.enum';
import { AES, enc } from 'crypto-js';
import "../config/dotenv.config";


const ENCRYPTION_KEY: string = process.env.ENCRYPTION_KEY || "key";




export function encryptString(plainText: string): string {
    const encryptedObj = AES.encrypt(plainText, ENCRYPTION_KEY);
    return encryptedObj.toString();
}


export function decryptString(encryptedText: string): string {
    const decryptedObj = AES.decrypt(encryptedText, ENCRYPTION_KEY);
    return decryptedObj.toString(enc.Utf8);
}

export function encryptObj(plainObject: Record<string, any>): string {
    const stringedObject: string = JSON.stringify(plainObject);
    return encryptString(stringedObject);
}


export function decryptObj(encryptedObj: string): Record<string, any> {
    const decryptedStrObj = decryptString(encryptedObj);
    return JSON.parse(decryptedStrObj);
}

export function decryptMission(mission: EncryptedMission): IMissionInput {
    const { user } = mission;
    const key: string = decryptString(mission.key);
    const value: Record<string, any> = decryptObj(mission.value);
    return {
        user,
        key,
        value
    }
}

export function encryptMission(mission: IMissionInput): EncryptedMission {
    const { user } = mission;
    const key: string = encryptString(mission.key);
    const value: string = encryptObj(mission.value);
    return {
        user,
        key,
        value
    }
}

