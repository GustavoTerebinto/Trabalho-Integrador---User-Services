const express = require("express");
const ordemService = require("../services/ordem-service");

const ordemRouter = express.Router();

// POST /ordem - Criar nova ordem
ordemRouter.post("/", ordemService.criaOrdem);

// GET /ordem/todos - Retornar todas as ordens
ordemRouter.get("/todos", ordemService.retornaTodasOrdens);

// GET /ordem/:id - Retornar ordem por ID
ordemRouter.get("/:id", ordemService.retornaOrdemPorId);

// GET /ordem/:id_usuario - Retornar todas as ordens do usuario
ordemRouter.get("/usuario/:id_usuario", ordemService.retornaOrdemUsuario);

// GET /ordem/:id_servico - Retornar todas as ordens do serviço
ordemRouter.get("/servico/:id_servico", ordemService.retornaTodasOrdensServico);

// PUT /ordem/:id - Atualizar ordem
ordemRouter.put("/:id", ordemService.atualizaOrdem);

// DELETE /ordem/:id - Deletar ordem
ordemRouter.delete("/:id", ordemService.deletaOrdem);

module.exports = ordemRouter;