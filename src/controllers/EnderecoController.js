const mongoose = require('mongoose');
const Endereco = mongoose.model('Endereco');
const Usuario = mongoose.model('Usuario');

module.exports = {  
  async store(req, res) {
    try {
      const usuarioId = res.locals.auth_data.id;
      const usuario = await Usuario.findById(usuarioId);
      req.body.Usuario = usuarioId;
      const endereco = await Endereco.create(req.body); 
      usuario.Enderecos.push(endereco);
      await usuario.save();
      return res.status(201).json({endereco});
    }
    catch (err){
      return res.status(400).json({err});
    }
  },

  async listarEnderecos(req, res) {
    try {
      const usuarioId = res.locals.auth_data.id;

      const filters = {};
      filters.Usuario = usuarioId; 
      if(req.query.nome) {
        filters.Nome = new RegExp(req.query.nome, 'i');
      } 
      const enderecos = await Endereco.paginate(
        filters
      ,{
        page: req.query.page || 1,
        limit: 10,
        sort: '-DataCriacao'
      });
      return res.status(200).json({enderecos});
      
    }
    catch(err) {
      return res.status(400).json({Erro: err});
    }
  },
}
