const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
 } = graphql;
const UserType = require('./UserType');
const ScheduleInfoType = require('./ScheduleInfoType');
const { findUser } = require('../../../database/controllers');

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
        return {id: 7};
      },
    }
  },
});

module.exports = RootQueryType;
