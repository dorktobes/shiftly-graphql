const moment = require('moment');
const Promise = require('bluebird');
const crypto = require('crypto');

const db = require('../database');
// const { getAllDayParts } = require('../database/controllers');

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

const getAllDayPartsNonMiddleware = () => {
  db.Day_Part.findAll({})
    .then((allDayParts) => {
      return allDayParts;
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

const addUserNonMiddleware = ({ username, password }) => {
  return db.User.create({
    name: username,
    role: 'employee',
    password: passHash(password),
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

const addEmployeeAvailabilityNonMiddleware = (empId) => {

  return new Promise((resolve, reject) => {

    db.Day_Part.findAll({})
    .then((dayParts) => {

      const parsedDayPartsKeys = Object.keys(dayParts);
      const employeeAvailability = {};
      Promise.each(parsedDayPartsKeys, (key) => {

        const id = JSON.parse(key) + 1;
        return db.Employee_Availability.create({
          is_available: true,
          user_id: empId,
          day_part_id: id,
        })
        .then((availability) => {

          employeeAvailability[key] = availability;
        })
        .catch((err) => {

          reject(err);
        });
      })
      .then(() => {

        resolve(employeeAvailability)
      }).catch((err) => {

        reject(err);
      });
    })
    
  })
};

// Takes new employeeAvailabilities and updates them in the database
const updateEmployeeAvailability = (req, res, next) => {
  console.log(req.body);
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

const updateEmployeeAvailabilityNonMiddleware = ({ employeeAvailabilities }) => {
  
  return Promise.each(employeeAvailabilities, ({ is_available, user_id, day_part_id }) => {
    const updates = { is_available };
    const conditions = {
      where: {
        user_id,
        day_part_id,
      },
    };
    return db.Employee_Availability.update(updates, conditions);
  }).then((updatedAvailabilities) => {
    return employeeAvailabilities[0].user_id
  })
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

const updateNeededEmployeesNonMiddleware = (newNeeds) => {
  return Promise.each(newNeeds, (shift) => {
    const updates = { employees_needed: shift.employees_needed };
    const conditions = {
      where: {
        schedule_id: shift.schedule_id,
        day_part_id: shift.day_part_id,
      },
    };
    return db.Needed_Employee.update(updates, conditions);
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

const createScheduleDateNonMiddleware = () => {
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

const newSession = (req, res) => {
  let session = {};
  session.session = crypto.randomBytes(32).toString('hex');
  session.user = null;
  res.cookie('shiftly', session.session);
  return session;
};

const checkSession = (req, res, next) => {
  return new Promise((resolve, reject) => {
    if (req.cookies['shiftly']) {
      resolve(db.Sessions.findAll( {where: { session: req.cookies['shiftly'] } }));
    } else {
      resolve([]);
    }
  })
  .then((session) => {
    if (session.length > 0) {
      db.User.findAll({ where: { id: session[0].dataValues.user_id}})
      .then((user) => {
        let obj =  { session: session[0].dataValues.session }; 
        if (user.length) {
          obj.id = user[0].dataValues.id;
          obj.user = user[0].dataValues.name;
          obj.role = user[0].dataValues.role;
        }
        req.session = obj;
        next();
      })
    } else {
      req.session = newSession(req, res);
      next();
    }
  })
};

const passHash = (password) => {
  let shasum = crypto.createHash('sha256');
  shasum.update(password);
  return shasum.digest('hex');
}

const authenticate = (req, res, next) => {
  //get user info from user db;
  if (req.session.user) {
    next();
    return;
  }
  db.User.findAll({ where: {name: req.body.creds.username} })
  .then((user) => {
    if (user.length === 0) {
      res.status(201).send({ flashMessage: { message: 'incorrect username or password', type: 'red'}});
      return;
    }
    user = user[0].dataValues;
    if (passHash(req.body.creds.password) === user.password) {
      req.session = newSession(req, res);
      req.session.user = user.name;
      req.session.role = user.role;
      db.Sessions.create({session: req.session.session, user_id: user.id})
      .then(() => {
        next();
      })
    } else {
      res.status(201).send({ flashMessage: { message: 'incorrect username or password', type: 'red'}});
    }
  })
};

const authenticateNonMiddleware = ({ username, password}, req, res) => {
  //get user info from user db;
  return new Promise((resolve, reject) => {
    db.User.findAll({ where: {name: username} })
    .then((user) => {
      if (user.length === 0) {
        reject('incorrect username or password');
        return;
      }
      user = user[0].dataValues;
      if (passHash(password) === user.password) {
        req.session = newSession(req, res);
        req.session.user = user.name;
        req.session.role = user.role;
        db.Sessions.create({session: req.session.session, user_id: user.id})
        .then(() => {
          resolve(user);
        })
      } else {
        reject('incorrect username or password');
      }
    })
  })
};

const createUser = (req, res, next) => {
  db.User.create({
    name: req.body.creds.username,
    role: 'manager',
    password: passHash(req.body.creds.password)
  }).then((data) => {
    req.session = newSession(req, res);
    req.session.user = req.body.creds.username;
    req.session.role =data.dataValues.role;
    db.Sessions.create({session: req.session.session, user_id: data.dataValues.id})
    .then(() => {
      next();
    })
  }).catch((err) => {
    res.status(201).send({ flashMessage: {message: `username "${req.body.creds.username}" already exists`, type: 'red'}})
  })
};

const createUserNonMiddleware = ({ name, password }, req, res, next) => {
  return new Promise((resolve, reject) => {
    db.User.create({
      name,
      role: 'manager',
      password: passHash(password)
    }).then((data) => {
      req.session = newSession(req, res);
      req.session.user = name;
      req.session.role =data.dataValues.role;
      db.Sessions.create({session: req.session.session, user_id: data.dataValues.id})
      .then(() => {
        resolve(data.dataValues.id);
      })
    }).catch((err) => {
      reject(`username "${req.body.creds.username}" already exists`);
    })

  });
};

const redirectIfLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    res.send();
    return;
  } 
  console.log('redirecting');
  next();
};

const sendEmployeeInfo = (req, res, next) => {
  if (req.session.role === 'employee') {
    let obj = {};
    obj.dayParts = req.dayParts;
    obj.users = req.users.filter((user) => {
      return user.dataValues.name === req.session.user;
    })
    .map((e) => e.dataValues);
    obj.scheduleActual = req.actual_schedules.filter((sched) => {
      return sched.user_id === obj.users[0].id;
    })
    .map((e) => e.dataValues);
    obj.employeeAvailabilities = req.employeeAvailabilities.filter((avail) => {
      return avail.dataValues.user_id === obj.users[0].id;
    })
    .map((e) => e.dataValues);
    obj.scheduleDates = req.scheduleDates;
    obj.view = 'employeeEditor';
    res.json(obj);
    return;
  }
  next();
};

const destroySession = (req, res, next) => {
  console.log('destroying session');
  db.Sessions.destroy({ where:{session: req.session.session} })
  .then(() => {
    console.log('creating new session');
    req.session = newSession(req, res);
    next();
  })
};

const destroySessionNonMiddleware = (req, res) => {
  console.log('destroying session');
  return db.Sessions.destroy({ where:{session: req.session.session} })
  .then(() => {
    console.log('creating new session');
    req.session = newSession(req, res);
  })
};


module.exports = {
  destroySession: destroySession,
  sendEmployeeInfo: sendEmployeeInfo,
  getAllActualSchedules: getAllActualSchedules,
  redirectIfLoggedIn: redirectIfLoggedIn,
  createUser: createUser,
  authenticate: authenticate,
  getAllUsers: getAllUsers,
  updateEmployeeAvailability: updateEmployeeAvailability,
  getAllEmployeeAvailabilities: getAllEmployeeAvailabilities,
  getAllDayParts: getAllDayParts,
  getAllNeededEmployees: getAllNeededEmployees,
  getAllScheduleDates: getAllScheduleDates,
  addUser: addUser,
  addEmployeeAvailability: addEmployeeAvailability,
  checkSession: checkSession,
  updateNeededEmployees: updateNeededEmployees,
  createScheduleDate:createScheduleDate,
  createScheduleTemplate: createScheduleTemplate,

  authenticateNonMiddleware,
  destroySessionNonMiddleware,
  createUserNonMiddleware,
  updateEmployeeAvailabilityNonMiddleware,
  addUserNonMiddleware,
  addEmployeeAvailabilityNonMiddleware,
  updateNeededEmployeesNonMiddleware,
};
