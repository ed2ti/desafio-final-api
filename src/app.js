require('dotenv').config();
const express = require('express');
const clienteRoutes = require('./routes/cliente.routes');
const produtoRoutes = require('./routes/produto.routes');
const pedidoRoutes = require('./routes/pedido.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api', clienteRoutes);
app.use('/api', produtoRoutes);
app.use('/api', pedidoRoutes);

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'REST API MVC - Desafio Final',
    version: '1.0.0',
    endpoints: {
      clientes: '/api/clientes',
      produtos: '/api/produtos',
      pedidos: '/api/pedidos'
    }
  });
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
