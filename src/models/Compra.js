const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const CompraSchema = new mongoose.Schema({ 
  ValorTotal: {
    type: Number,
    required: true,
  }, 
  FormaPagamento: {
    type: String,
    required: true
  }, 
  CompraItens: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompraItem'
  }],
  Usuario: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario' 
  },
  Endereco: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Endereco',
    required: true
  },
  DataCriacao: {
    type: Date,
    default: Date.now
  }
});

CompraSchema.plugin(mongoosePaginate);
mongoose.model('Compra', CompraSchema);