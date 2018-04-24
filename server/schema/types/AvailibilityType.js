const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
} = graphql;

const { findDayParts } = require('../../../database/controllers');

const AvailibilityType = new GraphQLObjectType({
  name: 'Availability',
  fields: {
    dayPart: {
      type: GraphQLString,
      resolve(parentValue, args) {
        return findDayParts(parentValue.day_part_id);
      },
    },
    isAvailable: {
      type: GraphQLBoolean,
      resolve(parentValue) {
        return parentValue.is_available;
      }
    },
  }
});

module.exports = AvailibilityType;
