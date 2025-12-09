const express = require("express");
const servicoService = require("../services/servico-service");

const servicoRouter = express.Router();

// POST /servico - Criar novo serviço
servicoRouter.post("/", servicoService.criaServico);

// GET /servico/todos - Retornar todos os serviços
servicoRouter.get("/todos", servicoService.retornaTodosServicos);

// GET /servico/:id - Retornar serviço por ID
servicoRouter.get("/:id", servicoService.retornaServicoPorId);

// PUT /servico/:id - Atualizar serviço
servicoRouter.put("/:id", servicoService.atualizaServico);

// DELETE /servico/:id - Deletar serviço
servicoRouter.delete("/:id", servicoService.deletaServico);

module.exports = servicoRouter;
