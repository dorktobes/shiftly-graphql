const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = graphql;
const { findDayParts } = require('../../../database/controllers');

const NeededEmployeesEntryType = new GraphQLObjectType({
  name: 'NeededEmployeesEntryType',
  fields: {
    employees_needed: {
      type: GraphQLInt,
    },
    shift: {
      type: GraphQLString,
      resolve(parentValue, args) {
        return findDayParts(parentValue.day_part_id);
      },
    },
  },
});

module.exports = NeededEmployeesEntryType;
