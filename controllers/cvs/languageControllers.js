const asyncHandler = require("express-async-handler");
const Language = require("../../models/cvs/language");
const {
  validatecreateLanguage,
  validateupdateLanguage,
} = require("../../validation/cv/languageVaildate");

/**-----------------------------------------------
 * @desc    Create New language
 * @route  /api/cv/language/create
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.createLanguageCtrl = asyncHandler(async (req, res) => {
  const { error } = validatecreateLanguage(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const language = await Language.create({
    LanguageName: req.body.LanguageName,
    ProficiencyLevel: req.body.ProficiencyLevel,
  });

  res.status(201).json(language);
});
/**-----------------------------------------------
 * @desc    get All language
 * @route  /api/cv/language/index
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllLanguageCtrl = asyncHandler(async (req, res) => {
  const language = await Language.find();
  res.status(200).json(language);
});

/**-----------------------------------------------
 * @desc    Get single language view
 * @route   /api/cv/language/view/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSingleLanguageCtrl = asyncHandler(async (req, res) => {
  const language = await Language.findById(req.params.id);
  if (!language) {
    return res.status(404).json({ message: "language not found" });
  }
  res.status(200).json(language);
});

/**-----------------------------------------------
 * @desc    Update language
 * @route   /api/cv/language/update/:id
 * @method  PUT
 * @access  public
 ------------------------------------------------*/
module.exports.updateLanguageCtrl = asyncHandler(async (req, res) => {
  const { error } = validateupdateLanguage(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const language = await Language.findById(req.params.id);
  if (!language) {
    return res.status(404).json({ message: "language not found" });
  }
  const updateLanguage = await Language.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        LanguageName: req.body.LanguageName,
        ProficiencyLevel: req.body.ProficiencyLevel,
      },
    },
    { new: true }
  );

  res.status(200).json(updateLanguage);
});

/**-----------------------------------------------
 * @desc    Delete language
 * @route   /api/cv/language/delete/:id
 * @method  DELETE
 * @access  
 ------------------------------------------------*/
module.exports.deleteLanguageCtrl = asyncHandler(async (req, res) => {
  const language = await Language.findById(req.params.id);
  if (!language) {
    return res.status(404).json({ message: "language not found" });
  }

  await Language.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "language has been deleted successfully",
  });
});
