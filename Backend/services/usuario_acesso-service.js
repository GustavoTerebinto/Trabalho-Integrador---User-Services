const usuarioAcessoRepository = require("../repositories/usuario_acesso-repository");

// Função para retornar todos os acessos
const retornaTodosUsuariosAcessos = async (req, res) => {
	try {
		const usuarios = await usuarioAcessoRepository.obterTodosUsuariosAcessos();
		res.status(200).json({ usuarios: usuarios });
	} catch (error) {
		console.log("Erro ao buscar acessos:", error);
		res.sendStatus(500);
	}
};

// Função para criar um novo acesso
const criaUsuarioAcesso = async (req, res) => {
	const { email, senha } = req.body;
	console.log({ email, senha });
	try {
		if (!email || !senha) {
			return res
				.status(400)
				.json({ message: "Email e senha são obrigatórios." });
		}

		const usuario = await usuarioAcessoRepository.criarUsuarioAcesso({
			email,
			senha,
		});
		res.status(201).json(usuario);
	} catch (error) {
		console.log("Erro ao criar acesso:", error);
		res.sendStatus(500);
	}
};

// Função para atualizar um acesso
const atualizaUsuarioAcesso = async (req, res) => {
	const { senha } = req.body;
	const email = req.params.email;
	try {
		const usuarioAcessoAtualizado = await usuarioAcessoRepository.atualizarUsuarioAcesso({
			email,
			senha,
		});

		if (usuarioAcessoAtualizado) {
			res.status(200).json(usuarioAcessoAtualizado);
		} else {
			res.status(404).json({ message: "Acesso não encontrado" });
		}
	} catch (error) {
		console.log("Erro ao atualizar acesso:", error);
		res.sendStatus(500);
	}
};

// Função para deletar um acesso
const deletaUsuarioAcesso = async (req, res) => {
	try {
		const email = req.params.email;
		const usuarioAcessoRemovido = await usuarioAcessoRepository.deletarUsuarioAcesso({ email });

		if (usuarioAcessoRemovido) {
			res.status(200).json({
				message: "Acesso removido com sucesso.",
				usuario: usuarioAcessoRemovido,
			});
		} else {
			res.status(404).json({ message: "Acesso não encontrado" });
		}
	} catch (error) {
		console.error("Erro ao deletar acesso:", error);
		res.status(500).json({ message: "Erro ao deletar acesso" });
	}
};

// Função para buscar acesso por email
const retornaUsuarioAcessoPorEmail = async (req, res) => {
	try {
		const email = req.params.email;
		const usuario = await usuarioAcessoRepository.obterUsuarioAcessoPorEmail({
			email,
		});

		if (usuario) {
			res.status(200).json(usuario);
		} else {
			res.status(404).json({ message: "Acesso não encontrado." });
		}
	} catch (error) {
		console.log("Erro ao buscar acesso:", error);
		res.sendStatus(500);
	}
};

// Função para buscar acesso com suas permissões
const retornaUsuarioAcessoComPermissoes = async (req, res) => {
	try {
		const email = req.params.email;
		const usuario = await usuarioAcessoRepository.obterUsuarioAcessoComPermissoes({
			email,
		});

		if (usuario) {
			res.status(200).json(usuario);
		} else {
			res.status(404).json({ message: "Acesso não encontrado." });
		}
	} catch (error) {
		console.log("Erro ao buscar acesso com permissões:", error);
		res.sendStatus(500);
	}
};

module.exports = {
	retornaTodosUsuariosAcessos,
	criaUsuarioAcesso,
	atualizaUsuarioAcesso,
	deletaUsuarioAcesso,
	retornaUsuarioAcessoPorEmail,
	retornaUsuarioAcessoComPermissoes,
};
