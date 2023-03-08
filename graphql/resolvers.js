const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { Item, User } = require('../database/models');

module.exports = {
	Mutation: {
		async registerUser(root, { name, email, password }, _) {
			const user = await User.findOne({ where: { email } });

			if (user) throw new Error('Email already taken');

			const securePassword = bcrypt.hash(password, 10);

			return User.create({ name, email, password: securePassword });
		},

		async loginUser(root, { email, password }, _) {
			const user = await User.findOne({ where: { email } });

			if (!user) throw new Error('User does not exist!');

			if (bcrypt.compareSync(password, user.password)) {
				const token = jwt.sign(
					{ id: user.id },
					process.env.JWT_SECRET,
					{ expiresIn: '1h' }
				);
				return { ...user.toJSON(), token };
			}

			throw new AuthenticationError('Invalid credentials.');
		},

		async createItem(root, { name, quantity }, { user }) {
			if (!user) throw new AuthenticationError('Please authenticate!');

			return Item.create({
				name,
				quantity: quantity ?? 0,
				createdBy: user.id,
				updatedBy: user.id,
			});
		},
	},

	Query: {
		async item(_, { id }, context) {
			//TODO: Validations
			return Item.findByPk(id);
		},
		async items(root, args, context) {
			//TODO: Validations
			return Item.findAll();
		},
	},
};
