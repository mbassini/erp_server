const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../database/models');
const verifyToken = async (token) => {
	try {
		if (!token) return null;

		const { id } = await jwt.verify(token, process.env.JWT_SECRET);

		return await User.findByPk(id);
	} catch (error) {
		throw new AuthenticationError(error.message);
	}
};

module.exports = async ({ req }) => {
	const token = req.headers['x-access-token'] || '';

	const user = await verifyToken(token);

	return { user: user?.dataValues ?? null };
};
