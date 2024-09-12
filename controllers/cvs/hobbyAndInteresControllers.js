const asyncHandler = require("express-async-handler");
const HobbyAndInterest = require("../../models/cvs/hobbyAndInterest");
const {
  validatecreateHobbyAndInterest,
  validateupdateHobbyAndInterest,
} = require("../../validation/cv/hobbyAndInterestVaildate");

/**-----------------------------------------------
 * @desc    Create New hobbyAndInterest
 * @route  /api/cv/hobbyAndInterest/create
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.createHobbyAndInterestCtrl = asyncHandler(async (req, res) => {
  const { error } = validatecreateHobbyAndInterest(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const hobbyAndInterest = await HobbyAndInterest.create({
    hobbiesName: req.body.hobbiesName,
    description: req.body.description,
  });

  res.status(201).json(hobbyAndInterest);
});
/**-----------------------------------------------
 * @desc    get All hobbyAndInterest
 * @route  /api/cv/hobbyAndInterest/index
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllHobbyAndInterestCtrl = asyncHandler(async (req, res) => {
  const hobbyAndInterest = await HobbyAndInterest.find();
  res.status(200).json(hobbyAndInterest);
});

/**-----------------------------------------------
 * @desc    Get single hobbyAndInterest view
 * @route   /api/cv/hobbyAndInterest/view/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSingleHobbyAndInterestCtrl = asyncHandler(
  async (req, res) => {
    const hobbyAndInterest = await HobbyAndInterest.findById(req.params.id);
    if (!hobbyAndInterest) {
      return res.status(404).json({ message: "hobbyAndInterest not found" });
    }
    res.status(200).json(hobbyAndInterest);
  }
);

/**-----------------------------------------------
 * @desc    Update hobbyAndInterest
 * @route   /api/cv/hobbyAndInterest/update/:id
 * @method  PUT
 * @access  public
 ------------------------------------------------*/
module.exports.updateHobbyAndInterestCtrl = asyncHandler(async (req, res) => {
  const { error } = validateupdateHobbyAndInterest(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const hobbyAndInterest = await HobbyAndInterest.findById(req.params.id);
  if (!hobbyAndInterest) {
    return res.status(404).json({ message: "hobby And Interest not found" });
  }
  const updateHobbyAndInterest = await HobbyAndInterest.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        hobbiesName: req.body.hobbiesName,
        description: req.body.description,
      },
    },
    { new: true }
  );

  res.status(200).json(updateHobbyAndInterest);
});

/**-----------------------------------------------
 * @desc    Delete hobbyAndInterest
 * @route   /api/cv/hobbyAndInterest/delete/:id
 * @method  DELETE
 * @access  
 ------------------------------------------------*/
module.exports.deletehobbyAndInterestCtrl = asyncHandler(async (req, res) => {
  const hobbyAndInterest = await HobbyAndInterest.findById(req.params.id);
  if (!hobbyAndInterest) {
    return res.status(404).json({ message: "hobbyAndInterest not found" });
  }

  await HobbyAndInterest.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "hobby And Interest has been deleted successfully",
  });
});
