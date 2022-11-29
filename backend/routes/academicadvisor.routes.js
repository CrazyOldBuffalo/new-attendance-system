module.exports = app => {
    var academicAdvisorController = require("../controllers/academicadvisor.controller")
    var router = require("express").Router();

    router.post("/advisor/create", academicAdvisorController.createAdvisor);
    router.get("/advisor/", academicAdvisorController.findAllAdvisors);
    router.get("/advisor/:id", academicAdvisorController.findOneAdvisor);
    router.get("/advisor/search/:id", academicAdvisorController.findAdvisors);
    router.put("/advisor/update/:id", academicAdvisorController.updateAdvisorUser);
    router.put("/advisor/update/students/:id", academicAdvisorController.updateAdvisorStudentsList);
    router.delete("/advisor/delete/:id", academicAdvisorController.deleteAdvisor);
    router.get("/advisor/attendance/:id", academicAdvisorController.generateAttendanceIndicatior);

    app.use("/", router);
}