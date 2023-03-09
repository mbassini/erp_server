const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { Item, User } = require("../database/models");

const hashPassword = async password => bcrypt.hash(password, 10);

module.exports = {
  Query: {
    async user(_, { id }, ctx) {
      return User.findByPk(id);
    },
    async users(_, { id }, ctx) {
      return User.findAll();
    },
    async item(_, { id }, context) {
      //TODO: Validations
      return Item.findByPk(id);
    },
    async items(root, args, context) {
      //TODO: Validations
      return Item.findAll();
    },
  },
  Mutation: {
    async registerUser(root, { name, email, password }, _) {
      const user = await User.findOne({ where: { email } });

      if (user) throw new Error("Email already taken");

      const securePassword = await hashPassword(password);

      return User.create({ name, email, password: securePassword });
    },

    async updateUser(_, args, ctx) {
      const updates = Object.keys(args);
      const allowedUpdates = ["name", "email", "password"];
      const isValidOperation = updates.every(update =>
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        return { status: 403, success: false, message: "Cannot update field" };
      }

      try {
        const { name, email, password } = args;
        const user = await User.findByPk(ctx.user.id);
        await user.update({
          name: name || user.name,
          email: email || user.email,
          password: password ? await hashPassword(password) : user.password,
          updatedAt: new Date(),
        });
        return {
          status: 204,
          success: true,
          message: "User successfully updated!",
        };
      } catch (e) {
        console.error(e);
        return { status: 500, success: false, message: e.message };
      }
    },

    async loginUser(root, { email, password }, _) {
      const user = await User.findOne({ where: { email } });

      if (!user) throw new Error("User does not exist!");

      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });
        return { ...user.toJSON(), token };
      }

      throw new AuthenticationError("Invalid credentials.");
    },

    async createItem(root, { name, quantity }, { user }) {
      if (!user) throw new AuthenticationError("Please authenticate!");

      return Item.create({
        name,
        quantity: quantity ?? 0,
        createdBy: user.id,
        updatedBy: user.id,
      });
    },
  },
};
