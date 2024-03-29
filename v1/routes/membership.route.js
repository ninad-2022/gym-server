const router = require("express").Router(); //Router is middleware of express
const authorize = require("../../helpers/middlewares/authorize");

const {
  createMembership,
  deleteMembership,
  getAllMembership,
  getSingleMembership,
  updateMembership,
} = require("../controllers/membership.controller");
router.post("/", authorize("superadmin", "admin"), createMembership);
router.put("/:id", authorize("superadmin", "admin"), updateMembership);
router.delete("/:id", authorize("superadmin", "admin"), deleteMembership);
router.get("/:id", authorize("superadmin", "admin"), getSingleMembership);
router.get("/", getAllMembership);

module.exports = router;
