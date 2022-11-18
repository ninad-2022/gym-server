const MembershipModel = require("../models/membership.model");

class MembershipCtrl {
  static createMembership(req, res) {
    const membership = req.body;
    console.log("Membership: ", req);
    if (!membership.title)
      return res.status(500).send({ message: "enter title" });

    new MembershipModel(membership)
      .save()
      .then((result) => {
        res.status(201).send({ message: "Membership Created", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Could not created", error: err });
      });
  } //createMem
  static updateMembership(req, res) {
    const membership = req.body;
    const { id: _id } = req.params;
    MembershipModel.findOneAndUpdate({ _id }, membership, { new: true })
      .then((result) => {
        res.status(200).send({ message: "Membership Updated", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Could not Updated", error: err });
      });
  } //updateMem

  static deleteMembership(req, res) {
    const { id: _id } = req.params;

    MembershipModel.deleteOne({ _id })
      .then((result) => {
        res.status(200).send({ message: "Membership Deleted", data: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "Could not Deleted", error: err });
      });
  } //deleteMem
  static getSingleMembership(req, res) {
    const { id: _id } = req.params;

    MembershipModel.findOne({ _id })
      .then((result) => {
        res.status(200).send({ message: "Membership Details", data: result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not get membership Details", error: err });
      });
  } //getSingleMem
  static getAllMembership(req, res) {
    MembershipModel.find()
      .then((result) => {
        res.status(200).send({ message: "Membership Details", data: result });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(404)
          .send({ message: "Could not get membership Details", error: err });
      });
  } //getAllMem
}
module.exports = MembershipCtrl;
