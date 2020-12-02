const mongoose = require('mongoose');
const { store } = require('./AutenticacaoController');
const Produto = mongoose.model('Produto');
const Usuario = mongoose.model('Usuario');
const Compra = mongoose.model('Compra');
const CompraItem = mongoose.model('CompraItem');

module.exports = {  
  async buyProducts(req, res) {
    try {
      const usuarioId = res.locals.auth_data.id;
      req.body.Usuario = usuarioId;
      const compra = await Compra.create(req.body);

      for(let i = 0; i < req.body.Itens.length; i++) {
        req.body.Itens[i].Compra = compra.id;
        const produto = await Produto.findById(req.body.Itens[i].Produto);
        const compraItem = await CompraItem.create(req.body.Itens[i]);
        compra.CompraItens.push(compraItem);
        produto.CompraItens.push(compraItem);
        await produto.save();
      }
      
      await compra.save(); 
      return res.status(201).json({compra}); 
    }
    catch (err){
      return res.status(400).json({err: err}); 
    }
  },

  async listarCompras(req, res) {
    try {
      const usuarioId = res.locals.auth_data.id;

      const filters = {};
      filters.Usuario = usuarioId; 
      if(req.query.nome) {
        filters.Nome = new RegExp(req.query.nome, 'i');
      } 
      const compras = await Compra.paginate(
        filters
      ,{
        page: req.query.page || 1,
        limit: 10,
        sort: '-DataCriacao',
        populate: 'CompraItens'
      });
  
      return res.status(200).json({compras});
      
    }
    catch(err) {
      return res.status(400).json({Erro: err});
    }
  },
}
