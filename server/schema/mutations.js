const graphql = require('graphql');
const {
  GraphQLObjectType,
} = graphql;

const login = require('./mutations/login');
const logout = require('./mutations/logout');
const signup = require('./mutations/signup');
const updateEmployeeAvailability = require('./mutations/updateEmployeeAvailability');
const addEmployee = require('./mutations/addEmployee');
const updateNeededEmployees = require('./mutations/updateNeededEmployees');
const generateSchedule = require('./mutations/generateSchedule');

const UserType = require('./types/UserType');

const mutation = new GraphQLObjectType({
  name: 'mutation',
  fields: {
    login,
    logout,
    signup,
    updateEmployeeAvailability,
    addEmployee,
    updateNeededEmployees,
    generateSchedule,
  }
});

module.exports = mutation;
