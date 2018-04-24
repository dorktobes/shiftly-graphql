const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
} = graphql;
const {
  authenticateNonMiddleware,
  destroySessionNonMiddleware,
  createUserNonMiddleware,
  updateEmployeeAvailabilityNonMiddleware,
} = require('../../helpers');
const {
  findUser,
} = require('../../database/controllers');

const login = require('./mutations/login');
const logout = require('./mutations/logout');
const signup = require('./mutations/signup');
const updateEmployeeAvailability = require('./mutations/updateEmployeeAvailability');

const UserType = require('./types/UserType');

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    login,
    logout,
    signup,
    updateEmployeeAvailability,
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
