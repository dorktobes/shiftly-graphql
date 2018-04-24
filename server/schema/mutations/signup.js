const graphql = require('graphql');
const {
  GraphQLString,
  GraphQLNonNull,
} = graphql;

const UserType = require('../types/UserType');
const { createUserNonMiddleware } = require('../../../helpers');
const { findUser } = require('../../../database/controllers');

const signup = {
  type: UserType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(parentValue, args, { req, res }) {
    return createUserNonMiddleware(args, req, res)
    .then((id) => findUser(id));
  },
};

module.exports = signup;
