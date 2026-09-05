const { Router } = require('express');
const PedidoController = require('../controllers/pedido.controller');

const routes = Router();

routes.get('/pedidos', PedidoController.findAll);
routes.get('/pedidos/contar', PedidoController.count);
routes.get('/pedidos/:id', PedidoController.findById);
routes.post('/pedidos', PedidoController.create);
routes.put('/pedidos/:id/status', PedidoController.updateStatus);
routes.delete('/pedidos/:id', PedidoController.delete);

module.exports = routes;
