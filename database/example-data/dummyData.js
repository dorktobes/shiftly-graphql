module.exports.dayParts = [
  'monA', 'monP', 
  'tuesA', 'tuesP', 
  'wedsA', 'wedsP', 
  'thursA', 'thursP', 
  'friA', 'friP', 
  'satA', 'satP', 
  'sunA', 'sunP'
];

module.exports.weekStart = { monday_dates: new Date('11/13/17') };

module.exports.users = [
  { name: 'Lucas', role: 'employee', password: null}, // id 1
  { name: 'Michael', role: 'employee', password: null}, // id 2
  { name: 'Sophia', role: 'employee', password: null},  // id 3
  { name: 'Tevene', role: 'employee', password: null},  // id 4
  { name: 'Will', role: 'employee', password: null},  // id 5
  { name: 'Christina', role: 'employee', password: null}, // id 6
  { name: 'Nia', role: 'employee', password: null}, // id 7
  { name: 'Kastania', role: 'employee', password: null},  // id 8
  { name: 'Chris', role: 'employee', password: null}, // id 9
  { name: 'Wren', role: 'employee', password: null},  // id 10
];

module.exports.temp1 = [
  { employees_needed: 1, monday_date: new Date('11/13/17'), day_part: 'monA' },
  { employees_needed: 2, monday_date: new Date('11/13/17'), day_part: 'monP' },
  { employees_needed: 2, monday_date: new Date('11/13/17'), day_part: 'tuesA' },
  { employees_needed: 2, monday_date: new Date('11/13/17'), day_part: 'tuesP' },
  { employees_needed: 2, monday_date: new Date('11/13/17'), day_part: 'wedsA' },
  { employees_needed: 3, monday_date: new Date('11/13/17'), day_part: 'wedsP' },
  { employees_needed: 2, monday_date: new Date('11/13/17'), day_part: 'thursA' },
  { employees_needed: 4, monday_date: new Date('11/13/17'), day_part: 'thursP' },
  { employees_needed: 3, monday_date: new Date('11/13/17'), day_part: 'friA' },
  { employees_needed: 5, monday_date: new Date('11/13/17'), day_part: 'friP' },
  { employees_needed: 4, monday_date: new Date('11/13/17'), day_part: 'satA' },
  { employees_needed: 5, monday_date: new Date('11/13/17'), day_part: 'satP' },
  { employees_needed: 3, monday_date: new Date('11/13/17'), day_part: 'sunA' },
  { employees_needed: 2, monday_date: new Date('11/13/17'), day_part: 'sunP' },
];

let lucas_avail = [
  { name: 'Lucas', day_part: 'monA', is_available: true },
  { name: 'Lucas', day_part: 'monP', is_available: true },
  { name: 'Lucas', day_part: 'tuesA', is_available: true },
  { name: 'Lucas', day_part: 'tuesP', is_available: false },
  { name: 'Lucas', day_part: 'wedsA', is_available: true },
  { name: 'Lucas', day_part: 'wedsP', is_available: true },
  { name: 'Lucas', day_part: 'thursA', is_available: true },
  { name: 'Lucas', day_part: 'thursP', is_available: false },
  { name: 'Lucas', day_part: 'friA', is_available: true },
  { name: 'Lucas', day_part: 'friP', is_available: true },
  { name: 'Lucas', day_part: 'satA', is_available: true },
  { name: 'Lucas', day_part: 'satP', is_available: true },
  { name: 'Lucas', day_part: 'sunA', is_available: false },
  { name: 'Lucas', day_part: 'sunP', is_available: false },
]

let michael_avail = [
  { name: 'Michael', day_part: 'monA', is_available: true },
  { name: 'Michael', day_part: 'monP', is_available: true },
  { name: 'Michael', day_part: 'tuesA', is_available: true },
  { name: 'Michael', day_part: 'tuesP', is_available: true },
  { name: 'Michael', day_part: 'wedsA', is_available: false },
  { name: 'Michael', day_part: 'wedsP', is_available: false },
  { name: 'Michael', day_part: 'thursA', is_available: false },
  { name: 'Michael', day_part: 'thursP', is_available: false },
  { name: 'Michael', day_part: 'friA', is_available: false },
  { name: 'Michael', day_part: 'friP', is_available: false },
  { name: 'Michael', day_part: 'satA', is_available: false },
  { name: 'Michael', day_part: 'satP', is_available: false },
  { name: 'Michael', day_part: 'sunA', is_available: true },
  { name: 'Michael', day_part: 'sunP', is_available: true },
]

