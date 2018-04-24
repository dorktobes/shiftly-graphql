const graphql = require('graphql');
const {
  GraphQLString,
} = graphql;

const updateNeededEmployees = {
  type: GraphQLString,
  args: {},
  resolve(parentValue, args, req) {

  },
};

module.exports = updateNeededEmployees;
