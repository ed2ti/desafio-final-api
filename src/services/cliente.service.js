const Cliente = require('../models/cliente.model');

class ClienteService {
  static findAll() {
    return Cliente.findAll();
  }

  static findById(id) {
    const cliente = Cliente.findById(id);
    if (!cliente) {
      throw new Error('Cliente não encontrado');
    }
    return cliente;
  }

  static findByName(nome) {
    return Cliente.findByName(nome);
  }

  static count() {
    return Cliente.count();
  }

  static create(data) {
    if (!data.nome || !data.email) {
      throw new Error('Nome e email são obrigatórios');
    }
    return Cliente.create(data);
  }

  static update(id, data) {
    this.findById(id);
    return Cliente.update(id, data);
  }

  static delete(id) {
    const cliente = this.findById(id);
    Cliente.delete(id);
    return cliente;
  }
}

module.exports = ClienteService;
