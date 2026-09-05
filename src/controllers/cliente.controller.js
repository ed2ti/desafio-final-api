const ClienteService = require('../services/cliente.service');

class ClienteController {
  static findAll(req, res) {
    try {
      const clientes = ClienteService.findAll();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static findById(req, res) {
    try {
      const cliente = ClienteService.findById(req.params.id);
      res.json(cliente);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static findByName(req, res) {
    try {
      const clientes = ClienteService.findByName(req.params.nome);
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static count(req, res) {
    try {
      const total = ClienteService.count();
      res.json({ total });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static create(req, res) {
    try {
      const cliente = ClienteService.create(req.body);
      res.status(201).json(cliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static update(req, res) {
    try {
      const cliente = ClienteService.update(req.params.id, req.body);
      res.json(cliente);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static delete(req, res) {
    try {
      const cliente = ClienteService.delete(req.params.id);
      res.json({ message: 'Cliente removido', cliente });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = ClienteController;
