const express = require('express');
const routes = express.Router();
const multer = require('./config/multer');
const authorized = require('./middlewares/Auth');

const AutenticacaoController = require('./controllers/AutenticacaoController');
const ProdutoController = require('./controllers/ProdutoController');
const EnderecoController = require('./controllers/EnderecoController');
const CompraController = require('./controllers/CompraController');

//Autenticacão
routes.post('/acesso/criar', AutenticacaoController.store);
routes.post('/acesso/autenticar', AutenticacaoController.login);
routes.get('/usuario/info',  authorized, AutenticacaoController.usuario);

//Endereço
routes.post('/endereco/novo', authorized, EnderecoController.store);
routes.get('/endereco/listar', authorized, EnderecoController.listarEnderecos);

//Produtos
routes.post('/produtos/criar', multer.single('imagem'), ProdutoController.store);
routes.get('/produtos/listar', authorized, ProdutoController.listarProdutos);
routes.put('/produtos/editar/:id', multer.single('imagem'), ProdutoController.update);
routes.delete('/produtos/deletar/:id', ProdutoController.destroy);

//Compra 
routes.post('/produto/comprar', authorized, CompraController.buyProducts);
routes.get('/compra/listar', authorized, CompraController.listarCompras);

module.exports = routes;

