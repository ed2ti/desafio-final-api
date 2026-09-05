const Pedido = require('../models/pedido.model');
const Produto = require('../models/produto.model');
const ClienteService = require('./cliente.service');

class PedidoService {
  static findAll() {
    return Pedido.findAll();
  }

  static findById(id) {
    const pedido = Pedido.findById(id);
    if (!pedido) {
      throw new Error('Pedido não encontrado');
    }
    return pedido;
  }

  static count() {
    return Pedido.count();
  }

  static create(data) {
    // Validate client exists
    ClienteService.findById(data.cliente_id);

    // Validate items
    if (!data.itens || data.itens.length === 0) {
      throw new Error('Pedido deve ter pelo menos um item');
    }

    // Check stock
    for (const item of data.itens) {
      const produto = Produto.findById(item.produto_id);
      if (!produto) {
        throw new Error(`Produto ${item.produto_id} não encontrado`);
      }
      if (produto.estoque < item.quantidade) {
        throw new Error(`Estoque insuficiente para ${produto.nome}`);
      }
    }

    return Pedido.create(data);
  }

  static updateStatus(id, status) {
    this.findById(id);
    return Pedido.updateStatus(id, status);
  }

  static delete(id) {
    const pedido = this.findById(id);
    Pedido.delete(id);
    return pedido;
  }
}

module.exports = PedidoService;
