create table usuario_acesso(
  email varchar NOT NULL,
  senha varchar NOT NULL,
  PRIMARY KEY (email)
);

CREATE TABLE usuario
(
  id SERIAL  NOT NULL,
  tipo     varchar NOT NULL,
  nome      varchar NOT NULL,
  email     varchar NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_usuario_usuario_acesso
    FOREIGN KEY (email)
    REFERENCES usuario_acesso (email)
);

CREATE TABLE servico
(
  id SERIAL  NOT NULL,
  nome varchar NOT NULL,
  descricao varchar NOT NULL,
  cod varchar NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE ordem
(
  id SERIAL  NOT NULL,
  nome varchar NOT NULL,
  descricao varchar NOT NULL,
  id_usuario bigint  NOT NULL,
  id_servico bigint NOT NULL,
  estado varchar NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT FK_ordem_usuario
    FOREIGN KEY (id_usuario)
    REFERENCES usuario (id),
  CONSTRAINT FK_ordem_servico
    FOREIGN KEY (id_servico)
    REFERENCES servico (id)
);

create table permissao
(
  id bigint  NOT NULL,
  descricao varchar NOT NULL,
  PRIMARY KEY (id)
);

create table usuario_permissao
(
  email varchar NOT NULL,
  id_permissao bigint NOT NULL,
  PRIMARY KEY (email, id_permissao),
  CONSTRAINT FK_usuario_permissao_usuario_acesso FOREIGN KEY (email) REFERENCES usuario_acesso (email),
  CONSTRAINT FK_usuario_permissao_permissao FOREIGN KEY (id_permissao) REFERENCES permissao (id)
);

-- ===== DADOS DE EXEMPLO =====
INSERT INTO usuario_acesso (email, senha) VALUES ('gustavo@gmail.com', 'gustavo');

INSERT INTO usuario (tipo, nome, email) VALUES ('Admin', 'Gustavo', 'gustavo@gmail.com');
INSERT INTO usuario (tipo, nome, email) VALUES ('Normal', 'Claudio', 'claudio@gmail.com');
INSERT INTO usuario (tipo, nome, email) VALUES ('Normal', 'Andre', 'andre@gmail.com');

INSERT INTO servico (nome, descricao, cod) VALUES ('Impressão', 'Impressão de olhas nos formatos A4 ou A3', 'impressao');
INSERT INTO servico (nome, descricao, cod) VALUES ('Banner', 'Criação de um banner personalizado', 'banner');
INSERT INTO servico (nome, descricao, cod) VALUES ('Empréstimo de Equipamentos', 'Pedido para o empréstimo de equipamentos', 'emprestimo');

INSERT INTO ordem (nome, descricao, id_usuario, id_servico, estado) VALUES ('Impressão de A4', 'Pedido de impressão de 30 folhas A4', 2, 1, 'Em espera');
INSERT INTO ordem (nome, descricao, id_usuario, id_servico, estado) VALUES ('Criação de Banner', 'Pedido para a criação de um banner personalizado', 3, 2, 'Em espera');

INSERT INTO permissao (id, descricao) VALUES (1, 'VISUALIZAR_USUARIOS');
INSERT INTO permissao (id, descricao) VALUES (2, 'VISUALIZAR_SERVIÇOS');
INSERT INTO permissao (id, descricao) VALUES (3, 'VISUALIZAR_ORDENS');

INSERT INTO usuario_permissao (email, id_permissao) VALUES ('gustavo@gmail.com', 1);
INSERT INTO usuario_permissao (email, id_permissao) VALUES ('gustavo@gmail.com', 2);
INSERT INTO usuario_permissao (email, id_permissao) VALUES ('gustavo@gmail.com', 3);
