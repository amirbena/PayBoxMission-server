import { Server } from 'http';
import App from './app';

const PORT = 5000;
const app = new App(PORT);

const server: Server = app.listen();

export default server;