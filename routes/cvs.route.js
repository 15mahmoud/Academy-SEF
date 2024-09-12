const router = require("express").Router();

const certificate = require("../controllers/cvs/certificateControllers");
const connction = require("../controllers/cvs/connctionControllers");
const cv = require("../controllers/cvs/cvControllers");
const education = require("../controllers/cvs/educationControllers");
const experience = require("../controllers/cvs/experienceControllers");
const hobbyAndInterest = require("../controllers/cvs/hobbyAndInteresControllers");
const honorAndaWard = require("../controllers/cvs/honorAndaWardControllers");
const socialLink = require("../controllers/cvs/socialLinkControllers");
const skill = require("../controllers/cvs/skillControllers");
const language = require("../controllers/cvs/languageControllers");
const mainInfo = require("../controllers/cvs/mainInfoControllers");
const project = require("../controllers/cvs/projectControllers");
const template = require("../controllers/cvs/templateControllers");


// /api/cv
router.post("/create", cv.createCvCtrl);
router.get("/index", cv.getAllCvCtrl);
router.get("/view/:id", cv.getSingleCvCtrl);
router.put("/update/:id", cv.updateCvCtrl);
router.delete("/delete/:id", cv.deleteCvCtrl);

// /api/cv/certificate
router.post("/certificate/create", certificate.createCertificateCtrl);
router.get("/certificate/index", certificate.getAllCertificateCtrl);
router.get("/certificate/view/:id", certificate.getSingleCertificateCtrl);
router.put("/certificate/update/:id", certificate.updateCertificateCtrl);
router.delete("/certificate/delete/:id", certificate.deleteCertificateCtrl);

// /api/cv/education
router.post("/education/create", education.createEducationCtrl);
router.get("/education/index", education.getAllEducationCtrl);
router.get("/education/view/:id", education.getSingleEducationCtrl);
router.put("/education/update/:id", education.updateEducationCtrl);
router.delete("/education/delete/:id", education.deleteEducationCtrl);

// /api/cv/experience
router.post("/experience/create", experience.createExperienceCtrl);
router.get("/experience/index", experience.getAllExperienceCtrl);
router.get("/experience/view/:id", experience.getSingleExperienceCtrl);
router.put("/experience/update/:id", experience.updateExperienceCtrl);
router.delete("/experience/delete/:id", experience.deleteExperienceCtrl);

// /api/cv/hobbyAndInterest
router.post(
  "/hobbyAndInterest/create",
  hobbyAndInterest.createHobbyAndInterestCtrl
);
router.get(
  "/hobbyAndInterest/index",
  hobbyAndInterest.getAllHobbyAndInterestCtrl
);
router.get(
  "/hobbyAndInterest/view/:id",
  hobbyAndInterest.getSingleHobbyAndInterestCtrl
);
router.put(
  "/hobbyAndInterest/update/:id",
  hobbyAndInterest.updateHobbyAndInterestCtrl
);
router.delete(
  "/hobbyAndInterest/delete/:id",
  hobbyAndInterest.deletehobbyAndInterestCtrl
);

// /api/cv/honorAndaWard
router.post("/honorAndaWard/create", honorAndaWard.createHonorAndaWardCtrl);
router.get("/honorAndaWard/index", honorAndaWard.getAllHonorAndaWardCtrl);
router.get("/honorAndaWard/view/:id", honorAndaWard.getSingleHonorAndaWardCtrl);
router.put("/honorAndaWard/update/:id", honorAndaWard.updatehonorAndaWardCtrl);
router.delete(
  "/honorAndaWard/delete/:id",
  honorAndaWard.deleteHonorAndaWardCtrl
);

// /api/cv/socialLink
router.post("/socialLink/create", socialLink.createSocialLinkCtrl);
router.get("/socialLink/index", socialLink.getAllSocialLinkCtrl);
router.get("/socialLink/view/:id", socialLink.getSingleSocialLinkCtrl);
router.put("/socialLink/update/:id", socialLink.updateSocialLinkCtrl);
router.delete("/socialLink/delete/:id", socialLink.deleteSocialLinkCtrl);

// /api/cv/connction
router.post("/connction/create", connction.createConnctionCtrl);
router.get("/connction/index", connction.getAllConnctionCtrl);
router.get("/connction/view/:id", connction.getSingleConnctionCtrl);
router.put("/connction/update/:id", connction.updateConnctionCtrl);
router.delete("/connction/delete/:id", connction.deleteConnctionCtrl);

// /api/cv/skill
router.post("/skill/create", skill.createSkillCtrl);
router.get("/skill/index", skill.getAllSkillCtrl);
router.get("/skill/view/:id", skill.getSingleSkillCtrl);
router.put("/skill/update/:id", skill.updateSkillCtrl);
router.delete("/skill/delete/:id", skill.deleteSkillCtrl);

// /api/cv/language
router.post("/language/create", language.createLanguageCtrl);
router.get("/language/index", language.getAllLanguageCtrl);
router.get("/language/view/:id", language.getSingleLanguageCtrl);
router.put("/language/update/:id", language.updateLanguageCtrl);
router.delete("/language/delete/:id", language.deleteLanguageCtrl);

// /api/cv/project
router.post("/project/create", project.createProjectCtrl);
router.get("/project/index", project.getAllProjectCtrl);
router.get("/project/view/:id", project.getSingleLanguageCtrl);
router.put("/project/update/:id", project.updateProjectCtrl);
router.delete("/project/delete/:id", project.deleteProjectCtrl);

// /api/cv/template
router.post("/template/create", template.createTemplateCtrl);
router.get("/template/index", template.getAllTemplateCtrl);
router.get("/template/view/:id", template.getSingleTemplateCtrl);
router.put("/template/update/:id", template.updateTemplateCtrl);
router.delete("/template/delete/:id", template.deleteTemplateCtrl);

// /api/cv/mainInfo
router.post("/mainInfo/create", mainInfo.createMainInfoCtrl);
router.get("/mainInfo/index", mainInfo.getAllMainInfoCtrl);
router.get("/mainInfo/view/:id", mainInfo.getSingleMainInfoCtrl);
router.put("/mainInfo/update/:id", mainInfo.updateMainInfoCtrl);
router.delete("/mainInfo/delete/:id", mainInfo.deleteMainInfoCtrl);


module.exports = router;
