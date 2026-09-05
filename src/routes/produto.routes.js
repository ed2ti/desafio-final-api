const { Router } = require('express');
const ProdutoController = require('../controllers/produto.controller');

const routes = Router();

routes.get('/produtos', ProdutoController.findAll);
routes.get('/produtos/contar', ProdutoController.count);
routes.get('/produtos/nome/:nome', ProdutoController.findByName);
routes.get('/produtos/:id', ProdutoController.findById);
routes.post('/produtos', ProdutoController.create);
routes.put('/produtos/:id', ProdutoController.update);
routes.delete('/produtos/:id', ProdutoController.delete);

module.exports = routes;
