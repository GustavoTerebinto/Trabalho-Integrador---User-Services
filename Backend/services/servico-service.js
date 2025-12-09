const servicoRepository = require("../repositories/servico-repository");

// Função para retornar todos os serviços
const retornaTodosServicos = async (req, res) => {
	try {
		const servico = await servicoRepository.obterTodosServicos();
		res.status(200).json({ servico: servico });
	} catch (error) {
		console.log("Erro ao buscar serviço:", error);
		res.sendStatus(500);
	}
};

// Função para criar um novo serviço
const criaServico = async (req, res) => {
	const { nome, descricao, cod } = req.body;
	try {
		if (!nome || !descricao || !cod) {
			return res
				.status(400)
				.json({ message: "Todos campos são obrigatórios." });
		}

		const servico = await servicoRepository.criarServico({
			nome,
			descricao,
			cod
		});
		res.status(201).json(servico);
	} catch (error) {
		console.log("Erro ao criar serviço:", error);
		res.sendStatus(500);
	}
};

// Função para atualizar um serviço
const atualizaServico = async (req, res) => {
	const { nome, descricao, cod } = req.body;
	const id = parseInt(req.params.id);
	try {
		const servicoAtualizado = await servicoRepository.atualizarServico({
			id,
			nome,
			descricao,
			cod,
		});

		if (servicoAtualizado) {
			res.status(200).json(servicoAtualizado);
		} else {
			res.status(404).json({ message: "Serviço não encontrado" });
		}
	} catch (error) {
		console.log("Erro ao atualizar serviço:", error);
		res.sendStatus(500);
	}
};

// Função para deletar um serviço
const deletaServico = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const servicoRemovido = await servicoRepository.deletarServico({ id });

		if (servicoRemovido) {
			res.status(200).json({
				message: "Serviço removido com sucesso.",
				servico: servicoRemovido,
			});
		} else {
			res.status(404).json({ message: "Serviço não encontrado" });
		}
	} catch (error) {
		console.error("Erro ao deletar serviço:", error);
		res.status(500).json({ message: "Erro ao deletar serviço" });
	}
};

// Função para buscar serviço por ID
const retornaServicoPorId = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const servico = await servicoRepository.obterServicoPorId({
			id,
		});

		if (servico) {
			res.status(200).json(servico);
		} else {
			res.status(404).json({ message: "Serviço não encontrado." });
		}
	} catch (error) {
		console.log("Erro ao buscar serviço:", error);
		res.sendStatus(500);
	}
};

module.exports = {
	retornaTodosServicos,
	criaServico,
	atualizaServico,
	deletaServico,
	retornaServicoPorId,
};
