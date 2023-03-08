const { gql } = require('apollo-server-express');

const typeDefs = gql`
	scalar DateTime

	type User {
		id: Int!
		name: String!
		email: String!
		password: String!
		createdAt: DateTime
		updatedAt: DateTime
	}

	type RegisterResponse {
		id: Int!
		name: String!
		email: String!
	}

	type LoginResponse {
		id: Int!
		name: String!
		email: String!
		token: String!
	}

	type Item {
		id: Int!
		name: String!
		quantity: Int!
		createdAt: DateTime
		updatedAt: DateTime
		createdBy: User!
		updatedBy: User!
	}

	type CreateItemResponse {
		id: Int!
		name: String!
		quantity: Int
		createdAt: DateTime!
	}

	type Query {
		item(id: Int!): Item!
		items: [Item!]
	}

	type Mutation {
		registerUser(
			name: String!
			email: String!
			password: String!
		): RegisterResponse
		loginUser(email: String!, password: String!): LoginResponse

		createItem(name: String!, quantity: Int): CreateItemResponse
	}
`;

module.exports = typeDefs;
