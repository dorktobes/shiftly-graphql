const graphql = require('graphql');
const {
  GraphQLString,
} = graphql;

const generateSchedule = {
  type: GraphQLString,
  args: {},
  resolve(parentValue, args, req) {

  },
};

module.exports = generateSchedule;
