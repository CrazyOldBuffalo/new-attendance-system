module.exports = app => {
    var academicAdvisorController = require("../controllers/academicadvisor.controller")
    var router = require("express").Router();

    router.post("/advisor/create", academicAdvisorController.createAdvisor);
    router.get("/advisor/", academicAdvisorController.findAllAdvisors);
    router.get("/advisor/:id", academicAdvisorController.findOneAdvisor);
    router.get("/advisor/search/:id", academicAdvisorController.findAdvisors);
    router.put("/Advisor/Update/:id", academicAdvisorController.updateAdvisorUser);
    router.put("/Advisor/Update/Students/:id", academicAdvisorController.updateAdvisorStudentsList);
    router.delete("/Advisor/Delete/:id", academicAdvisorController.deleteAdvisor);

    app.use("/", router);
}