let sophia_avail = [
  { name: 'Sophia', day_part: 'monA', is_available: false },
  { name: 'Sophia', day_part: 'monP', is_available: false },
  { name: 'Sophia', day_part: 'tuesA', is_available: false },
  { name: 'Sophia', day_part: 'tuesP', is_available: false },
  { name: 'Sophia', day_part: 'wedsA', is_available: true },
  { name: 'Sophia', day_part: 'wedsP', is_available: false },
  { name: 'Sophia', day_part: 'thursA', is_available: true },
  { name: 'Sophia', day_part: 'thursP', is_available: false },
  { name: 'Sophia', day_part: 'friA', is_available: true },
  { name: 'Sophia', day_part: 'friP', is_available: true },
  { name: 'Sophia', day_part: 'satA', is_available: true },
  { name: 'Sophia', day_part: 'satP', is_available: true },
  { name: 'Sophia', day_part: 'sunA', is_available: false },
  { name: 'Sophia', day_part: 'sunP', is_available: false },
]

let tevene_avail = [
  { name: 'Tevene', day_part: 'monA', is_available: false },
  { name: 'Tevene', day_part: 'monP', is_available: false },
  { name: 'Tevene', day_part: 'tuesA', is_available: false },
  { name: 'Tevene', day_part: 'tuesP', is_available: false },
  { name: 'Tevene', day_part: 'wedsA', is_available: true },
  { name: 'Tevene', day_part: 'wedsP', is_available: true },
  { name: 'Tevene', day_part: 'thursA', is_available: false },
  { name: 'Tevene', day_part: 'thursP', is_available: false },
  { name: 'Tevene', day_part: 'friA', is_available: true },
  { name: 'Tevene', day_part: 'friP', is_available: true },
  { name: 'Tevene', day_part: 'satA', is_available: true },
  { name: 'Tevene', day_part: 'satP', is_available: true },
  { name: 'Tevene', day_part: 'sunA', is_available: true },
  { name: 'Tevene', day_part: 'sunP', is_available: true },
]

let will_avail = [
  { name: 'Will', day_part: 'monA', is_available: true },
  { name: 'Will', day_part: 'monP', is_available: true },
  { name: 'Will', day_part: 'tuesA', is_available: true },
  { name: 'Will', day_part: 'tuesP', is_available: true },
  { name: 'Will', day_part: 'wedsA', is_available: true },
  { name: 'Will', day_part: 'wedsP', is_available: false },
  { name: 'Will', day_part: 'thursA', is_available: true },
  { name: 'Will', day_part: 'thursP', is_available: true },
  { name: 'Will', day_part: 'friA', is_available: true },
  { name: 'Will', day_part: 'friP', is_available: true },
  { name: 'Will', day_part: 'satA', is_available: true },
  { name: 'Will', day_part: 'satP', is_available: true },
  { name: 'Will', day_part: 'sunA', is_available: false },
  { name: 'Will', day_part: 'sunP', is_available: true },
]

let christina_avail = [
  { name: 'Christina', day_part: 'monA', is_available: true },
  { name: 'Christina', day_part: 'monP', is_available: true },
  { name: 'Christina', day_part: 'tuesA', is_available: true },
  { name: 'Christina', day_part: 'tuesP', is_available: true },
  { name: 'Christina', day_part: 'wedsA', is_available: true },
  { name: 'Christina', day_part: 'wedsP', is_available: true },
  { name: 'Christina', day_part: 'thursA', is_available: true },
  { name: 'Christina', day_part: 'thursP', is_available: true },
  { name: 'Christina', day_part: 'friA', is_available: true },
  { name: 'Christina', day_part: 'friP', is_available: true },
  { name: 'Christina', day_part: 'satA', is_available: true },
  { name: 'Christina', day_part: 'satP', is_available: true },
  { name: 'Christina', day_part: 'sunA', is_available: true },
  { name: 'Christina', day_part: 'sunP', is_available: true },
]

