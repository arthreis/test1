const repository = require('../repositories/pessoa-repository');

exports.get = async(req, res, next) => {
  try {
    var data = await repository.get(req.query.limit, req.query.page);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: 'Falha ao processar sua requisição'
    });
  }
}

exports.getUser = async(req, res, next) => {
  try {
    var { inscricao, codUf, uf, codCidade, cidade } = req.query
    var params = {
      "endereco": {
        "codUf": Number(codUf),
        "uf": uf,
        "codCidade": Number(codCidade),
        "cidade": cidade
      },
      "inscricao": inscricao,
    }
    var data = await repository.getUser(params);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: 'Falha ao recuperar pessoa'
    });
  }
}

exports.getUserById = async(req, res, next) => {
  try {
    var data = await repository.getUserById(req.params.id);
    if(data){
      res.status(200).send(data);
    }else{
      res.status(500).send({
        message: 'Pessoa não encontrada'
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Falha ao recuperar pessoa'
    });
  }
}

exports.post = async(req, res, next) => {
  try {
    await repository.create(req.body);
    res.status(201).send({
      message: 'Pessoa cadastrada com sucesso!'
    });
  } catch (error) {
    if(error.code === 11000){
      res.status(200).send({
        error: true,
        message: 'Pessoa já cadastrada!'
      });
    }else{
      res.status(500).send({
        message: 'Falha ao cadastrar pessoa'
      });
    }
  }
};

exports.put = async(req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send({
        message: 'Dados atualizados com sucesso!'
    });
  } catch (error) {
    res.status(500).send({
        message: 'Falha ao atualizar cadastro'
    });
  }
};

exports.delete = async(req, res, next) => {
  try {
    await repository.delete(req.body.id);
    res.status(200).send({
        message: 'Pessoa removida com sucesso!'
    });
  } catch (error) {
    res.status(500).send({
        message: 'Falha ao remover pessoa'
    });

  }
};
