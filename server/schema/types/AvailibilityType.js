const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = graphql;

const { findDayParts } = require('../../../database/controllers');

const AvailibilityType = new GraphQLObjectType({
  name: 'Availability',
  fields: {
    dayPart: {
      type: GraphQLString,
      resolve(parentValue, args) {
        console.log('PV', parentValue);
        return findDayParts(parentValue.day_part_id);
      }
    }
  }
});

module.exports = AvailibilityType;
