const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { User } = require('../models');

const resolvers = {
  Query: {
    me: async (args, context) => {
      if (context.user) {
        return User({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
     
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User({ email });

      if (!user) {
        throw new AuthenticationError('User not located with email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Check Password as it is invalid ');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;rs;