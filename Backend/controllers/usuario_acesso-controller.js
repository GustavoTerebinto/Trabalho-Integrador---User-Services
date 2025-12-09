const express = require("express");
const usuarioAcessoService = require("../services/usuario_acesso-service");

const usuarioAcessoRouter = express.Router();

// POST /usuario-acesso - Criar novo acesso
usuarioAcessoRouter.post("/", usuarioAcessoService.criaUsuarioAcesso);

// GET /usuario-acesso/todos - Retornar todos os acessos
usuarioAcessoRouter.get("/todos", usuarioAcessoService.retornaTodosUsuariosAcessos);

// GET /usuario-acesso/:email - Retornar acesso por email
usuarioAcessoRouter.get("/:email", usuarioAcessoService.retornaUsuarioAcessoPorEmail);

// GET /usuario-acesso/:email/permissoes - Retornar acesso com suas permissões
usuarioAcessoRouter.get("/:email/permissoes", usuarioAcessoService.retornaUsuarioAcessoComPermissoes);

// PUT /usuario-acesso/:email - Atualizar acesso
usuarioAcessoRouter.put("/:email", usuarioAcessoService.atualizaUsuarioAcesso);

// DELETE /usuario-acesso/:email - Deletar acesso
usuarioAcessoRouter.delete("/:email", usuarioAcessoService.deletaUsuarioAcesso);

module.exports = usuarioAcessoRouter;
