const graphql = require('graphql');
const {
  GraphQLString,
  GraphQLNonNull,
} = graphql;

const UserType = require('../types/UserType');
const { updateEmployeeAvailabilityNonMiddleware } = require('../../../helpers');
const { findUser } = require('../../../database/controllers');

const updateEmployeeAvailability = {
  type: UserType,
  args: {
    newAvails: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(parentValue, args, { req }) {
    console.log(JSON.parse(args.newAvails));
    return updateEmployeeAvailabilityNonMiddleware(JSON.parse(args.newAvails))
    .then((id) => {
      return findUser(id);
    })
  },
};

module.exports = updateEmployeeAvailability;
