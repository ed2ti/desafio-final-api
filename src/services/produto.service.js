const Produto = require('../models/produto.model');

class ProdutoService {
  static findAll() {
    return Produto.findAll();
  }

  static findById(id) {
    const produto = Produto.findById(id);
    if (!produto) {
      throw new Error('Produto não encontrado');
    }
    return produto;
  }

  static findByName(nome) {
    return Produto.findByName(nome);
  }

  static count() {
    return Produto.count();
  }

  static create(data) {
    if (!data.nome || !data.preco) {
      throw new Error('Nome e preço são obrigatórios');
    }
    return Produto.create(data);
  }

  static update(id, data) {
    this.findById(id);
    return Produto.update(id, data);
  }

  static delete(id) {
    const produto = this.findById(id);
    Produto.delete(id);
    return produto;
  }
}

module.exports = ProdutoService;
