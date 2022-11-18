const { compareHash } = require("../../helpers/encryption");
const { createToken, verifyToken } = require("../../helpers/token");
const UserModel = require("../models/user.model");
const UserCtrl = require("../controllers/user.controllers");

class AuthCtrl {
  static userLogin(req, res) {
    const { email, password } = req.body;

    //first check weather the user email is available
    // status: 1;
    UserModel.findOne({ email: email })
      .then((result) => {
        if (!result) throw new Error("Invalid email");
        //user is available check password
        else if (compareHash(password, result.password)) {
          //password match
          //generate access and refresh token
          const accessToken = createToken(
            { _id: result._id, role: result.role },
            10 * 60
          );
          const refreshToken = createToken(
            { _id: result._id, role: result.role },
            25 * 60
          );

          // sending token data into response header
          res.set("x-access-token", accessToken);
          res.set("x-refresh-token", refreshToken);

          res
            .status(200)
            .send({ message: "Login sucess", data: UserCtrl.pickUser(result) });
        } else {
          //password not match
          res.status(404).send({ message: "Invalid pasword" });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(404).send({ message: "Invalid email or User is disabled" });
      });
  }

  // call this api for token verification
  static validateToken(req, res) {
    const token = req.headers.authorization;

    //varify token
    const payload = verifyToken(token);

    if (payload?._id) {
      //token is valid
      const { _id } = payload;

      UserModel.findOne({ _id })
        .then((result) => {
          res
            .status(200)
            .send({ data: UserCtrl.pickUser(result), message: "valid token" });
        })
        .catch((err) => {
          console.log(err);
          throw new Error("Invalid token");
        });
    } else {
      //invalid token
      res.status(403).send({ message: "Invalid token", error: null });
    }
  }

  static refreshToken(req, res) {
    const { refresh } = req.body;

    const payload = verifyToken(refresh);

    if (payload?._id) {
      // refresh token is valid
      const accessT = createToken(
        { _id: payload?._id, role: payload?.role },
        60 * 10
      );
      const refreshT = createToken(
        { _id: payload?._id, role: payload?.role },
        60 * 25
      );

      res
        .status(200)
        .send({ data: { accessT, refreshT }, message: "token created" });
    } else {
      // refresh token is invalid
      res.status(403).send({ message: "Session Expired", error: null });
    }
  }
}

module.exports = AuthCtrl;
