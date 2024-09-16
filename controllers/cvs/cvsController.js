// const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Cv = require("../../models/cvs/cv");
const Certificate = require("../../models/cvs/certificate");
const Connction = require("../../models/cvs/connction");
const Education = require("../../models/cvs/education");
const Experience = require("../../models/cvs/experience");
const Template = require("../../models/cvs/template");
const HobbyAndInterest = require("../../models/cvs/hobbyAndInterest");
const HonorAndaWard = require("../../models/cvs/honorAndaWard");
const MainInfo = require("../../models/cvs/mainInfo");
const Skill = require("../../models/cvs/skill");
const SocialLink = require("../../models/cvs/socialLink");
// const {
//   validatecreateCertificate,
//   validateupdateCertificate,
// } = require("../../validation/cv/certificateVaildate");
const {
  validatecreateCv,
} = require("../../validation/cv/cvVaildate");

//const countries = Country.get({});
const countries = ["egpt", "yemen"];
const sections = { 0: "Main Info", 1: "Summary" };

// create CV

/**-----------------------------------------------
 * @desc    Create New cv
 * @route  /api/cv/create
 * @method  GET
 * @access  Registered users
 ------------------------------------------------*/

module.exports.createCV = asyncHandler(async (req, res) => {
  const { code, Summary } = req.body;

  const data = [countries, sections, code, Summary];
  res.status(200).json(data);
});

/**-----------------------------------------------
 * @desc    Store New cv
 * @route  /api/cv/saveCv
 * @method  POST
 * @access  Registered users
 ------------------------------------------------*/

