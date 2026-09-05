const { Router } = require('express');
const ClienteController = require('../controllers/cliente.controller');

const routes = Router();

routes.get('/clientes', ClienteController.findAll);
routes.get('/clientes/contar', ClienteController.count);
routes.get('/clientes/nome/:nome', ClienteController.findByName);
routes.get('/clientes/:id', ClienteController.findById);
routes.post('/clientes', ClienteController.create);
routes.put('/clientes/:id', ClienteController.update);
routes.delete('/clientes/:id', ClienteController.delete);

module.exports = routes;
