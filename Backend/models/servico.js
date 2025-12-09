"use strict";

module.exports = (sequelize, DataTypes) => {
	const Servico = sequelize.define(
		"Servico",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			nome: DataTypes.STRING,
			descricao: DataTypes.TEXT,
			cod: DataTypes.STRING,
		},
		{
			sequelize,
			tableName: "servico",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
	);

	Servico.associate = function (models) {
		Servico.hasMany(models.Ordem, {
			foreignKey: "id_servico",
			sourceKey: "id",
		});
	};

	return Servico;
};
