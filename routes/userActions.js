const express = require('express');
const router = express.Router();
const {
    getUserSummary,
    getTodayExams,
    getUpcomingExams,
    getEnrolledCourses,
    getUserProgress,
    getUserCertificates,
    enrollUserToCourse,
    getPreviousExams,
    submitExamAnswers,
    getExamEvaluation } = require('../controllers/userActionsController');

router.get('/summary/:id', getUserSummary);
router.get('/today-exams/:id', getTodayExams);
router.get('/upcoming-exams/:id', getUpcomingExams);
router.get('/enrolled-courses/:id', getEnrolledCourses);
router.get('/progress/:id', getUserProgress);
router.get('/certificates/:id', getUserCertificates);
router.post('/enroll-course', enrollUserToCourse);
router.get('/previous-exams/:id', getPreviousExams);
router.post('/submit-answers/:id', submitExamAnswers);
router.get('/exams-evaluation/:userId/:examId', getExamEvaluation);

module.exports = router;
