const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  tipoPessoa:{
    type: String,
    required: true,
    enum:['Jurídica', 'Física'],
  },
  nome: {
    type: String,
    required: true,
  },
  inscricao: {
    type: String,
    required: true,
    unique: true,
    minlength:14,
    maxlength: 18,
  },
  endereco: {
    codUf:{
      type: Number,
      required: true,
    },
    uf:{
      type: String,
      required: true,
      length: 2,
    },
    codCidade:{
      type: Number,
      require: true,
    },
    cidade:{
      type: String,
      required: true,
    }
  },
  telefone: {
    type: String,
    required: true,
  },
  dataNascimento: {
    type: Date,
  }

})

module.exports = mongoose.model('Pessoa', schema)