module.exports.saveCvCtrl = asyncHandler(async (req, res) => {
  const { error } = validatecreateCv(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  
  try {
    const newCV = await Cv.create({
      code: req.body.code,
      // createdBy: req.user._id
    });

    if (!newCV) {
      return res.status(500).json({ message: "cv creation failed" });
    }

    const redirectUrl = `/api/cv/edit/${newCV._id}/2`;

    res.status(201).json({
      message: "cv created successfully",
      cv: newCV,
      redirectUrl: redirectUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
/**-----------------------------------------------
 * @desc    Store  template
 * @route  /api/cv/saveTemplate
 * @method  POST
 * @access  Registered users
 ------------------------------------------------*/
module.exports.saveTemplate = asyncHandler(async (req, res) => {
  try {
    const newTemplate = await Template.create({
      name: req.body.name,
      url: req.body.url,
      status: req.body.status,
      createdBy: req.body._id,
      cv_id: req.body.cv_id,
    });

    if (!newTemplate) {
      return res.status(500).json({ message: "Template creation failed" });
    }

    const redirectUrl = `/api/cv/edit/${newTemplate.cv_id}/1`;

    res.status(201).json({
      message: "Template created successfully",
      Template: newTemplate,
      redirectUrl: redirectUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**-----------------------------------------------
 * @desc    Store  MainInfo
 * @route  /api/cv/saveMainInfo
 * @method  POST
 * @access  Registered users
 ------------------------------------------------*/

module.exports.saveMainInfo = asyncHandler(async (req, res) => {
  try {
    const newMainInfo = await MainInfo.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      jobTitle: req.body.jobTitle,
      email: req.body.email,
      city: req.body.city,
      phoneNumber: req.body.phoneNumber,
      profileImage: req.body.profileImage,
      createdBy: req.body._id,
      // createdBy: req.user._id,
      cv_id: req.body.cv_id,
    });

    if (!newMainInfo) {
      return res.status(500).json({ message: "MainInfo creation failed" });
    }

    const redirectUrl = `/api/cv/edit/${newMainInfo.cv_id}/2`;

    res.status(201).json({
      message: "MainInfo created successfully",
      MainInfo: newMainInfo,
      redirectUrl: redirectUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
/**-----------------------------------------------
 * @desc    Store New saveConnction
 * @route  /api/cv/saveConnction
 * @method  POST
 * @access  Registered users
 ------------------------------------------------*/

module.exports.saveConnction = asyncHandler(async (req, res) => {
  try {
    const newConnction = await Connction.create({
      websiteName: req.body.websiteName,
      phoneNumer: req.body.phoneNumer,
      landlinePhone: req.body.landlinePhone,
      email: req.body.email,
      whatsapp: req.body.whatsapp,
      landlinePhone: req.body.linkedin,
      createdBy: req.body._id,
      // createdBy: req.user._id,
      cv_id: req.body.cv_id,
    });

    if (!newConnction) {
      return res.status(500).json({ message: "connction creation failed" });
    }

    const redirectUrl = `/api/cv/edit/${newConnction.cv_id}/3`;

    res.status(201).json({
      message: "connction created successfully",
      Connction: newConnction,
      redirectUrl: redirectUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
/**-----------------------------------------------
 * @desc    save  bout
 * @route   /api/cv/save/about/:id/
 * @method  PUT
 * @access  public
 ------------------------------------------------*/

module.exports.saveSummary = asyncHandler(async (req, res) => {
  try {
    const updatedCv = await Cv.findByIdAndUpdate(
      req.params.id,
      {
        summary: req.body.summary,
        //  createdBy: req.user._id
      },
      { new: true }
    );

    if (!updatedCv) {
      return res.status(404).json({ message: "CV not found" });
    }

    res.status(200).json({
      message: "About section saved successfully",
      cv: updatedCv,
      redirectUrl: `/api/cv/edit/${updatedCv._id}/4`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**-----------------------------------------------
 * @desc    Store  skill
 * @route  /api/cv/saveSkill
 * @method  POST
 * @access  Registered users
 ------------------------------------------------*/
module.exports.saveSkill = asyncHandler(async (req, res) => {
  try {
    const newSkill = await Skill.create({
      skillName: req.body.skillName,
      subSkill: req.body.SubSkill,
      skillLevel: req.body.skillLevel,
      createdBy: req.body._id,
      // createdBy: req.user._id,
      cv_id: req.body.cv_id,
    });

    if (!newSkill) {
      return res.status(500).json({ message: "Skill creation failed" });
    }

    const redirectUrl = `/api/cv/edit/${newSkill.cv_id}/5`;

    res.status(201).json({
      message: "MainInfo created successfully",
      Skill: newSkill,
      redirectUrl: redirectUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
/**-----------------------------------------------
 * @desc    Store New saveExperience
 * @route  /api/cv/saveExperience
 * @method  POST
 * @access  Registered users
 ------------------------------------------------*/

module.exports.saveExperience = asyncHandler(async (req, res) => {
  try {
    const newExperience = await Experience.create({
      CompanyName: req.body.CompanyName,
      description: req.body.description,
      position: req.body.position,
      timePeriod: {
        from: req.body.timePeriod.from,
        to: req.body.timePeriod.to,
      },
      CompanyLogo: req.body.CompanyLogo,
      createdBy: req.body._id,
      // createdBy: req.user._id,
      cv_id: req.body.cv_id,
    });

    if (!newExperience) {
      return res.status(500).json({ message: "Experience creation failed" });
    }

    const redirectUrl = `/api/cv/edit/${newExperience.cv_id}/6`;

    res.status(201).json({
      message: "Experience created successfully",
      Experience: newExperience,
      redirectUrl: redirectUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
/**-----------------------------------------------
 * @desc    Store  Education
 * @route  /api/cv/saveEducation
 * @method  POST
 * @access  Registered users
 ------------------------------------------------*/

module.exports.saveEducation = asyncHandler(async (req, res) => {
  try {
    const newEducation = await Education.create({
      organizationName: req.body.organizationName,
      university: req.body.university,
      degree: req.body.degree,
      timePeriod: {
        from: req.body.timePeriod.from,
        to: req.body.timePeriod.to,
      },
      description: req.body.description,
      createdBy: req.body._id,
      // createdBy: req.user._id,
      cv_id: req.body.cv_id,
    });

    if (!newEducation) {
      return res.status(500).json({ message: "Education creation failed" });
    }

    const redirectUrl = `/api/cv/edit/${newEducation.cv_id}/7`;

    res.status(201).json({
      message: "Education created successfully",
      Education: newEducation,
      redirectUrl: redirectUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
/**-----------------------------------------------
 * @desc    Store New saveHonorAndaWard
 * @route  /api/cv/saveHonorAndaWard
 * @method  POST
 * @access  Registered users
 ------------------------------------------------*/

module.exports.saveHonorAndaWard = asyncHandler(async (req, res) => {
  try {
    const newEducation = await Education.create({
      organizationName: req.body.organizationName,
      university: req.body.university,
      degree: req.body.degree,
      timePeriod: {
        from: req.body.timePeriod.from,
        to: req.body.timePeriod.to,
      },
      description: req.body.description,
      createdBy: req.body._id,
      // createdBy: req.user._id,
      cv_id: req.body.cv_id,
    });

    if (!newEducation) {
      return res.status(500).json({ message: "Education creation failed" });
    }

    const redirectUrl = `/api/cv/edit/${newEducation.cv_id}/8`;

    res.status(201).json({
      message: "Education created successfully",
      Education: newEducation,
      redirectUrl: redirectUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**-----------------------------------------------
 * @desc    Store New saveHonorAndaWard
 * @route  /api/cv/saveHonorAndaWard
 * @method  POST
 * @access  Registered users
 ------------------------------------------------*/

module.exports.saveHonorAndaWard = asyncHandler(async (req, res) => {
  try {
    const newHonorAndaWard = await HonorAndaWard.create({
      awardName: req.body.awardName,
      year: req.body.year,
      description: req.body.description,
      Issuer: req.body.Issuer,
      createdBy: req.body._id,
      // createdBy: req.user._id,
      cv_id: req.body.cv_id,
    });

    if (!newHonorAndaWard) {
      return res.status(500).json({ message: "HonorAndaWard creation failed" });
    }

    const redirectUrl = `/api/cv/edit/${newHonorAndaWard.cv_id}/9`;

    res.status(201).json({
      message: "HonorAndaWard created successfully",
      HonorAndaWard: newHonorAndaWard,
      redirectUrl: redirectUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
/**-----------------------------------------------
 * @desc    Store New saveHobbyAndInterest
 * @route  /api/cv/saveHobbyAndInterest
 * @method  POST
 * @access  Registered users
 ------------------------------------------------*/

module.exports.saveHobbyAndInterest = asyncHandler(async (req, res) => {
  try {
    const newHobbyAndInterest = await HobbyAndInterest.create({
      hobbiesName: req.body.hobbiesName,
      description: req.body.description,
      createdBy: req.body._id,
      // createdBy: req.user._id,
      cv_id: req.body.cv_id,
    });

    if (!newHobbyAndInterest) {
      return res
        .status(500)
        .json({ message: "HobbyAndInterest creation failed" });
    }

    const redirectUrl = `/api/cv/edit/${newHobbyAndInterest.cv_id}/10`;

    res.status(201).json({
      message: "HobbyAndInterest created successfully",
      HobbyAndInterest: newHobbyAndInterest,
      redirectUrl: redirectUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**-----------------------------------------------
 * @desc    Store New saveCertificate
 * @route  /api/cv/saveCertificate
 * @method  POST
 * @access  Registered users
 ------------------------------------------------*/

module.exports.saveCertificate = asyncHandler(async (req, res) => {
  try {
    const newCertificate = await Certificate.create({
      name: req.body.name,
      IssuingOrganization: req.body.IssuingOrganization,
      IssueDate: req.body.IssueDate,
      createdBy: req.body._id,
      // createdBy: req.user._id,
      cv_id: req.body.cv_id,
    });

    if (!newCertificate) {
      return res.status(500).json({ message: "Certificate creation failed" });
    }

    const redirectUrl = `/api/cv/edit/${newCertificate.cv_id}/11`;

    res.status(201).json({
      message: "Certificate created successfully",
      Certificate: newCertificate,
      redirectUrl: redirectUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**-----------------------------------------------
 * @desc    Store New savenewSocialLink
 * @route  /api/cv/savenewSocialLink
 * @method  POST
 * @access  Registered users
 ------------------------------------------------*/

module.exports.savenewSocialLink = asyncHandler(async (req, res) => {
  try {
    const newSocialLink = await SocialLink.create({
      name: req.body.name,
      link: req.body.link,
      icon: req.body.icon,
      createdBy: req.body._id,
      // createdBy: req.user._id,
      cv_id: req.body.cv_id,
    });

    if (!newSocialLink) {
      return res.status(500).json({ message: "Certificate creation failed" });
    }

    const redirectUrl = `/api/cv/edit/${newSocialLink.cv_id}/12`;

    res.status(201).json({
      message: "socialLink created successfully",
      socialLink: newSocialLink,
      redirectUrl: redirectUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/**-----------------------------------------------
 * @desc    edit cv
 * @route   /api/cv/edit/:id/:section
 * @method  PUT
 * @access  public
 *------------------------------------------------*/
module.exports.editCvCtrl = asyncHandler(async (req, res) => {
  try {
    const { cvId } = req.params;

    const updatedCV = await Cv.findById(cvId);

    if (!updatedCV) {
      return res.status(404).json({ message: "CV not found" });
    }
    const templates = await Template.find({ cv_id: cvId }).select(' -__v -createdAt -updatedAt -_id -cv_id');
    updatedCV.templates = templates;

    const mainInfos = await MainInfo.find({ cv_id: cvId }).select(' -__v -createdAt -updatedAt -_id -cv_id');
    updatedCV.mainInfos = mainInfos;
  
    const connections = await Connction.find({ cv_id: cvId }).select(' -__v -createdAt -updatedAt -_id -cv_id');
    updatedCV.connections = connections;

    const skills = await Skill.find({ cv_id: cvId }).select('skillName -__v -createdAt -updatedAt -_id -cv_id');
    updatedCV.skills = skills;

    const experiences = await Experience.find({ cv_id: cvId }).select(' -__v -createdAt -updatedAt -_id -cv_id');
    updatedCV.experiences = experiences;

    const educations = await Education.find({ cv_id: cvId }).select(' -__v -createdAt -updatedAt -_id -cv_id');
    updatedCV.educations = educations;

    const honorAndaWards = await HonorAndaWard.find({ cv_id: cvId }).select(' -__v -createdAt -updatedAt -_id -cv_id');
    updatedCV.honorAndaWards = honorAndaWards;

    const hobbyAndInterests = await HobbyAndInterest.find({ cv_id: cvId }).select(' -__v -createdAt -updatedAt -_id -cv_id');
    updatedCV.hobbyAndInterests = hobbyAndInterests;

    const certificates = await Certificate.find({ cv_id: cvId }).select(' -__v -createdAt -updatedAt -_id -cv_id')
    updatedCV.certificates = certificates;

    const socialLinks = await SocialLink.find({ cv_id: cvId }).select(' -__v -createdAt -updatedAt -_id -cv_id')
    updatedCV.socialLinks = socialLinks;

    // const languages = await Language.find({ cv_id: cvId });
    // updatedCV.languages = languages;

    await updatedCV.save();

    const redirectUrl = `/api/edit/${cvId}`;
    res.status(201).json({
      message: "CV updated successfully",

      CV: updatedCV,
      redirectUrl: redirectUrl,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


/**-----------------------------------------------
 * @desc    Delete cv
 * @route   /api/cv/delete/:id
 * @method  DELETE
 * @access  
 ------------------------------------------------*/
 module.exports.deleteCvCtrl = asyncHandler(async (req, res) => {
  const cv = await Cv.findById(req.params.id);
  if (!cv) {
    return res.status(404).json({ message: "cv not found" });
  }

  await Cv.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "cv has been deleted successfully",
  });
});


// /**-----------------------------------------------
//  * @desc    Update cv
//  * @route   /api/cv/update/:id/:section
//  * @method  PUT
//  * @access  public
//  ------------------------------------------------*/
//  module.exports.updateCvCtrl = asyncHandler(async (req, res) => {
//   try {
//     const { cvId, section } = req.params;

//     if (!Cv) {
//       return res.status(500).json({ message: "Cv model not defined" });
//     }

//     const cv = await Cv.findById(cvId);
//     if (!cv) {
//       return res.status(404).json({ message: 'CV not found' });
//     }

//     // Update the   section parameter
//     switch (section) {
//       case '1':
//         cv.code = req.body.code;
//         await cv.save();
//         break;
//         case '2':
//         cv.summary = req.body.summary;
//         await cv.save();
//         break;
//         case '3':
//         const updatedCertificates = Certificate(req.body);
//         await Cv.findOneAndUpdate(
//           { _id: cvId },
//           { $set: { Certificate: updatedCertificates } },
//           { new: true }
//         );
//         res.status(201).json({
//           message: "Certificate updated successfully",
//           Certificate: updatedCertificates,
//         });
//         break;

//       case '4':
//         const updatedConnction = Connction(req.body);
//         await Cv.findOneAndUpdate(
//           { _id: cvId },
//           { $set: { Connction: updatedConnction } },
//           { new: true }
//         );
//         res.status(201).json({
//           message: "Connction updated successfully",
//           Connction: updatedConnction,
//         });
//         break;

//         case '5':
//         const updatedEducation = Education(req.body);
//         await Cv.findOneAndUpdate(
//           { _id: cvId },
//           { $set: { Education: updatedEducation } },
//           { new: true }
//         );
//         res.status(201).json({
//           message: "Connction updated successfully",
//           Education: updatedEducation,
//         });
//         break;

//       default:
//         return res.status(400).json({ message: 'Invalid section' });
//     }

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
