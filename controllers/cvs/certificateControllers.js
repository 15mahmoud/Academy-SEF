const asyncHandler = require("express-async-handler");
const Certificate = require("../../models/cvs/certificate");
const {
  validatecreateCertificate,validateupdateCertificate
} = require("../../validation/cv/certificateVaildate");

/**-----------------------------------------------
 * @desc    Create New certificate
 * @route  /api/cv/certificate/create
 * @method  POST
 * @access  public
 ------------------------------------------------*/

module.exports.createCertificateCtrl = asyncHandler(async (req, res) => {
  const { error } = validatecreateCertificate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const certificate = await Certificate.create({
    name: req.body.name,
    IssuingOrganization: req.body.IssuingOrganization,
    IssueDate: req.body.IssueDate,
    
  });
  res.status(201).json(certificate);
});

/**-----------------------------------------------
 * @desc    get All certificate
 * @route  /api/cv/certificate/index
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllCertificateCtrl = asyncHandler(async (req, res) => {
  const certificate = await Certificate.find();
  res.status(200).json(certificate);
});

/**-----------------------------------------------
 * @desc    Get single certificate view
 * @route   /api/cv/certificate/view/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSingleCertificateCtrl = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);
  if (!certificate) {
    return res.status(404).json({ message: "certificate not found" });
  }
  res.status(200).json(certificate);
});

/**-----------------------------------------------
 * @desc    Update certificate
 * @route   /api/cv/certificate/update/:id
 * @method  PUT
 * @access  public
 ------------------------------------------------*/
module.exports.updateCertificateCtrl = asyncHandler(async (req, res) => {
  const { error } = validateupdateCertificate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const certificate = await Certificate.findById(req.params.id);
  if (!certificate) {
    return res.status(404).json({ message: "certificate not found" });
  }
  const updateCertificate = await Certificate.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        IssuingOrganization: req.body.IssuingOrganization,
        IssueDate: req.body.IssueDate,
      },
    },
    { new: true }
  );

  res.status(200).json(updateCertificate);
});

/**-----------------------------------------------
 * @desc    Delete certificate
 * @route   /api/cv/certificate/delete/:id
 * @method  DELETE
 * @access  
 ------------------------------------------------*/
module.exports.deleteCertificateCtrl = asyncHandler(async (req, res) => {
  const certificate = await Certificate.findById(req.params.id);
  if (!certificate) {
    return res.status(404).json({ message: "certificate not found" });
  }

  await Certificate.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "certificate has been deleted successfully",
  });
});
