const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
} = graphql;
const {
  authenticateNonMiddleware,
} = require('../../helpers');

const UserType = require('./types/UserType');

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    login: {
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
    },
    logout: {
      type: UserType,
      args: {},
      resolve(parentValue, args, req) {

      },
    },
    signup: {
      type: UserType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parentValue, args, req) {

      },
    },
    updateEmployeeAvailability: {
      type: GraphQLString,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(parentValue, args, req) {

      },
    },
    addEmployee: {
      type: UserType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parentValue, args, req) {

      },
    },
    updateNeededEmployees: {
      type: GraphQLString,
      args: {},
      resolve(parentValue, args, req) {

      },
    },
    generateSchedule: {
      type: GraphQLString,
      args: {},
      resolve(parentValue, args, req) {

      },
    },
  }
});

module.exports = mutation;
