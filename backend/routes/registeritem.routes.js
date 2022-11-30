module.exports = app => {
    const registerItemController = require("../controllers/registerItem.controller");
    const studentController = require("../controllers/user.controller");
    const router = require("express").Router();

    router.get("/studentAttendanceData/:id", registerItemController.returnStudentAttendanceData);
    router.post("/test", studentController.createUser)

    app.use("/", router);
}
