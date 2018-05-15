const graphql = require('graphql');
const {
  GraphQLString,
  GraphQLNonNull,
} = graphql;

const UserType = require('../types/UserType');
const { findUser } = require('../../../database/controllers');
const {
  addUserNonMiddleware,
  addEmployeeAvailabilityNonMiddleware,
} = require('../../../helpers');


const addEmployee = {
      type: UserType,
      args: {
        username: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parentValue, args, req) {

        return addUserNonMiddleware(args)
        .then(({ dataValues }) => {
          
          return addEmployeeAvailabilityNonMiddleware(dataValues.id)
          .then((avails) => {

            return findUser(dataValues.id);
          })
        })
      },
    };

module.exports = addEmployee;
