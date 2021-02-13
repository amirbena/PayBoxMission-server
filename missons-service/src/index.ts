import App from './app';

const PORT = 5002;

const app: App = new App(PORT);

const server = app.listen();

module.exports = server;