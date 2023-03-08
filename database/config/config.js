require('dotenv').config();

module.exports = {
	development: {
		host: process.env.PG_HOST,
		database: process.env.PG_DATABASE,
		username: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		dialect: 'postgres',
		migrationStorageTableName: process.env.MIGRATIONS_TABLE,
		seederStorageTableName: process.env.SEEDERS_TABLE,
	},
};
