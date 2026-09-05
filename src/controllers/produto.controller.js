const ProdutoService = require('../services/produto.service');

class ProdutoController {
  static findAll(req, res) {
    try {
      const produtos = ProdutoService.findAll();
      res.json(produtos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static findById(req, res) {
    try {
      const produto = ProdutoService.findById(req.params.id);
      res.json(produto);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  static findByName(req, res) {
    try {
      const produtos = ProdutoService.findByName(req.params.nome);
      res.json(produtos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static count(req, res) {
    try {
      const total = ProdutoService.count();
      res.json({ total });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static create(req, res) {
    try {
      const produto = ProdutoService.create(req.body);
      res.status(201).json(produto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static update(req, res) {
    try {
      const produto = ProdutoService.update(req.params.id, req.body);
      res.json(produto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static delete(req, res) {
    try {
      const produto = ProdutoService.delete(req.params.id);
      res.json({ message: 'Produto removido', produto });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = ProdutoController;
