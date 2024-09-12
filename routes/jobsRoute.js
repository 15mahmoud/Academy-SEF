const express = require('express');
const router = express.Router();
const JobController = require('../controllers/jops/jopControllers');
const CompanyControllers = require("../controllers/jops/companyControllers");
const JopapplicationController = require('../controllers/jops/jopAplicationControllers');

// api/Job

// Create a new Job
router.post('/create', JobController.createJob);
// Get all Jobs
router.get('/index', JobController.getAllJobs);
// Get a Job by ID
router.get('/view/:id', JobController.getJobById);
// Update a Job by ID
router.patch('/update/:id', JobController.updateJobById);
// Delete a Job by ID
router.delete('/delete/:id', JobController.deleteJobById);


// api/company

// Create a new company
router.post("/create", CompanyControllers.createCompany);

// Get all companies
router.get("/view", CompanyControllers.getCompanies);

// Get a company by ID
router.get("/read/:id", CompanyControllers.getCompanyById);

// Update a company by ID
router.patch("/update/:id", CompanyControllers.updateCompany);

// Delete a company by ID
router.delete("/delete/:id", CompanyControllers.deleteCompany);


 

router.post('/application/create', JopapplicationController.createApplication);
router.get('/application/index', JopapplicationController.getAllApplications);
router.get('/application/view/:id', JopapplicationController.getApplicationById);
router.patch('/application/update/:id', JopapplicationController.updateApplicationById);
router.delete('/application/delete/:id', JopapplicationController.deleteApplicationById);




module.exports = router;
