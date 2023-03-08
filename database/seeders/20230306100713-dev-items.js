module.exports = {
	async up(queryInterface) {
		return queryInterface.bulkInsert('Items', [
			{
				name: 'Nike T-Shirt',
				quantity: 15,
				createdAt: new Date(),
				updatedAt: new Date(),
				createdBy: 1,
				updatedBy: 1,
			},
			{
				name: 'Adidas Running Shorts',
				quantity: 8,
				createdAt: new Date(),
				updatedAt: new Date(),
				createdBy: 1,
				updatedBy: 1,
			},
			{
				name: 'Reebook Training Shoes',
				quantity: 36,
				createdAt: new Date(),
				updatedAt: new Date(),
				createdBy: 2,
				updatedBy: 2,
			},
			{
				name: 'Under Armour Socks',
				quantity: 62,
				createdAt: new Date(),
				updatedAt: new Date(),
				createdBy: 2,
				updatedBy: 2,
			},
		]);
	},

	async down(queryInterface) {
		return queryInterface.bulkDelete('Items', null, {});
	},
};
