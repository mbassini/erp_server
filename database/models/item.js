const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Item extends Model {}
	Item.init(
		{
			name: DataTypes.STRING,
			quantity: DataTypes.INTEGER,
			updatedBy: DataTypes.STRING,
			createdBy: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Item',
		}
	);
	return Item;
};
