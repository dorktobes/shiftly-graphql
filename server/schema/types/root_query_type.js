const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    dummyType: {
      type: GraphQLID,
      resolve(parentValue, args, req) {
        return { id:"string"}
      }
    },
  },
});

module.exports = RootQueryType;
