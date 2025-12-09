const model = require("../models");

const obterTodosServicos = async () => {
	return await model.Servico.findAll();
};

// Função para obter serviço por ID
const obterServicoPorId = async (servico) => {
	return await model.Servico.findByPk(servico.id);
};

// Função para criar um novo serviço
const criarServico = async (servico) => {
	await model.Servico.create(servico);
	return servico;
};

// Função para atualizar um servico
const atualizarServico = async (servico) => {
	try {
		// Atualizar o serviço
		await model.Servico.update(servico, { where: { id: servico.id } });

		// Retornar o serviço atualizado
		return await model.Servico.findByPk(servico.id);
	} catch (error) {
		throw error;
	}
};

// Função para deletar um serviço
const deletarServico = async (servico) => {
	try {
		// Deletar o serviço
		await model.Servico.destroy({ where: { id: servico.id } });

		return servico;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	obterTodosServicos,
	obterServicoPorId,
	criarServico,
	atualizarServico,
	deletarServico,
};
