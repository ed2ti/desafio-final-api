const PedidoService = require('../services/pedido.service');

class PedidoController {
  static findAll(req, res) {
    try {
      const pedidos = PedidoService.findAll();
      res.json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static findById(req, res) {
    try {
      const pedido = PedidoService.findById(req.params.id);
      res.json(pedido);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static count(req, res) {
    try {
      const total = PedidoService.count();
      res.json({ total });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static create(req, res) {
    try {
      const pedido = PedidoService.create(req.body);
      res.status(201).json(pedido);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static updateStatus(req, res) {
    try {
      const pedido = PedidoService.updateStatus(req.params.id, req.body.status);
      res.json(pedido);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static delete(req, res) {
    try {
      const pedido = PedidoService.delete(req.params.id);
      res.json({ message: 'Pedido removido', pedido });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = PedidoController;
