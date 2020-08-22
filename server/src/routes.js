const { Router } = require('express');
const routes = Router();

const { ClassController, ConnectionController } = require('./controllers');

routes.get('/', (req, res) => res.send('Hello World'));
routes.post('/classes', ClassController.create);
routes.get('/classes', ClassController.index);
routes.post('/connections', ConnectionController.create);
routes.get('/connections', ConnectionController.index);

module.exports = routes;
