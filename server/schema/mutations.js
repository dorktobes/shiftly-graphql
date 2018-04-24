const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
} = graphql;
const {
  authenticateNonMiddleware,
  destroySessionNonMiddleware,
  createUserNonMiddleware,
  updateEmployeeAvailabilityNonMiddleware,
} = require('../../helpers');
const {
  findUser,
} = require('../../database/controllers');

const UserType = require('./types/UserType');

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    login: {
      type: UserType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parentValue, args, { req, res }) {
        return authenticateNonMiddleware({
          username: args.name,
          password: args.password
        },
          req,
          res,
        );
      },
    },
    logout: {
      type: UserType,
      args: {},
      resolve(parentValue, args, { req, res }) {
        const userID = req.session.id;
        return destroySessionNonMiddleware(req, res)
        .then(() => {
          return findUser(userID);
        });

      },
    },
    signup: {
      type: UserType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parentValue, args, { req, res }) {
        return createUserNonMiddleware(args, req, res)
        .then((id) => findUser(id));
      },
    },
    updateEmployeeAvailability: {
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
    },
    addEmployee: {
      type: UserType,
      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },
        password: {
          type: new GraphQLNonNull(GraphQLString),
        },
      },
      resolve(parentValue, args, req) {

      },
    },
    updateNeededEmployees: {
      type: GraphQLString,
      args: {},
      resolve(parentValue, args, req) {

      },
    },
    generateSchedule: {
      type: GraphQLString,
      args: {},
      resolve(parentValue, args, req) {

      },
    },
  }
});

module.exports = mutation;
