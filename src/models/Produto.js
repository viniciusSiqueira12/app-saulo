const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ProdutoSchema = new mongoose.Schema({
  Nome: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  Preco: {
    type: Number,
    required: true
  },
  Descricao: {
    type: String,
    required: true
  },
  Especificacao: {
    type: String,
    required: true
  },
  TipoRacao: {
    type: String,
    required: true
  },
  UrlFoto: {
    type: String,
    required: true
  },
  CompraItens: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompraItem'
  }],
  DataCriacao: {
    type: Date,
    default: Date.now
  }
});

ProdutoSchema.plugin(mongoosePaginate);
mongoose.model('Produto', ProdutoSchema);