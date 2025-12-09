const model = require("../models");

// Função para obter todos as ordens
const obterTodasOrdens = async () => {
	return await model.Ordem.findAll();
};

// Função para obter ordem por ID
const obterOrdemPorId = async (ordem) => {
	return await model.Ordem.findByPk(ordem.id);
};

// Função para obter ordem por ID do usuário
const obterOrdemPorIdUsuario = async (id_usuario) => {
	return await model.Ordem.findAll({
		where: {
			id_usuario: id_usuario,
		},
		include: [
			{
				model: model.Servico,
			},
		],
	});
};

// Função para obter ordem por ID do serviço
const obterOrdemPorIdServico = async (id_servico) => {
	return await model.Ordem.findAll({
		where: {
			id_servico: id_servico,
		},
		include: [
			{
				model: model.Usuario,
			},
		],
	});
};

// Função para criar uma nova ordem
const criarOrdem = async (ordem) => {
	await model.Ordem.create(ordem);
	return ordem;
};

// Função para atualizar uma ordem
const atualizarOrdem = async (ordem) => {
	try {
		// Atualizar a ordem
		await model.Ordem.update(ordem, {
			where: { id: ordem.id },
		});

		// Retornar a ordem atualizada
		return await model.Ordem.findByPk(ordem.id);
	} catch (error) {
		throw error;
	}
};

// Função para deletar uma ordem
const deletarOrdem = async (ordem) => {
	try {
		// Deletar a ordem
		await model.Ordem.destroy({ where: { id: ordem.id } });
		return ordem;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	obterTodasOrdens,
	obterOrdemPorId,
	obterOrdemPorIdUsuario,
	obterOrdemPorIdServico,
	criarOrdem,
	atualizarOrdem,
	deletarOrdem,
};
