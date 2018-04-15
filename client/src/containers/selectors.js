import { createSelector } from 'reselect';

export const selectedWeekSelector = state => state.selectedWeek;
export const scheduleDatesSelector = state => state.scheduleDates;
export const scheduleActualSelector = state => state.scheduleActual;
export const usersSelector = state => state.users;
export const neededEmployeesSelector = state => state.neededEmployees;
export const dayPartsSelector = state => state.dayParts;
export const employeeAvailabilitySelector = state => state.employeeAvailabilities;

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
  scheduleDatesSelector,
  selectedWeekSelector,
  neededEmployeesSelector,
  (datesArray, selectedWeek, neededEmployees) => {
    const scheduleId = datesArray.reduce((acc, el) => {
      if( el.monday_dates.slice(0,10) === selectedWeek) {
        return el.id;
      }
      return acc;
    }, null);
    if(!neededEmployees) {
      return 0;
    }
    return neededEmployees.filter((el) => {
        return el.schedule_id === scheduleId;
      }).reduce((acc, el) => {
        return acc + el.employees_needed;
      }, 0);  
    }
  );

export const makeScheduleNeeds = createSelector(
  neededEmployeesSelector,
  scheduleDatesSelector,
  (neededEmployees, scheduleDates) => {
    let scheduleNeeds;
    if(neededEmployees && scheduleDates) {
      scheduleNeeds = scheduleDates.reduce((acc, scheduleDate) => {
        acc[scheduleDate.id] = {
        id: scheduleDate.id,
        monDate: scheduleDate.monday_dates,
        neededEmployees: {},
      };
      return acc;
      }, {});

      neededEmployees.forEach((requirement) => {
        scheduleNeeds[requirement.schedule_id].neededEmployees[requirement.day_part_id] = requirement.employees_needed;
      });
    }
    return scheduleNeeds;
  });

export const makeDayPartsMap = createSelector(
  dayPartsSelector,
  (dayParts) => {
    let dayPartsMap = {};
    dayParts.forEach((dayPart) => {
      dayPartsMap[dayPart.id] = dayPart.name;
    });
    return dayPartsMap;
  })

export const makeEmployeesMap = createSelector(
  dayPartsSelector,
  usersSelector,
  employeeAvailabilitySelector,
  (dayParts, users, employeeAvailabilities) => {
    let employees;
    if(users && employeeAvailabilities) {
      employees = users.filter((user) => {
        return user.role === 'employee';
      }).reduce((acc, employee) => {
        acc[employee.id] = {
          id: employee.id,
          name: employee.name,
          availabilities: {},
        };
        return acc;
      }, {});
    
      employeeAvailabilities.forEach((availability) => {
        employees[availability.user_id].availabilities[availability.day_part_id] = availability.is_available;
      });
    }
    return employees || null;
  });

