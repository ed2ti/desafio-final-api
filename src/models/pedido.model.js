const db = require('../config/database');

class Pedido {
  static findAll() {
    const pedidos = db.prepare('SELECT * FROM pedidos ORDER BY created_at DESC').all();
    return pedidos.map(p => ({
      ...p,
      itens: this.findItens(p.id),
      valor_total: this.calcularTotal(p.id)
    }));
  }

  static findById(id) {
    const pedido = db.prepare('SELECT * FROM pedidos WHERE id = ?').get(id);
    if (!pedido) return null;
    return {
      ...pedido,
      itens: this.findItens(id),
      valor_total: this.calcularTotal(id)
    };
  }

  static findItens(pedidoId) {
    return db.prepare(`
      SELECT pi.*, p.nome as produto_nome
      FROM pedido_itens pi
      JOIN produtos p ON pi.produto_id = p.id
      WHERE pi.pedido_id = ?
    `).all(pedidoId);
  }

  static calcularTotal(pedidoId) {
    const result = db.prepare(`
      SELECT SUM(quantidade * preco_unitario) as total
      FROM pedido_itens
      WHERE pedido_id = ?
    `).get(pedidoId);
    return result?.total || 0;
  }

  static count() {
    return db.prepare('SELECT COUNT(*) as total FROM pedidos').get().total;
  }

  static create({ cliente_id, itens }) {
    const insertPedido = db.prepare(
      'INSERT INTO pedidos (cliente_id) VALUES (?)'
    );
    const insertItem = db.prepare(
      'INSERT INTO pedido_itens (pedido_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)'
    );

    const transaction = db.transaction((data) => {
      const result = insertPedido.run(data.cliente_id);
      const pedidoId = result.lastInsertRowid;

      for (const item of data.itens) {
        insertItem.run(pedidoId, item.produto_id, item.quantidade, item.preco_unitario);
      }

      return pedidoId;
    });

    const pedidoId = transaction({ cliente_id, itens });
    return this.findById(pedidoId);
  }

  static updateStatus(id, status) {
    db.prepare('UPDATE pedidos SET status = ? WHERE id = ?').run(status, id);
    return this.findById(id);
  }

  static delete(id) {
    const pedido = this.findById(id);
    db.prepare('DELETE FROM pedidos WHERE id = ?').run(id);
    return pedido;
  }
}

module.exports = Pedido;
