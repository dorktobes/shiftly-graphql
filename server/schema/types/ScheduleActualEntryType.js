const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
} = graphql;

const UserType = require('./UserType');
const {
  findUser,
  findDayParts,
} = require('../../../database/controllers');

const ScheduleActualEntryType = new GraphQLObjectType({
  name: 'ScheduleActualEntryType',
  fields: {
    user:{
      type: UserType,
      resolve(parentValue, args) {
        return findUser(parentValue.user_id);
      },
    },
    shift: {
      type: GraphQLString,
      resolve(parentValue, args) {
        return findDayParts(parentValue.day_part_id);
      },
    },
  }

});

module.exports = ScheduleActualEntryType;
