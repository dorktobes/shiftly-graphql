const graphql = require('graphql');
const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
} = graphql;

const {
  findActualSchedule,
  findNeededEmployees,
} = require('../../../database/controllers');

const ScheduleActualEntryType = require('./ScheduleActualEntryType');
const NeededEmployeesEntryType = require('./NeededEmployeesEntryType');

const ScheduleInfoType = new GraphQLObjectType({
  name: 'ScheduleInfoType',
  fields: {
    scheduleActual: {
      type: new GraphQLList(ScheduleActualEntryType),
      resolve(parentValue, args) {
        console.log('in ScheduleInfoType', parentValue, args)
        return findActualSchedule(parentValue.id);
      }
    },
    neededEmployees: {
      type: new GraphQLList(NeededEmployeesEntryType),
      resolve(parentValue, args) {
        return findNeededEmployees(parentValue.id);
      },
    },
    monday_dates: {
      type: GraphQLString,
    },
  },
});

module.exports = ScheduleInfoType;
