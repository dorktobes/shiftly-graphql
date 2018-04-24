const UserType = require('../types/UserType');
const { destroySessionNonMiddleware } = require('../../../helpers');
const { findUser } = require('../../../database/controllers');

const logout = {
  type: UserType,
  args: {},
  resolve(parentValue, args, { req, res }) {
    const userID = req.session.id;
    return destroySessionNonMiddleware(req, res)
    .then(() => {
      return findUser(userID);
    });

  },
};

module.exports = logout;
