const bcrypt = require('bcryptjs');

module.exports = {
	async up(queryInterface) {
		return queryInterface.bulkInsert('Users', [
			{
				name: 'Rad',
				email: 'rad@herz.com',
				password: await bcrypt.hash('herzdev', 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Renio',
				email: 'renio@herz.com',
				password: await bcrypt.hash('herzdev', 10),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface) {
		return queryInterface.bulkDelete('Users', null, {});
	},
};
