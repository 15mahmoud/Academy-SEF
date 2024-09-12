const asyncHandler = require("express-async-handler");
const Connction = require("../../models/cvs/connction");
const {
  validatecreateConnction,
  validateupdateConnction,
} = require("../../validation/cv/connctionVaildate");

/**-----------------------------------------------
 * @desc    Create New connction
 * @route  /api/cv/connction/create
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.createConnctionCtrl = asyncHandler(async (req, res) => {
  const { error } = validatecreateConnction(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const connction = await Connction.create({
    websiteName: req.body.websiteName,
    phoneNumer: req.body.phoneNumer,
    landlinePhone: req.body.landlinePhone,
    email: req.body.email,
    whatsapp: req.body.whatsapp,
    landlinePhone: req.body.linkedin,
  });

  res.status(201).json(connction);
});
/**-----------------------------------------------
 * @desc    get All connction
 * @route  /api/cv/connction/index
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllConnctionCtrl = asyncHandler(async (req, res) => {
  const connction = await Connction.find();
  res.status(200).json(connction);
});

/**-----------------------------------------------
 * @desc    Get single connction view
 * @route   /api/cv/connction/view/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSingleConnctionCtrl = asyncHandler(async (req, res) => {
  const connction = await Connction.findById(req.params.id);
  if (!connction) {
    return res.status(404).json({ message: " connction not found" });
  }
  res.status(200).json(connction);
});

/**-----------------------------------------------
 * @desc    Update connction
 * @route   /api/cv/connction/update/:id
 * @method  PUT
 * @access  public
 ------------------------------------------------*/
module.exports.updateConnctionCtrl = asyncHandler(async (req, res) => {
  const { error } = validateupdateConnction(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const connction = await Connction.findById(req.params.id);
  if (!connction) {
    return res.status(404).json({ message: "connction not found" });
  }
  const updateConnction = await Connction.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        websiteName: req.body.websiteName,
        phoneNumer: req.body.phoneNumer,
        landlinePhone: req.body.landlinePhone,
        email: req.body.email,
        whatsapp: req.body.whatsapp,
        landlinePhone: req.body.linkedin,
      },
    },
    { new: true }
  );

  res.status(200).json(updateConnction);
});

/**-----------------------------------------------
 * @desc    Delete connction
 * @route   /api/cv/connction/delete/:id
 * @method  DELETE
 * @access  
 ------------------------------------------------*/
module.exports.deleteConnctionCtrl = asyncHandler(async (req, res) => {
  const connction = await Connction.findById(req.params.id);
  if (!connction) {
    return res.status(404).json({ message: "connction not found" });
  }

  await Connction.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "connction  has been deleted successfully",
  });
});
