const router = require("express").Router(); //Router is middleware of express
const multer = require("multer");
// const authorize = require("../../helpers/middlewares/authorize");
const path = require("path");
const { validateUser } = require("../../helpers/middlewares/user.validation");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname == "avatar") cb(null, "uploads/users-avatar");
    else if (file.fieldname == "idDoc") cb(null, "uploads/users-id");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
const {
  createUser,
  updateUser,
  deleteUser,
  fetchAllUser,
  fetchOneUser,
  updateDeleteImages,
  userStatistic,
} = require("../controllers/user.controllers");

router.post(
  "/",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "idDoc", maxCount: 1 },
  ]),
  validateUser,
  createUser
); //!createuser
router.put(
  "/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "idDoc", maxCount: 1 },
  ]),
  validateUser,
  updateUser
); //!updateuser
router.delete("/:id", deleteUser);
router.get("/statistic", userStatistic);
router.get("/:id", fetchOneUser);
router.get("/", fetchAllUser);
router.put(
  "/image/:id",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "idDoc", maxCount: 1 },
  ]),
  validateUser

  // updateDeleteImages
);

module.exports = router;
