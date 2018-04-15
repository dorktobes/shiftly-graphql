const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
 } = graphql;
const UserType = require('./UserType');
const ScheduleInfoType = require('./ScheduleInfoType');
const {
  findUser,
  getAllScheduleDates,
} = require('../../../database/controllers');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    User: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) }},
      resolve(parentValue, { id }, req) {
        return findUser(id);
      },
    },
    CurrentUser: {
      type: UserType,
      resolve(parentValue, args, req) {
        return findUser(req.session.id);
      },
    },
    ScheduleInfo: {
      type: ScheduleInfoType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) }},
      resolve(parentValue, args) {
        return {id: args.id};
      },
    },
    Schedules: {
      type: new GraphQLList(ScheduleInfoType),
      resolve(parentValue, args) {
        return getAllScheduleDates();
      }
    },
  },
});

module.exports = RootQueryType;
