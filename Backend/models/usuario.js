"use strict";

module.exports = (sequelize, DataTypes) => {
	const Usuario = sequelize.define(
		"Usuario",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			tipo: DataTypes.STRING,
			nome: DataTypes.STRING,
			email: DataTypes.STRING,
		},
		{
			sequelize,
			tableName: "usuario",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
	);

	Usuario.associate = function (models) {
		Usuario.hasMany(models.Ordem, {
			foreignKey: "id_usuario",
			sourceKey: "id",
		});
	};

	return Usuario;
};
