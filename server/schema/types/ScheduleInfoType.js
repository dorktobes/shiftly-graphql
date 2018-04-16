const graphql = require('graphql');
const {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
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
    id: {
      type: GraphQLID,
    },
    scheduleActual: {
      type: new GraphQLList(ScheduleActualEntryType),
      resolve(parentValue, args) {
        return findActualSchedule(parentValue.id);
      }
    },
    neededEmployees: {
      type: new GraphQLList(NeededEmployeesEntryType),
      resolve(parentValue, args) {
        return findNeededEmployees(parentValue.id);
      },
    },
    mondayDates: {
      type: GraphQLString,
      resolve(parentValue) {
        // send dates over in the format the client expects
        return JSON.stringify(parentValue.monday_dates).slice(1,11);
      },
    },
  },
});

module.exports = ScheduleInfoType;
