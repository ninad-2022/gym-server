const TestimonialModel = require("./testimonial.model");

class TestimonialCtrl {
  // create testimonial
  static createTestimonial(req, res) {
    const testimonial = req.body;

    console.log("req.file", req.file);
    // if (req.file) testimonial.avatar = req.file.filename;

    new TestimonialModel(testimonial)
      .save()
      .then((result) => {
        res.status(201).send({ message: "testimonial created", data: result });
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: "testimonial not created", error: err });
      });
  }

  // update one testimonial
  static updateTestimonial(req, res) {
    const { id } = req.params;
    const testimonial = req.body;

    TestimonialModel.findOneAndUpdate({ _id: id }, testimonial, {
      new: true,
    })
      .then((result) => {
        res.status(200).send({ message: "testimonial updated", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "not updated", data: err });
      });
  }

  //   delete testimonial
  static deleteTestimonial(req, res) {
    const { id } = req.params;

    TestimonialModel.findByIdAndDelete({ _id: id })
      .then((result) => {
        res.status(200).send({ message: "Testimonial deleted", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "User not deleted", error: err });
      });
  }

  // fetch on testimonial
  static fetchOneTestimonial(req, res) {
    const { id } = req.params;

    TestimonialModel.find()
      .then((result) => {
        res.status(200).send({ message: "Testimonial Profile", data: result });
      })
      .catch((err) => {
        res.status(404).send({ message: "Testimonial not available" });
      });
  }

  // fetch all users
  static fetchAllTestimonial(req, res) {
    TestimonialModel.find()
      .then((result) => {
        res.status(200).send({ message: "Testimonial List", data: result });
      })
      .catch((err) => {
        res
          .status(404)
          .send({ message: "Testimonials not available", error: err });
      });
  }
}

module.exports = TestimonialCtrl;
