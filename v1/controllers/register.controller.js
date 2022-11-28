const registerModel = require("../models/register.model");

class registerCtrl {
  static createRegister(req, res) {
    const register = req.body;
    console.log("ContactUs: ", req);

    new registerModel(register)
      .save()
      .then((result) => {
        res.status(201).send({ message: "Register Created", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Could not created", error: err });
      });
  } //createReg
  static deleteRegister(req, res) {
    const { id: _id } = req.params;

    registerModel
      .deleteOne({ _id })
      .then((result) => {
        res.status(200).send({ message: "Register Deleted", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Could not Deleted", error: err });
      });
  } //deleteReg

  static getAllRegister(req, res) {
    registerModel
      .find()
      .then((result) => {
        res.status(200).send({ message: "Register Details", data: result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not get register Details", error: err });
      });
  } //getAllReg
}
module.exports = registerCtrl;
