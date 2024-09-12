const asyncHandler = require("express-async-handler");
const HonorAndaWard = require("../../models/cvs/honorAndaWard");
const {
  validatecreateHonorAndaWard,
  validateupdateHonorAndaWard,
} = require("../../validation/cv/honorAndaWardVaildate");

/**-----------------------------------------------
 * @desc    Create New honorAndaWard
 * @route  /api/cv/honorAndaWard/create
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.createHonorAndaWardCtrl = asyncHandler(async (req, res) => {
  const { error } = validatecreateHonorAndaWard(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const honorAndaWard = await HonorAndaWard.create({
    awardName: req.body.awardName,
    year: req.body.year,
    description: req.body.description,
    Issuer: req.body.Issuer,
  });

  res.status(201).json(honorAndaWard);
});
/**-----------------------------------------------
 * @desc    get All honorAndaWard
 * @route  /api/cv/honorAndaWard/index
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllHonorAndaWardCtrl = asyncHandler(async (req, res) => {
  const honorAndaWard = await HonorAndaWard.find();
  res.status(200).json(honorAndaWard);
});

/**-----------------------------------------------
 * @desc    Get single honorAndaWard view
 * @route   /api/cv/honorAndaWard/view/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSingleHonorAndaWardCtrl = asyncHandler(
  async (req, res) => {
    const honorAndaWard = await HonorAndaWard.findById(req.params.id);
    if (!honorAndaWard) {
      return res.status(404).json({ message: "honor And aWard not found" });
    }
    res.status(200).json(honorAndaWard);
  }
);

/**-----------------------------------------------
 * @desc    Update honorAndaWard
 * @route   /api/cv/honorAndaWard/update/:id
 * @method  PUT
 * @access  public
 ------------------------------------------------*/
module.exports.updatehonorAndaWardCtrl = asyncHandler(async (req, res) => {
  const { error } = validateupdateHonorAndaWard(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const honorAndaWard = await HonorAndaWard.findById(req.params.id);
  if (!honorAndaWard) {
    return res.status(404).json({ message: "honor And aWard not found" });
  }
  const updateHonorAndaWard = await HonorAndaWard.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        awardName: req.body.awardName,
        year: req.body.year,
        description: req.body.description,
        Issuer: req.body.Issuer,
      },
    },
    { new: true }
  );

  res.status(200).json(updateHonorAndaWard);
});

/**-----------------------------------------------
 * @desc    Delete honorAndaWard
 * @route   /api/cv/honorAndaWard/delete/:id
 * @method  DELETE
 * @access  
 ------------------------------------------------*/
module.exports.deleteHonorAndaWardCtrl = asyncHandler(async (req, res) => {
  const honorAndaWard = await HonorAndaWard.findById(req.params.id);
  if (!honorAndaWard) {
    return res.status(404).json({ message: "Honor And aWard not found" });
  }

  await HonorAndaWard.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "Honor And aWard has been deleted successfully",
  });
});
