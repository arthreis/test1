const Pessoa = require('../models/pessoa');

exports.get = async(limit, page) => {
  limit = Number(limit)
  page = Number(page-1)

  const list = await Pessoa.find().limit(limit).skip(limit*page);

  const count = await Pessoa.estimatedDocumentCount();

  return {
    total: count,
    page: page,
    pageSize: list.length,
    peoples: list
  };
}

exports.getUser = async(params) => {
  const res = await Pessoa.find(params);
  return res;
}

exports.getUserById = async(id) => {
  const res = await Pessoa
  .findById(id);
  return res;
}

exports.create = async(data) => {
  var pessoa = new Pessoa(data);
  await pessoa.save();
}

exports.update = async(id, data) => {
  await Pessoa
    .findByIdAndUpdate(id, {
      $set: {
        nome: data.nome,
        inscricao: data.inscricao,
        endereco: {
          codUf: data.endereco.codUf,
          uf: data.endereco.uf,
          codCidade: data.endereco.codCidade,
          cidade: data.endereco.cidade
        },
        telefone: data.telefone
      }
    })
}

exports.delete = async(id) => {
  var pessoa = await Pessoa.findById(id)
  if(pessoa){
    await Pessoa.remove(pessoa);
  }else{
    throw Error('Not founded')
  }
}
