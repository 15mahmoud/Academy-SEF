const router = require("express").Router();


const cv = require("../controllers/cvs/cvsController");
// /api/cv
router.get('/create', cv.createCV);
// router.post('/save', ,cv.saveCvCtrl);


router.post('/saveCv',cv.saveCvCtrl);
router.put('/saveAbout/:id',cv.saveSummary);
router.post('/saveTemplate',cv.saveTemplate);
router.post('/saveMainInfo',cv.saveMainInfo);
router.post('/saveSkill',cv.saveSkill);
router.post('/saveConnction',cv.saveConnction);
router.post('/saveExperience',cv.saveExperience);
router.post('/saveEducation',cv.saveEducation);
router.post('/saveHonorAndaWard',cv.saveHonorAndaWard);
router.post('/saveHobbyAndInterest',cv.saveHobbyAndInterest);
router.post('/saveCertificate',cv.saveCertificate);
router.post('/savenewSocialLink',cv.savenewSocialLink);
router.put('/edit/:cvId/:section',cv.editCvCtrl);
router.delete("/delete/:id", cv.deleteCvCtrl);


// router.put('/update/:cvId/:section',cv.updateCvCtrl);

module.exports = router;
