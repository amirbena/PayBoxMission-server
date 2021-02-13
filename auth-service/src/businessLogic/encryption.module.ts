import { AES, enc } from 'crypto-js';
import "../config/dotenv.config";

const convertCharacter = (character: string): any => {
    const dictonary: Record<string, string> = {
        '{': '}',
        '}': '{'
    }
    return dictonary[character] ? dictonary[character] : character;
}

const ENCRYPTION_KEY: string = process.env.ENCRYPTOION_KEY || "key";
function convertNestedObjectToString(object: Record<string, any>): string {
    const newStrArr: any[] = JSON.stringify(object).split('')
        .map(character => convertCharacter(character));

    return newStrArr.join('');
}
function convertStringToNestedObject(str: string): Record<string, any> {
    const newStrArr: any[] = str.split('').map(character => convertCharacter(character));
    return JSON.parse(newStrArr.join(''));
}


export function encryptString(plainText: string): string {
    const encryptedObj = AES.encrypt(plainText, ENCRYPTION_KEY);
    return encryptedObj.toString();
}

export function decryptString(encryptedText: string): string {
    const decryptedObj = AES.decrypt(encryptedText, ENCRYPTION_KEY);
    return decryptedObj.toString(enc.Utf8);
}

export function encryptObj(plainObject: Record<string, any>): string {
    const stringedObject: string = convertNestedObjectToString(plainObject);
    return encryptString(stringedObject);
}


export function decryptObj(encryptedObj: string): Record<string, any> {
    const decryptedStrObj = decryptString(encryptedObj);
    return convertStringToNestedObject(decryptedStrObj);
}