"use strict";

module.exports = (sequelize, DataTypes) => {
	const Ordem = sequelize.define(
		"Ordem",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			nome: DataTypes.STRING,
			descricao: DataTypes.TEXT,
			id_usuario: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			id_servico: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			estado: DataTypes.STRING,
		},
		{
			sequelize,
			tableName: "ordem",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
	);

	Ordem.associate = function (models) {
		Ordem.belongsTo(models.Usuario, {
			foreignKey: "id_usuario",
			sourceKey: "id",
		});
		Ordem.belongsTo(models.Servico, {
			foreignKey: "id_servico",
			sourceKey: "id",
		});
	};

	return Ordem;
};
