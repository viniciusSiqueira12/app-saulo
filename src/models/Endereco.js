const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const EnderecoSchema = new mongoose.Schema({ 
  Logradouro: {
    type: String,
    maxlength: 50
  },
  Numero: {
    type: Number,
    maxlength: 5
  },
  Cep: {
    type: String,
    maxlength: 50
  },
  Bairro: {
    type: String,
    maxlength: 50
  },
  Localidade: {
    type: String,
    maxlength: 50
  },
  Uf: {
    type: String,
    maxlength: 50
  }, 
  Usuario: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario' 
  },
  DataCriacao : {
    type: Date,
    default: Date.now
  }
});

EnderecoSchema.plugin(mongoosePaginate);
mongoose.model("Endereco", EnderecoSchema);