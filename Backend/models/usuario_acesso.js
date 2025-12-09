"use strict";

module.exports = (sequelize, DataTypes) => {
	const UsuarioAcesso = sequelize.define(
		"UsuarioAcesso",
		{
			email: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			senha: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "usuario_acesso",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
	);

	UsuarioAcesso.associate = function (models) {
		UsuarioAcesso.belongsToMany(models.Permissao, {
			through: models.UsuarioPermissao,
			foreignKey: "email",
			otherKey: "id_permissao",
		});
	};

	return UsuarioAcesso;
};
