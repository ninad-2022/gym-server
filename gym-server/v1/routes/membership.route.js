const router = require("express").Router(); //Router is middleware of express
const multer = require("multer");

const {
  createMembership,
  deleteMembership,
  getAllMembership,
  getSingleMembership,
  updateMembership,
} = require("../controllers/membership.controller");
router.post("/", createMembership); //!createcard
router.put("/:id", updateMembership); //!updatecard
router.delete("/:id", deleteMembership);
router.get("/:id", getSingleMembership);
router.get("/", getAllMembership);

module.exports = router;
