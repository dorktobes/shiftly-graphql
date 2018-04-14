const db = require('../database');

const getAllUsers = (req, res, next) => {
  db.User.findAll({})
    .then((allUsers) => {
      req.users = allUsers;
      next();
    }).catch((err) => {
      res.status(500).send('Error getting users');
    });
};

const getAllScheduleDates = (req, res, next) => {
  db.Schedule.findAll({})
    .then((allScheduleDates) => {
      req.scheduleDates = allScheduleDates;
      next();
    }).catch((err) => {
      res.status(500).send('Error getting users');
    });
};

const getAllNeededEmployees = (req, res, next) => {
  db.Needed_Employee.findAll({})
    .then((allNeededEmployees) => {
      req.neededEmployees = allNeededEmployees;
      next();
    }).catch((err) => {
      res.status(500).send('Error getting neededEmployees');
    });
};


const getAllEmployeeAvailabilities = (req, res, next) => {
  db.Employee_Availability.findAll({})
    .then((allEmployeeAvailabilities) => {
      req.employeeAvailabilities = allEmployeeAvailabilities;
      next();
    }).catch((err) => {
      res.status(500).send('Error getting users');
    });
};

const getAllDayParts = (req, res, next) => {
  db.Day_Part.findAll({})
    .then((allDayParts) => {
      req.dayParts = allDayParts;
      next();
    }).catch((err) => {
      res.status(500).send('Error getting users');
    });
};

const getAllActualSchedules = (req, res, next) => {
  db.Actual_Schedule.findAll({})
  .then((schedules) => {
    req.actual_schedules = schedules;
    next();
  }).catch((err) => {
    res.status(500).send('Error getting schedules');
  })
};

const addUser = (req, res, next) => {
  db.User.create({
    name: req.body.username,
    role: 'employee',
    password: passHash(req.body.password),
  })
    .then((user) => {
      req.user = user;
      next();
    }).catch((err) => {
      res.json({ flashMessage: 'username already exists' });
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
