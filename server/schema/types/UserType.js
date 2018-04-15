const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = graphql;

const AvailibilityType = require('./AvailibilityType');
const {
  findAllEmployees,
  findEmployeeAvailabilites,
} = require('../../../database/controllers');

const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: ()=>({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    role: { type: GraphQLString },
    availabilities: {
      type: new GraphQLList(AvailibilityType),
      resolve(parentValue, args) {
        return findEmployeeAvailabilites(parentValue.id);
      }
    },
    employees: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args) {
        return findAllEmployees();
      },
    }
  })
});

module.exports = UserType;
