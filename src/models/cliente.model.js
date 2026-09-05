const db = require('../config/database');

class Cliente {
  static findAll() {
    return db.prepare('SELECT * FROM clientes').all();
  }

  static findById(id) {
    return db.prepare('SELECT * FROM clientes WHERE id = ?').get(id);
  }

  static findByName(nome) {
    return db.prepare('SELECT * FROM clientes WHERE nome LIKE ?').all(`%${nome}%`);
  }

  static count() {
    return db.prepare('SELECT COUNT(*) as total FROM clientes').get().total;
  }

  static create({ nome, email, telefone }) {
    const result = db.prepare(
      'INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)'
    ).run(nome, email, telefone);
    return this.findById(result.lastInsertRowid);
  }

  static update(id, { nome, email, telefone }) {
    db.prepare(
      'UPDATE clientes SET nome = ?, email = ?, telefone = ? WHERE id = ?'
    ).run(nome, email, telefone, id);
    return this.findById(id);
  }

  static delete(id) {
    const cliente = this.findById(id);
    db.prepare('DELETE FROM clientes WHERE id = ?').run(id);
    return cliente;
  }
}

module.exports = Cliente;
