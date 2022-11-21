const router = require("express").Router(); //Router is middleware of express
const authorize = require("../../helpers/middlewares/authorize");

const {
  createContactUs,
  updateContactUs,
  deleteContactUs,
  getAllContactUs,
  getSingleContactUs,
} = require("../controllers/contactUs.controller");
router.post("/", createContactUs); //!createcard
router.put("/:id", authorize("superadmin", "admin"), updateContactUs); //!updatecard
router.delete("/:id", authorize("superadmin", "admin"), deleteContactUs);
router.get("/:id", authorize("superadmin", "admin"), getSingleContactUs);
router.get("/", authorize("superadmin", "admin"), getAllContactUs);

module.exports = router;
