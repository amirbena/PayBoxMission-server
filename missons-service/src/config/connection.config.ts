
import mongoose from 'mongoose';
import "./dotenv.config";


const connectionString: string = process.env.DB_CONNECTION || "NO CONNECTION";

const successMessage = "Success to connect DB";
const failedMessage = "Failed to connect to DB";


mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(res => console.log(successMessage)).catch(ex => console.log(failedMessage));