const graphql = require('graphql');
const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
} = graphql;

const { findActualSchedule } = require('../../../database/controllers');

const ScheduleActualEntryType = require('./ScheduleActualEntryType');

const ScheduleInfoType = new GraphQLObjectType({
  name: 'ScheduleInfoType',
  fields: {
    scheduleActual: {
      type: new GraphQLList(ScheduleActualEntryType),
      resolve(parentValue, args) {
        console.log('in ScheduleInfoType', parentValue, args)
        return findActualSchedule(7);
      }
    }
  },
});

module.exports = ScheduleInfoType;
