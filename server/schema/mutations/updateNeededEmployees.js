const graphql = require('graphql');
const {
  GraphQLString,
  GraphQLNonNull,
} = graphql;

const ScheduleInfoType = require('../types/ScheduleInfoType');
const { updateNeededEmployeesNonMiddleware } = require('../../../helpers');

const updateNeededEmployees = {
  type: ScheduleInfoType,
  args: {
    newNeeds: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(parentValue, args, req) {
    const newNeeds = JSON.parse(args.newNeeds).scheduleAvailabilities;
    return updateNeededEmployeesNonMiddleware(newNeeds)
    .then((updatedTemplate) => {
      return { id: updatedTemplate[0].schedule_id };
    });

  },
};

module.exports = updateNeededEmployees;

// for graphiql testing
// NewNeeds: "{\"scheduleAvailabilities\":[{\"schedule_id\":14,\"day_part_id\":\"1\",\"employees_needed\":1},{\"schedule_id\":14,\"day_part_id\":\"2\",\"employees_needed\":1},{\"schedule_id\":14,\"day_part_id\":\"3\",\"employees_needed\":2},{\"schedule_id\":14,\"day_part_id\":\"4\",\"employees_needed\":1},{\"schedule_id\":14,\"day_part_id\":\"5\",\"employees_needed\":2},{\"schedule_id\":14,\"day_part_id\":\"6\",\"employees_needed\":2},{\"schedule_id\":14,\"day_part_id\":\"7\",\"employees_needed\":2},{\"schedule_id\":14,\"day_part_id\":\"8\",\"employees_needed\":2},{\"schedule_id\":14,\"day_part_id\":\"9\",\"employees_needed\":3},{\"schedule_id\":14,\"day_part_id\":\"10\",\"employees_needed\":4},{\"schedule_id\":14,\"day_part_id\":\"11\",\"employees_needed\":3},{\"schedule_id\":14,\"day_part_id\":\"12\",\"employees_needed\":4},{\"schedule_id\":14,\"day_part_id\":\"13\",\"employees_needed\":2},{\"schedule_id\":14,\"day_part_id\":\"14\",\"employees_needed\":2}]}\"
