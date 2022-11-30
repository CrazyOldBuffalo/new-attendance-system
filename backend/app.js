// Modules and Libraries required for the server to run
// Inclusion of other modules from within the app
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");

//Defining express to use cors, json and the urlencoded setting
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Creates objects as test data to populate the db
const User = db.users;
const Tutor = db.tutors;
const Student = db.students;
const Advisor = db.academicAdvisors;
const Module = db.modules;
const Course = db.courses;
const Class = db.classes;
const Register = db.registers;
const RegisterItem = db.registerItem;

async function createUsers() {
  const user1 = new User({
    "username": "Ollie",
    "password": "password",
    "email": "test",
    "telephone": "0123356",
    "canEditModule": false,
    "canEditCourse": false
  });
  const user2 = new User({
    "username": "Reuben",
    "password": "password",
    "email": "test",
    "telephone": "0123356",
    "canEditModule": false,
    "canEditCourse": false
  });
  const user3 = new User({
    "username": "Tom",
    "password": "password",
    "email": "test",
    "telephone": "0123356",
    "canEditModule": false,
    "canEditCourse": false
  });
  const user4 = new User({
    "username": "Test",
    "password": "password",
    "email": "test",
    "telephone": "0123356",
    "canEditModule": false,
    "canEditCourse": false
  });
  const user5 = new User({
    "username": "T",
    "password": "password",
    "email": "test",
    "telephone": "0123356",
    "canEditModule": false,
    "canEditCourse": false
  });

  user1.save(user1);
  user2.save(user2);
  user3.save(user3);
  user4.save(user4);
  user5.save(user5);
  const student = new Student({
    studentID: "SU123",
    userRef: user4
  });
  const student1 = new Student({
    studentID: "SU124",
    userRef: user5
  });
  student.save(student);
  student1.save(student1);
  const tutor1 = new Tutor({
    tutorID: "TU123",
    userRef: user1
  });
  const tutor2 = new Tutor({
    tutorID: "TU111",
    userRef: user2
  });

  tutor1.save(tutor1);
  tutor2.save(tutor2);

  const regitem1 = new RegisterItem({
    students: student,
    attended: true
  });
  const regitem2 = new RegisterItem({
    students: student1,
    attended: true
  });
  regitem1.save(regitem1);
  regitem2.save(regitem2);

  const academicadvisor = new Advisor({
    tutorID: "TU132",
    userRef: user3,
    students: [student]
  });
  academicadvisor.save(academicadvisor);
  const register = new Register({
    dateTime: Date.now(),
    attendanceList: [regitem1, regitem2]
  });

  register.save(register);

  const class1 = new Class({
    classID: "CL123",
    className: "Security",
    students: [student],
    tutorRef: tutor1,
    register: register
  });

  class1.save(class1);

  const module = new Module({
    moduleName: "SAD :(",
    moduleID: "MD123",
    students: student,
    moduleLeader: tutor1,
    classes: [class1],
    tutors: [tutor1, tutor2]
  });

  module.save(module);

  const course = new Course({
    courseName: "Software Engineering bENG",
    courseID: "SE123",
    students: [student],
    courseLeader: tutor2,
    modules: [module]
  });

  course.save(course);
}

//Connects to the db and confirms connection
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB");

    //createUsers(); // populate db.
}).catch(err => {
    console.log("error connecting to db");
    process.exit();
});

//sets the origin of CORS
var corsOptions = {
  origin: "http://localhost:8081"
};

// Sets the app to use the Routes for the api
require("./routes/user.routes")(app);
require("./routes/tutor.routes")(app);
require("./routes/student.routes")(app);
require("./routes/academicadvisor.routes")(app);
require("./routes/course.routes")(app);
require("./routes/module.routes")(app);
require("./routes/class.routes")(app);
require("./routes/register.routes")(app);
require('./routes/auth.routes')(app); 
require('./routes/security.routes')(app);
require('./routes/registeritem.routes')(app);


module.exports = app;


