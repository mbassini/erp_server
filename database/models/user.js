const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {}

	User.init(
		{
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
			defaultScope: {
				rawAttributes: { exclude: ['password'] },
			},
		}
	);

	User.beforeCreate(async (user) => {
		user.password = await user.generatePasswordHash();
	});

	User.prototype.generatePasswordHash = function () {
		if (this.password) {
			return bcrypt.hash(this.password, 10);
		}
	};

	return User;
};
