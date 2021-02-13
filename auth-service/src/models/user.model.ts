import { IUser } from '../types/mongooseTypes.interface';
import mongoose from 'mongoose';



export const UserSchemaName= "Users";
const userSchema: mongoose.Schema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

export default mongoose.model<IUser>(UserSchemaName, userSchema);