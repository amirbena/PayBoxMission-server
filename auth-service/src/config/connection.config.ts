
import mongoose from 'mongoose';
import "./dotenv.config";
const { USER_NAME, PASSWORD, DB_NAME } = process.env;
const connectionString: string = `mongodb+srv://${USER_NAME}:${PASSWORD}@cluster0.tkccy.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const successMessage = "Success to connect DB";
const failedMessage = "Failed to connect to DB";


mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(res => console.log(successMessage)).catch(ex => console.log(failedMessage));