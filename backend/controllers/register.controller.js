// Display the register for that class
// Edit, Create and Delete register item
const db = require("../models");
const errors = require("./utils/errors.controller");
const Register = db.registers;
const classController = require("./class.controller");
const studentController = require("./student.controller");
const registerItemController = require("./registerItem.controller");


exports.createRegister = (req, res) => {
    const register = new Register({
        dateTime: req.body.dateTime,
    });

    register.save(register).then(console.log("register created"));
    return register;
};

exports.findRegister = (req, res) => {
    const parsedDatetime = req.params.id;
    const regexDatetime = new RegExp(parsedDatetime, "i");
    Register.find({dateTime: {$regex: regexDatetime}}).then( data => {res.send(data);});
};

exports.findOneRegister = (req, res) => {
    Register.findOne({dateTime: req.params.id}).populate({path: "attendanceList", model: "registerItem", populate: {path: "students", model: "student"}})
    .then( data => {res.send(data);});
}

exports.getAll = (req, res) => {
    Register.find().then(data => {res.send(data); } ); 
};

exports.addRegisterItem = async(req, res) => {
    const classdata = await classController.extendsClassFind(req, res);
    const register = await Register.findById(classdata.register._id);
    const student = await studentController.extendsStudentFind(req, res);
    if(!student) {return err => errors.error404(err, res)}
    else {
        const studentlist = await classController.searchStudents(req, res);
        if(!studentlist) {return err => errors.error404(err, res)}
        else {
            const registerItem = await registerItemController.createRegisterItem(req, res);
            Register.findByIdAndUpdate(register._id, {$push: {"attendanceList": registerItem}})
            .then(res.send("register: " + register._id + "has been updated with registerItem: " + registerItem._Id))
            .catch(err => errors.error500(err,res));
        };
    };
};

exports.deleteRegisterItem = async(req,res) => {
    const classdata = await classController.extendsClassFind(req, res);
    const register = await Register.findById(classdata.register._id);
    const student = await studentController.extendsStudentFind(req, res);

    if(!student) {return err => errors.error404(err, res)}
    else {
        const studentlist = await classController.searchStudents(req, res);
        if(!studentlist) {return err => errors.error404(err, res)}
        else {
            const objectid = studentlist.register.attendanceList.find(element => student);
            registerItemController.deleteRegisterItem(objectid, res);
            Register.findByIdAndUpdate(register._id, {$pull: {attendanceList: objectid._id}})
            .then(res.send({message: "registerItem: " + objectid._id + "Deleted"}))
            .catch(err => errors.error500(err,res));
        };
    };
};

exports.editRegisterItem = async (req, res) =>{
    const classdata = await classController.extendsClassFind(req, res);
    const register = await Register.findById(classdata.register._id);
    const student = await studentController.extendsStudentFind(req, res);

    if(!student) {return err => errors.error404(err, res)}
    else {
        const studentlist = await classController.searchStudents(req, res);
        if(!studentlist) {return err => errors.error404(err, res)}
        else {
            const objectid = studentlist.register.attendanceList.find(element => student);
            registerItemController.updateRegisterItem(objectid, req, res);
        };
    };
}