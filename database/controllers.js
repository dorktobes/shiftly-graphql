const db = require('.');
const { passHash } = require('../helpers');

const getAllUsers = () => {
  return db.User.findAll({});
};

const findUser = (id) => {
  return db.User.findAll({ where: { id }})
  .then((data) => {
    return data[0];
  });
};

const findAllEmployees = () => {
  return db.User.findAll({ where: { role: 'employee' }})
  .then((data) => {
    return data;
  });
}

const getAllScheduleDates = () => {
  return db.Schedule.findAll({});
};

const getAllNeededEmployees = () => {
  return db.Needed_Employee.findAll({});
};

const findNeededEmployees = (id) => {
  return db.Needed_Employee.findAll({
    where: {
      schedule_id: id,
    }
  });
}


const getAllEmployeeAvailabilities = () => {
  return db.Employee_Availability.findAll({});
};

const findEmployeeAvailabilites = (id) => {
  return db.Employee_Availability.findAll({ where: { user_id: id } });
};

const getAllDayParts = () => {
  return db.Day_Part.findAll({});
};

const findDayParts = (id) => {
  return db.Day_Part.findAll({ where: { id } })
  .then((result) => {
    console.log('IN CONTROLLERS', result);
    return result[0].name;
  });
};


const getAllActualSchedules = () => {
  return db.Actual_Schedule.findAll({});
};

const findActualSchedule = (id) => {
  return db.Actual_Schedule.findAll({
    where: { schedule_id: id }
  });
};

const addUser = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    db.User.create({
      name: username,
      role: 'employee',
      password: passHash(password),
    })
    .then(resolve)
    .catch((err) => {
       reject({ flashMessage: 'username already exists' });
    });
  });
};

const addEmployeeAvailability = (req, res, next) => {
  const parsedUserId = JSON.parse(JSON.stringify(req.user)).id;
  const parsedDayPartsKeys = Object.keys(req.dayParts);
  req.employeeAvailability = {};
  Promise.each(parsedDayPartsKeys, (key) => {
    const id = JSON.parse(key) + 1;
    return db.Employee_Availability.create({
      is_available: true,
      user_id: parsedUserId,
      day_part_id: id,
    })
      .then((availability) => {
        req.employeeAvailability[key] = availability;
      })
      .catch((err) => {
        res.status(500).send(`error adding availability for daypartid ${id}: ${err}`);
      });
  })
    .then(() => {
      next();
    }).catch((err) => {
      res.status(500).send(`error adding availability for user ${parsedUserId}: ${err}`);
    });
};

// Takes new employeeAvailabilities and updates them in the database
const updateEmployeeAvailability = (req, res, next) => {
  return Promise.each(req.body.employeeAvailabilities, (employeeAvail) => {
    const updates = { is_available: employeeAvail.is_available };
    const conditions = {
      where: {
        user_id: employeeAvail.user_id,
        day_part_id: employeeAvail.day_part_id,
      },
    };
    return db.Employee_Availability.update(updates, conditions);
  }).then((updatedAvailabilities) => {
    req.empoloyeeAvailabilities = updatedAvailabilities;
    next();
  });
};

const updateNeededEmployees = (req, res, next) => {
  return Promise.each(req.body.scheduleAvailabilities, (scheduleAvail) => {
    const updates = { employees_needed: scheduleAvail.employees_needed };
    const conditions = {
      where: {
        schedule_id: scheduleAvail.schedule_id,
        day_part_id: scheduleAvail.day_part_id,
      },
    };
    return db.Needed_Employee.update(updates, conditions);
  }).then((updatedTemplate) => {
    req.scheduleTemplate = updatedTemplate;
    next();
  }).catch((err) => {
    res.status(500).send('Error updating needed employees');
  });
};

const createScheduleDate = (req, res, next) => {
  db.Schedule.create({
    monday_dates: moment(req.body.scheduleTemplate[0].monday_dates)
  }).then((scheduleDate)=> {
    req.scheduleTemplate = {};
    req.scheduleTemplate.monday_date = scheduleDate;
    next();
  }).catch((err) => {
    res.status(500).send('Error creating new schedule date');
  });
};

const createScheduleTemplate = (req, res, next) => {
  let newTemplate = [];
  return Promise.each(req.body.scheduleTemplate, (key) => {
    return db.Needed_Employee.create({
      employees_needed: key.employees_needed,
      schedule_id: req.scheduleTemplate.monday_date.dataValues.id,
      day_part_id: parseInt(key.day_part_id),
    }).then((entry) => {
      newTemplate.push(entry);
    });
  }).then(() => {
    req.scheduleTemplate.template = newTemplate;
    next();
  }).catch((err) => {
    res.end(err);
  });
};

module.exports = {
  findEmployeeAvailabilites,
  findUser,
  findAllEmployees,
  findDayParts,
  findActualSchedule,
  findNeededEmployees,
  getAllScheduleDates,
};

