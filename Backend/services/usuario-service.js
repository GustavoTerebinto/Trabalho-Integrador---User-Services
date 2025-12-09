const usuarioRepository = require("../repositories/usuario-repository");

// Função para retornar todos os usuários
const retornaTodosUsuarios = async (req, res) => {
	try {
		const usuarios = await usuarioRepository.obterTodosUsuarios();
		res.status(200).json({ usuarios: usuarios });
	} catch (error) {
		console.log("Erro ao buscar usuarios:", error);
		res.sendStatus(500);
	}
};

// Função para criar um novo usuário
const criaUsuario = async (req, res) => {
	const { tipo, nome, email, } = req.body;
	console.log({ tipo, nome, email });
	try {
		if (!tipo || !nome || !email) {
			return res
				.status(400)
				.json({ message: "Todos campos são obrigatórios." });
		}

		const usuario = await usuarioRepository.criarUsuario({
			tipo,
			nome,
			email,
		});
		res.status(201).json(usuario);
	} catch (error) {
		console.log("Erro ao criar usuário:", error);
		res.sendStatus(500);
	}
};

// Função para atualizar um usuário
const atualizaUsuario = async (req, res) => {
	const { tipo, nome, email } = req.body;
	const id = parseInt(req.params.id);
	try {
		const usuarioAtualizado = await usuarioRepository.atualizarUsuario({
			id,
			tipo,
			nome,
			email,
		});

		if (usuarioAtualizado) {
			res.status(200).json(usuarioAtualizado);
		} else {
			res.status(404).json({ message: "Usuário não encontrado" });
		}
	} catch (error) {
		console.log("Erro ao atualizar usuário:", error);
		res.sendStatus(500);
	}
};

// Função para deletar um usuário
const deletaUsuario = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const usuarioRemovido = await usuarioRepository.deletarUsuario({ id });

		if (usuarioRemovido) {
			res.status(200).json({
				message: "Usuário removido com sucesso.",
				usuario: usuarioRemovido,
			});
		} else {
			res.status(404).json({ message: "Usuário não encontrado" });
		}
	} catch (error) {
		console.error("Erro ao deletar usuário:", error);
		res.status(500).json({ message: "Erro ao deletar usuário" });
	}
};

// Função para buscar usuário por ID
const retornaUsuarioPorId = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const usuario = await usuarioRepository.obterUsuarioPorId({
			id,
		});

		if (usuario) {
			res.status(200).json(usuario);
		} else {
			res.status(404).json({ message: "Usuário não encontrado." });
		}
	} catch (error) {
		console.log("Erro ao buscar usuário:", error);
		res.sendStatus(500);
	}
};

// Função para retornar usuário por email
const retornaUsuarioEmail = async (req, res) => {
	try {
		const usuario = await usuarioRepository.obterUsuarioPorEmail(req.params.email);
		res.status(200).json({ usuario: usuario });
	} catch (error) {
		console.log("Erro ao buscar usuário:", error);
		res.sendStatus(500);
	}
};

module.exports = {
	retornaTodosUsuarios,
	criaUsuario,
	atualizaUsuario,
	deletaUsuario,
	retornaUsuarioPorId,
	retornaUsuarioEmail,
};
