const contactUsModel = require("../models/contactUs");

class ContactUsCtrl {
  static createContactUs(req, res) {
    const contactus = req.body;
    console.log("ContactUs: ", req);

    new contactUsModel(contactus)
      .save()
      .then((result) => {
        res.status(201).send({ message: "ContactUs Created", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Could not created", error: err });
      });
  } //createCon
  static updateContactUs(req, res) {
    const contactus = req.body;
    const { id: _id } = req.params;
    contactUsModel
      .findOneAndUpdate({ _id }, contactus, { new: true })
      .then((result) => {
        res.status(200).send({ message: "ContactUs Updated", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Could not Updated", error: err });
      });
  } //updateCon

  static deleteContactUs(req, res) {
    const { id: _id } = req.params;

    contactUsModel
      .deleteOne({ _id })
      .then((result) => {
        res.status(200).send({ message: "ContactUs Deleted", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Could not Deleted", error: err });
      });
  } //deleteCon
  static getSingleContactUs(req, res) {
    const { id: _id } = req.params;

    contactUsModel
      .findOne({ _id })
      .then((result) => {
        res.status(200).send({ message: "ContactUs Details", data: result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not get contactus Details", error: err });
      });
  } //getSingleCon
  static getAllContactUs(req, res) {
    contactUsModel
      .find()
      .then((result) => {
        res.status(200).send({ message: "ContactUs Details", data: result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not get contactus Details", error: err });
      });
  } //getAllCon
}
module.exports = ContactUsCtrl;
