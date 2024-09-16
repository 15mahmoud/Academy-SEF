const asyncHandler = require("express-async-handler");
const certificateModel = require("../../models/courses/certificateModel");
const ApiError = require('../../validation/apiError');



//@dec create certificate
//@route POST /api/certificates
//@access private
exports.createCertificate = asyncHandler(async (req, res) => {
  const { student_Id } = req.query;
  if (!student_Id) {
    return res.status(400).json({
      error: "Please provide student_Id",
    });
  }
  const certificate = {
    student_Id,
  };
  res.status(200).json({ data: certificate });
});

//@dec save certificate
//@route POST /api/certificates
//@access private
exports.saveCertificate = asyncHandler(async (req, res) => {
  const certificate = new certificateModel(req.body);
  await certificate.save()
  res.status(201).json({ data: certificate });
});


//@dec update certificate
//@route PUT /api/certificates
//@access private
exports.updateCertificate = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const certificate = await certificateModel.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true }
  );
  if (!certificate) {
    return next(new ApiError(`No certificate for this id ${id}`, 404));
  }
  res.status(200).json({ data: certificate });
});


