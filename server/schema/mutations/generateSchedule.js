const graphql = require('graphql');
const {
  GraphQLString,
  GraphQLNonNull,
} = graphql;

const { generateSchedule } = require('../../../helpers/algo');
const ScheduleInfoType = require('../types/ScheduleInfoType');

const generateScheduleMutation = {
  type: ScheduleInfoType,
  args: {
    mondayDate: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(parentValue, args, req) {
    return generateSchedule(new Date(args.mondayDate))
    .then((schedule) => {
      return { id: schedule[0].schedule_id };
    })
  },
};

module.exports = generateScheduleMutation;
