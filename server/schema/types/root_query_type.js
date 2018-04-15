const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
 } = graphql;
const UserType = require('./UserType');
const { findUser } = require('../../../database/controllers');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    User: {
      type: UserType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) }},
      resolve(parentValue, { id }, req) {
        return findUser(id);
      }
    },
  },
});

module.exports = RootQueryType;
