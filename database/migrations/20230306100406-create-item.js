module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Items', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			quantity: {
				type: Sequelize.INTEGER,
			},
			updatedBy: {
				type: Sequelize.INTEGER,
			},
			createdBy: {
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Items');
	},
};
