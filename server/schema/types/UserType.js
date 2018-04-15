const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = graphql;

const { findAllEmployees } = require('../../../database/controllers');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: ()=>({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    role: { type: GraphQLString },
    employees: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return findAllEmployees();
      },
    }
  })
});

module.exports = UserType;
