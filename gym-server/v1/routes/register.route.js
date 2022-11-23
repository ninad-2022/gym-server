const router = require("express").Router(); //Router is middleware of express
const authorize = require("../../helpers/middlewares/authorize");

const {
  createRegister,
  deleteRegister,
  getAllRegister,
} = require("../controllers/register.controller");
router.post("/", createRegister); //!createcard
router.delete("/:id", authorize("superadmin", "admin"), deleteRegister);
router.get("/", authorize("superadmin", "admin"), getAllRegister);

module.exports = router;
