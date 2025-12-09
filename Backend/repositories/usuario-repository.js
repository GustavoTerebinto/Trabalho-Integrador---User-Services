const model = require("../models");

// Função para obter todos os usuarios
const obterTodosUsuarios = async () => {
	return await model.Usuario.findAll();
};

// Função para obter usuario por ID
const obterUsuarioPorId = async (usuario) => {
	return await model.Usuario.findByPk(usuario.id);
};

// Função para obter usuário por email
const obterUsuarioPorEmail = async (email) => {
	return await model.Usuario.findOne({
		where: {
			email: email,
		},
	});
};

// Função para criar um novo usuário
const criarUsuario = async (usuario) => {
	await model.Usuario.create(usuario);
	return usuario;
};

// Função para atualizar um usuário
const atualizarUsuario = async (usuario) => {
	try {
		// Atualizar o usuário
		await model.Usuario.update(usuario, { where: { id: usuario.id } });

		// Retornar o usuário atualizado
		return await model.Usuario.findByPk(usuario.id);
	} catch (error) {
		throw error;
	}
};

// Função para deletar um usuário
const deletarUsuario = async (usuario) => {
	try {
		// Deletar o usuário
		await model.Usuario.destroy({ where: { id: usuario.id } });
		return usuario;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	obterTodosUsuarios,
	obterUsuarioPorId,
	obterUsuarioPorEmail,
	criarUsuario,
	atualizarUsuario,
	deletarUsuario,
};
