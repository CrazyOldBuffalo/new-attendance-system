module.exports = app => {
    var studentController = require('../controllers/student.controller');
    var router = require("express").Router();

    router.post("/student/", studentController.createStudent);
    router.get("/student/", studentController.findAllStudents);
    router.get("/student/find/:id", studentController.findOneStudent);
    router.put("/student/update/:id", studentController.updateStudentUser);
    router.put("/student/update/advisor/:id", studentController.updateStudentAdvisor);
    router.delete("/student/delete/:id", studentController.deleteStudent);
    app.use("/", router);
}

