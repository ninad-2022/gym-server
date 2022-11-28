const _ = require("lodash");
const { encrypt } = require("../../helpers/encryption");
const UserModel = require("../models/user.model");
const fs = require("fs");
const { send } = require("process");

class UserCtrl {
  static pickUser(user) {
    return _.pick(user, [
      "_id",
      "name",
      "mobile",
      "email",
      "status",
      "gender",
      // "createdAt",
      "userId",
      "role",
    ]);
  }

  static createUser(req, res) {
    const user = req.body;
    //encript the password if available
    if (user.password) user.password = encrypt(user.password);

    //save the filename if available
    // if (req.files.avatar) {
    //   const ava = req?.files.avatar[0];
    //   user.avatar = `users-avatar/${ava?.filename}`;
    // }
    // if (req.files.idDoc) {
    //   const ava = req?.files.idDoc[0];
    //   user.idDoc = `users-id/${ava?.filename}`;
    // }

    new UserModel(user)
      .save()
      .then((result) => {
        res
          .status(201)
          .send({ message: "User Created", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ message: "User not Created", error: err });
      });
  } //createUser
  static updateUser(req, res) {
    const { id } = req.params;
    const user = req.body;

    if (user.password) user.password = encrypt(user.password);

    //save the filename if available

    if (req.files.avatar) {
      const ava = req?.files.avatar[0];
      user.avatar = `users-avatar/${ava?.filename}`;
    }
    if (req.files.idDoc) {
      const ava = req?.files.idDoc[0];
      user.idDoc = `users-id/${ava?.filename}`;
    }

    UserModel.findOneAndUpdate({ _id: id }, user, { new: true })
      .then((result) => {
        res
          .status(200)
          .send({ message: "User Updated", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        res.status(404).send({ message: "users not updated", error: err });
      });
  }

  static deleteUser(req, res) {
    const { id } = req.params;
    console.log("server id", id);

    UserModel.findOneAndDelete({ _id: id }, { status: 2 })
      .then((result) => {
        res
          .status(200)
          .send({ message: "User deleted", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "User not deleted", error: err });
      });
  } //deleteUser

  static fetchOneUser(req, res) {
    const { id } = req.params;

    UserModel.findOne({ _id: id })
      .then((result) => {
        res
          .status(200)
          .send({ message: "User Document ", data: UserCtrl.pickUser(result) });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "User not Available", error: err });
      });
  } //fetchOneUser

  static fetchAllUser(req, res) {
    const { role } = req.query;

    const filter = { $or: [{ status: 0 }, { status: 1 }] };
    if (role) filter.role = role;

    UserModel.find(filter)
      .then((result) => {
        res.status(200).send({
          message: "User List ",
          data: _.map(result, (user) => UserCtrl.pickUser(user)),
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "Users not Available", error: err });
      });
  } //fetchAllUser
  // static updateDeleteImages(req, res) {
  //   const { existingAvatar, existingIdDoc } = req.body;
  //   const { id } = req.params;
  //   const user = {};
  //   if (req.files.avatar) {
  //     // update new file
  //     const ava = req?.files.avatar[0];
  //     user.avatar = `users-avatar/${ava?.filename}`;
  //     // remove existing file
  //     fs.unlink(`uploads/${existingAvatar}`, () => {
  //       console.log("update deleted " + existingAvatar);
  //     });
  //   } else if (existingAvatar) {
  //     // remove existing file
  //     fs.unlink(`uploads/${existingAvatar}`, () => {
  //       console.log("deleted" + existingAvatar);
  //     });
  //     user.avatar = "";
  //   }

  //   if (req.files.idDoc) {
  //     // update new file
  //     const ava = req?.files.idDoc[0];
  //     user.idDoc = `users-id/${ava?.filename}`;
  //     // remove existing file
  //     fs.unlink(`uploads/${existingIdDoc}`, () => {
  //       console.log("update deleted " + existingIdDoc);
  //     });
  //   } else if (existingIdDoc) {
  //     // remove existing file
  //     fs.unlink(`uploads/${existingIdDoc}`, () => {
  //       console.log("deleted" + existingIdDoc);
  //     });
  //     user.idDoc = "";
  //   }
  //   UserModel.findOneAndUpdate({ _id: id }, user, { new: true }).then(
  //     (result) => {
  //       res
  //         .status(200)
  //         .send({ message: "Image Changed", data: UserCtrl.pickUser(result) });
  //       // .catch((err) => {
  //       //   console.log(err);
  //       //   res.status(404).send({ message: "Image not changed", error: err });
  //       // });
  //     } //updateDeleteimage
  //   );
  // } //updateDeleteImages

  static async userStatistic(req, res) {
    const { role = "customer" } = req.query;
    const inactive = await UserModel.countDocuments({ status: 0, role });
    const active = await UserModel.countDocuments({ status: 1, role });
    const deleted = await UserModel.countDocuments({ status: 2, role });

    res
      .status(200)
      .send({ message: `${role}details`, data: { active, inactive, deleted } });
  }
}

module.exports = UserCtrl;
