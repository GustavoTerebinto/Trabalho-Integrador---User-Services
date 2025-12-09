const ordemRepository = require("../repositories/ordem-repository");

// Função para retornar todas as ordens
const retornaTodasOrdens = async (req, res) => {
	try {
		const ordens = await ordemRepository.obterTodasOrdens();
		res.status(200).json({ ordens: ordens });
	} catch (error) {
		console.log("Erro ao buscar ordens:", error);
		res.sendStatus(500);
	}
};

// Função para retornar todas as ordens do usuário
const retornaOrdemUsuario = async (req, res) => {
	try {
		const ordens = await ordemRepository.obterOrdemPorIdUsuario(req.params.id_usuario);
		res.status(200).json({ ordens: ordens });
	} catch (error) {
		console.log("Erro ao buscar ordens:", error);
		res.sendStatus(500);
	}
};

// Função para retornar todas as ordens do serviço
const retornaTodasOrdensServico = async (req, res) => {
	try {
		const ordens = await ordemRepository.obterOrdemPorIdServico(req.params.id_servico);
		res.status(200).json({ ordens: ordens });
	} catch (error) {
		console.log("Erro ao buscar ordens:", error);
		res.sendStatus(500);
	}
};

// Função para criar um nova ordem
const criaOrdem = async (req, res) => {
	const { nome, descricao, id_usuario, id_servico, estado } = req.body;
	try {
		if (!nome || !descricao || !id_usuario || !id_servico || !estado) {
			return res
				.status(400)
				.json({ message: "Todos os campos são obrigatórios." });
		}

		const ordem = await ordemRepository.criarOrdem({
			nome,
			descricao,
			id_usuario,
			id_servico,
			estado,
		});
		res.status(201).json(ordem);
	} catch (error) {
		console.log("Erro ao criar ordem:", error);
		res.sendStatus(500);
	}
};

// Função para atualizar uma ordem
const atualizaOrdem = async (req, res) => {
	const { nome, descricao, id_usuario, id_servico, estado } = req.body;
	const id = parseInt(req.params.id);

	try {
		const ordemAtualizada =
			await ordemRepository.atualizarOrdem({
				id,
				nome,
				descricao,
				id_usuario,
				id_servico,
				estado,
			});

		if (ordemAtualizada) {
			res.status(200).json(ordemAtualizada);
		} else {
			res.status(404).json({ message: "Ordem não encontrada" });
		}
	} catch (error) {
		console.log("Erro ao atualizar ordem:", error);
		res.sendStatus(500);
	}
};

// Função para deletar uma ordem
const deletaOrdem = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const ordemRemovida = await ordemRepository.deletarOrdem({ id });

		if (ordemRemovida) {
			res.status(200).json({
				message: "Ordem removida com sucesso.",
				ordem: ordemRemovida,
			});
		} else {
			res.status(404).json({ message: "Ordem não encontrada" });
		}
	} catch (error) {
		console.error("Erro ao deletar ordem:", error);
		res.status(500).json({ message: "Erro ao deletar ordem" });
	}
};

// Função para buscar ordem por ID
const retornaOrdemPorId = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const ordem = await ordemRepository.obterOrdemPorId({
			id,
		});

		if (ordem) {
			res.status(200).json(ordem);
		} else {
			res.status(404).json({ message: "Ordem não encontrada." });
		}
	} catch (error) {
		console.log("Erro ao buscar ordem:", error);
		res.sendStatus(500);
	}
};

module.exports = {
	retornaTodasOrdens,
	retornaOrdemUsuario,
	retornaTodasOrdensServico,
	criaOrdem,
	atualizaOrdem,
	deletaOrdem,
	retornaOrdemPorId,
};
