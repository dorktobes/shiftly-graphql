const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    login: {
      type: GraphQLString,
      args: {},
      resolve(parentValue, args, req) {

      },
    },
    logout: {
      type: GraphQLString,
      args: {},
      resolve(parentValue, args, req) {

      },
    },
    signup: {
      type: GraphQLString,
      args: {},
      resolve(parentValue, args, req) {

      },
    },
    updateEmployeeAvailability: {
      type: GraphQLString,
      args: {},
      resolve(parentValue, args, req) {

      },
    },
    addEmployee: {
      type: GraphQLString,
      args: {},
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
