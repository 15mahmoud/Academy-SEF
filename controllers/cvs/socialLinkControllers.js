const asyncHandler = require("express-async-handler");
const SocialLink = require("../../models/cvs/socialLink");
const {
  validatecreateSocialLink,
  validateupdateSocialLink,
} = require("../../validation/cv/socialLinkVaildate");

/**-----------------------------------------------
 * @desc    Create New socialLink
 * @route  /api/cv/socialLink/create
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.createSocialLinkCtrl = asyncHandler(async (req, res) => {
  const { error } = validatecreateSocialLink(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const link = await Link.create({
    name: req.body.name,
    link: req.body.link,
    icon: req.body.icon,
  });

  res.status(201).json(link);
});
/**-----------------------------------------------
 * @desc    get All socialLink
 * @route  /api/cv/socialLink/index
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllSocialLinkCtrl = asyncHandler(async (req, res) => {
  const socialLink = await SocialLink.find();
  res.status(200).json(link);
});

/**-----------------------------------------------
 * @desc    Get single link view
 * @route   /api/cv/link/view/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSingleSocialLinkCtrl = asyncHandler(async (req, res) => {
  const socialLink = await SocialLink.findById(req.params.id);
  if (!socialLink) {
    return res.status(404).json({ message: "Social Link not found" });
  }
  res.status(200).json(link);
});

/**-----------------------------------------------
 * @desc    Update SocialLink
 * @route   /api/cv/SocialLink/update/:id
 * @method  PUT
 * @access  public
 ------------------------------------------------*/
module.exports.updateSocialLinkCtrl = asyncHandler(async (req, res) => {
  const { error } = validateupdateSocialLink(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const socialLink = await SocialLink.findById(req.params.id);
  if (!link) {
    return res.status(404).json({ message: "linknot found" });
  }
  const updateSocialLink = await SocialLink.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        name: req.body.name,
        link: req.body.link,
        icon: req.body.icon,
      },
    },
    { new: true }
  );

  res.status(200).json(updateSocialLink);
});

/**-----------------------------------------------
 * @desc    Delete socialLink
 * @route   /api/cv/socialLink/delete/:id
 * @method  DELETE
 * @access  
 ------------------------------------------------*/
module.exports.deleteSocialLinkCtrl = asyncHandler(async (req, res) => {
  const socialLink = await SocialLink.findById(req.params.id);
  if (!socialLink) {
    return res.status(404).json({ message: "link not found" });
  }

  await SocialLink.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "social Link has been deleted successfully",
  });
});
