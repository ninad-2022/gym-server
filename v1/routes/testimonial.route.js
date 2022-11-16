const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
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
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  fetchAllTestimonial,
  fetchOneTestimonial,
} = require("./testimonial.controller");

// createTest
router.post("/", createTestimonial);

// updateTest
router.put("/:id", updateTestimonial);

// deleteTest
router.delete("/:id", deleteTestimonial);

// fetchOneTest
router.get("/:id", fetchOneTestimonial);

// fetchAllTest
router.get("/", fetchAllTestimonial);

module.exports = router;
