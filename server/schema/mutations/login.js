const graphql = require('graphql');
const {
  GraphQLString,
  GraphQLNonNull,
} = graphql;

const { authenticateNonMiddleware } = require('../../../helpers');
const UserType = require('../types/UserType');

const login = {
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
    return authenticateNonMiddleware({
      username: args.name,
      password: args.password
    },
      req,
      res,
    );
  },
};

module.exports = login;
