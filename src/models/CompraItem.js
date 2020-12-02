const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const CompraItemSchema = new mongoose.Schema({ 
  Quantidade: {
    type: Number,
    required: true,
  },
  Produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Produto'
  },
  Compra: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Compra'
  },
  DataCriacao: {
    type: Date,
    default: Date.now
  }
});

CompraItemSchema.plugin(mongoosePaginate);
mongoose.model('CompraItem', CompraItemSchema);