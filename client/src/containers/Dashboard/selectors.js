import { createSelector } from 'reselect';

export const selectedWeekSelector = state => state.selectedWeek;
export const scheduleDatesSelector = state => state.scheduleDates;
export const scheduleActualSelector = state => state.scheduleActual;
export const usersSelector = state => state.users;
export const neededEmployeesSelector = state => state.neededEmployees;

export const getScheduleId = createSelector(
  selectedWeekSelector,
  scheduleDatesSelector,
  (selectedWeek, scheduleDates) => {
    if (scheduleDates) {
      const selectedWeekObj = scheduleDates.find((el) => {
        return el.monday_dates.toString().substr(0, 10) === selectedWeek;
      });
      return selectedWeekObj ? selectedWeekObj.id : null;
    }
    return null;
  });

export const getWeeksSchedule = createSelector(
  getScheduleId,
  scheduleActualSelector,
  (scheduleId, schedules) => {
    return schedules.filter((e) => {
      return e.schedule_id == scheduleId;
    })
  })

export const makeScheduleArray = createSelector(
  getWeeksSchedule,
  usersSelector,
  (schedule, users) => {

    let schedules = {};
  let scheduleArr = [];
  if (schedule) {
    schedule.forEach((e) => {
        if(e.user_id === null) {
          schedules['HOUSE'] = schedules['HOUSE'] || [];
          schedules['HOUSE'].push(e.day_part_id);
        } else {
          schedules[e.user_id] = schedules[e.user_id] || [];
          schedules[e.user_id].push(e.day_part_id);
        }
    });

    for (const employeeId in schedules) {
      let schedObj = {}
      if (employeeId === 'HOUSE') {
        schedObj.name = 'HOUSE';
        schedObj.schedule = schedules[employeeId];
      } else {
        schedObj.name = users.filter( (user) => {
          return user.id == employeeId;
        })[0].name

        schedObj.schedule = schedules[employeeId];
      }

      scheduleArr.push(schedObj);
    }
  }
  return scheduleArr;
  });

export const makeNeededEmployeeCount = createSelector(
  selectedWeekSelector,
  neededEmployeesSelector,
  (scheduleId, neededEmployees) => {
    if(!neededEmployees) {
      return 0;
    }
    return neededEmployees.filter((el) => {
        return el.schedule_id === scheduleId;
      }).reduce((acc, el) => {
        return acc + el.employees_needed;
      }, 0);
      if (countOfNeededEmployees > 0) {
        weekHasAtLeastOneNeededEmployee = true;
      }
  });

