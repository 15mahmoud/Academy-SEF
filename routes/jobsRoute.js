const express = require('express');
const router = express.Router();
const JobController = require('../controllers/jobs/jobsController');
const CompanyControllers = require("../controllers/jobs/companiesController");
// const JobApplicationController = require('../controllers/jobs/applicationsController');

// api/Job

// Create a new Job
router.get('/index', JobController.index);
router.get('/', JobController.index);
router.get('/create', JobController.create);
router.post('/save', JobController.save);

// Get a Job by ID
router.get('/view/:id', JobController.getJobById);
// Update a Job by ID
router.patch('/update/:id', JobController.updateJobById);
// Delete a Job by ID
router.delete('/delete/:id', JobController.deleteJobById);


// api/company

// Create a new company
router.post("/company/save", CompanyControllers.save);

// Get all companies
router.get("/view", CompanyControllers.getCompanies);

// Get a company by ID
router.get("/read/:id", CompanyControllers.getCompanyById);

// Update a company by ID
router.patch("/update/:id", CompanyControllers.updateCompany);

// Delete a company by ID
router.delete("/delete/:id", CompanyControllers.deleteCompany);


 
// When user apply to a job
router.post('/apply', JobController.apply);

// when user remove jb application
router.patch('/applicants/disApply', JobController.disApply);

// When job poster accepted some of applicants to review them
router.patch('/applicants/accept', JobController.accept);

// When job poster rejects applicants
router.patch('/applicants/reject', JobController.reject);

// When job poster decided to hire one or more applicants
router.patch('/applicants/hire', JobController.hire);

// router.get('/application/index', JobApplicationController.getAllApplications);
// router.get('/application/view/:id', JobApplicationController.getApplicationById);
// router.patch('/application/update/:id', JobApplicationController.updateApplicationById);
// router.delete('/application/delete/:id', JobApplicationController.deleteApplicationById);




module.exports = router;
