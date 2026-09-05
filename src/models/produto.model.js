const db = require('../config/database');

class Produto {
  static findAll() {
    return db.prepare('SELECT * FROM produtos').all();
  }

  static findById(id) {
    return db.prepare('SELECT * FROM produtos WHERE id = ?').get(id);
  }

  static findByName(nome) {
    return db.prepare('SELECT * FROM produtos WHERE nome LIKE ?').all(`%${nome}%`);
  }

  static count() {
    return db.prepare('SELECT COUNT(*) as total FROM produtos').get().total;
  }

  static create({ nome, descricao, preco, estoque }) {
    const result = db.prepare(
      'INSERT INTO produtos (nome, descricao, preco, estoque) VALUES (?, ?, ?, ?)'
    ).run(nome, descricao, preco, estoque || 0);
    return this.findById(result.lastInsertRowid);
  }

  static update(id, { nome, descricao, preco, estoque }) {
    db.prepare(
      'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, estoque = ? WHERE id = ?'
    ).run(nome, descricao, preco, estoque, id);
    return this.findById(id);
  }

  static delete(id) {
    const produto = this.findById(id);
    db.prepare('DELETE FROM produtos WHERE id = ?').run(id);
    return produto;
  }
}

module.exports = Produto;
