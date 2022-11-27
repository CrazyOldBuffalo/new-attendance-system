
module.exports = app => {
    const registerController = require("../controllers/register.controller");
    const router = require("express").Router();

    router.post("/Register/Add/:id", registerController.addRegisterItem);
    router.delete("/Register/DeleteItem/:id", registerController.deleteRegisterItem);
    router.get("/Register/getAll/", registerController.getAll);
    router.get("Register/Find/:id", registerController.findRegister);
    router.put("/Register/Update/:id", registerController.editRegisterItem);
    router.get("/Register/FindOne/:id", registerController.findOneRegister);

    app.use("/", router);
}