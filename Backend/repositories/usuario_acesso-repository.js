const model = require("../models");

// Função para obter todos os acessos
const obterTodosUsuariosAcessos = async () => {
	return await model.UsuarioAcesso.findAll();
};

// Função para obter acessos por email
const obterUsuarioAcessoPorEmail = async (usuario) => {
	return await model.UsuarioAcesso.findByPk(usuario.email);
};

// Função para obter acessos com suas permissões
const obterUsuarioAcessoComPermissoes = async (usuario) => {
	return await model.UsuarioAcesso.findByPk(usuario.email, {
		include: [
			{
				model: model.Permissao,
				as: "Permissao",
				through: { attributes: [] }, // Não incluir atributos da tabela de junção
			},
		],
	});
};

// Função para criar um novo acesso
const criarUsuarioAcesso = async (usuario) => {
	await model.UsuarioAcesso.create(usuario);
	return usuario;
};

// Função para atualizar um acesso
const atualizarUsuarioAcesso = async (usuario) => {
	try {
		// Atualizar o acesso
		await model.UsuarioAcesso.update(usuario, { where: { email: usuario.email } });

		// Retornar o acesso atualizado
		return await model.UsuarioAcesso.findByPk(usuario.email);
	} catch (error) {
		throw error;
	}
};

// Função para deletar um acesso
const deletarUsuarioAcesso = async (usuario) => {
	try {
		// Deletar o acesso
		await model.UsuarioAcesso.destroy({ where: { email: usuario.email } });
		return usuario;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	obterTodosUsuariosAcessos,
	obterUsuarioAcessoPorEmail,
	obterUsuarioAcessoComPermissoes,
	criarUsuarioAcesso,
	atualizarUsuarioAcesso,
	deletarUsuarioAcesso,
};
