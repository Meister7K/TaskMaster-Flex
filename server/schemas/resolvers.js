const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({});
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError(
          "Email or password incorrect, try again!"
        );
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError(
          "Email or password incorrect, try again!"
        );
      }

      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, { user, email, password }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { email, password },
          { new: true }
        );

        const user = await User.findOne({ email });

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    changePassword: async (
      parent,
      { currentPassword, newPassword },
      context
    ) => {
      if (context.user) {
        const user = await User.findById(context.user._id);
        const correctPw = await user.isCorrectPassword(currentPassword);

        if (!correctPw) {
          throw new AuthenticationError("Current password is incorrect");
        }

        user.password = newPassword;
        await user.save();

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
  },
};

module.exports = resolvers;