let nia_avail = [
  { name: 'Nia', day_part: 'monA', is_available: true },
  { name: 'Nia', day_part: 'monP', is_available: true },
  { name: 'Nia', day_part: 'tuesA', is_available: true },
  { name: 'Nia', day_part: 'tuesP', is_available: true },
  { name: 'Nia', day_part: 'wedsA', is_available: true },
  { name: 'Nia', day_part: 'wedsP', is_available: true },
  { name: 'Nia', day_part: 'thursA', is_available: true },
  { name: 'Nia', day_part: 'thursP', is_available: false },
  { name: 'Nia', day_part: 'friA', is_available: true },
  { name: 'Nia', day_part: 'friP', is_available: true },
  { name: 'Nia', day_part: 'satA', is_available: true },
  { name: 'Nia', day_part: 'satP', is_available: false },
  { name: 'Nia', day_part: 'sunA', is_available: true },
  { name: 'Nia', day_part: 'sunP', is_available: true },
]

let kastania_avail = [
  { name: 'Kastania', day_part: 'monA', is_available: true },
  { name: 'Kastania', day_part: 'monP', is_available: true },
  { name: 'Kastania', day_part: 'tuesA', is_available: true },
  { name: 'Kastania', day_part: 'tuesP', is_available: false },
  { name: 'Kastania', day_part: 'wedsA', is_available: true },
  { name: 'Kastania', day_part: 'wedsP', is_available: true },
  { name: 'Kastania', day_part: 'thursA', is_available: true },
  { name: 'Kastania', day_part: 'thursP', is_available: false },
  { name: 'Kastania', day_part: 'friA', is_available: true },
  { name: 'Kastania', day_part: 'friP', is_available: true },
  { name: 'Kastania', day_part: 'satA', is_available: true },
  { name: 'Kastania', day_part: 'satP', is_available: true },
  { name: 'Kastania', day_part: 'sunA', is_available: false },
  { name: 'Kastania', day_part: 'sunP', is_available: false },
]

let chris_avail = [
  { name: 'Chris', day_part: 'monA', is_available: true },
  { name: 'Chris', day_part: 'monP', is_available: false },
  { name: 'Chris', day_part: 'tuesA', is_available: true },
  { name: 'Chris', day_part: 'tuesP', is_available: false },
  { name: 'Chris', day_part: 'wedsA', is_available: true },
  { name: 'Chris', day_part: 'wedsP', is_available: false },
  { name: 'Chris', day_part: 'thursA', is_available: true },
  { name: 'Chris', day_part: 'thursP', is_available: false },
  { name: 'Chris', day_part: 'friA', is_available: true },
  { name: 'Chris', day_part: 'friP', is_available: false },
  { name: 'Chris', day_part: 'satA', is_available: true },
  { name: 'Chris', day_part: 'satP', is_available: true },
  { name: 'Chris', day_part: 'sunA', is_available: true },
  { name: 'Chris', day_part: 'sunP', is_available: false },
]

let wren_avail = [
  { name: 'Wren', day_part: 'monA', is_available: true },
  { name: 'Wren', day_part: 'monP', is_available: true },
  { name: 'Wren', day_part: 'tuesA', is_available: true },
  { name: 'Wren', day_part: 'tuesP', is_available: false },
  { name: 'Wren', day_part: 'wedsA', is_available: true },
  { name: 'Wren', day_part: 'wedsP', is_available: true },
  { name: 'Wren', day_part: 'thursA', is_available: true },
  { name: 'Wren', day_part: 'thursP', is_available: true },
  { name: 'Wren', day_part: 'friA', is_available: true },
  { name: 'Wren', day_part: 'friP', is_available: true },
  { name: 'Wren', day_part: 'satA', is_available: true },
  { name: 'Wren', day_part: 'satP', is_available: true },
  { name: 'Wren', day_part: 'sunA', is_available: false },
  { name: 'Wren', day_part: 'sunP', is_available: false },
]

module.exports.avails = [
  lucas_avail, michael_avail, 
  sophia_avail, tevene_avail, 
  will_avail, christina_avail, 
  nia_avail, kastania_avail, 
  chris_avail, wren_avail
];

