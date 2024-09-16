const router = require("express").Router();

 const certificate = require("../controllers/courses/certificateController");
const course = require("../controllers/courses/courseController");
const courseStudent = require("../controllers/courses/courseStudentController");
const exam = require("../controllers/courses/examController");
const lesson = require("../controllers/courses/lessonController");
const question = require("../controllers/courses/questionController");
const review = require("../controllers/courses/reviewController");
const unit = require("../controllers/courses/unitController");
const { uploadImageMiddleware } = require("../middlewares/upload");


// /api/course
router.get("/create", course.createCourse);
router.post("/store", course.saveCourse);
router.get("/index", course.getCourses);
router.get("/", course.getCourses);
router.get("/view/:id", course.getCourse);
router.get("/count", course.getCourseCount);
router.put("/update/:id", uploadImageMiddleware,course.updateCourse);
router.delete("/delete/:id", course.deleteCourse);

// /api/certificate
router.get("/certificate/create", certificate.createCertificate);
router.post("/certificate/store", certificate.saveCertificate);
router.put("/certificate/update/:id", uploadImageMiddleware, certificate.updateCertificate);

// /api/courseStudent
router.get("/courseStudent/create", courseStudent.createCourseStudent);
router.post("/courseStudent/store", courseStudent.saveCourseStudent);
router.get("/courseStudent/index", courseStudent.getStudents);
router.get("/courseStudent/", courseStudent.getStudents);
router.get("/:course_Id/courseStudent", courseStudent.getCourseStudents);
router.get("/courseStudent/view/:id", courseStudent.getCourseStudent);
router.put("/courseStudent/update/:id", courseStudent.updateCourseStudent);
router.delete("/courseStudent/delete/:id", courseStudent.deleteCourseStudent);


// /api/exam
router.get("/exam/create", exam.createExam);
router.post("/exam/store", exam.saveExam);
router.get("/exam/index", exam.getExams);
router.get("/exam/", exam.getExams);
router.get("/exam/view/:id", exam.getExam);
router.put("/exam/update/:id", exam.updateEexam);
router.delete("/exam/delete/:id",uploadImageMiddleware, exam.deleteExam);

// /api/lesson
router.get("/lesson/create", lesson.createLesson);
router.post("/lesson/store", lesson.saveLesson);
router.get("/lesson/index", lesson.getLessons);
router.get("/lesson/", lesson.getLessons);
router.get("/lesson/view/:id", lesson.getLesson);
router.put("/lesson/update/:id", lesson.updateLesson);
router.delete("/lesson/delete/:id", lesson.deleteLesson);

// /api/question
router.get("/question/create", question.createQuestion);
router.post("/question/store", question.saveQuestion);
router.get("/question/index", question.getQuestions);
router.get("/question/", question.getQuestions);
router.get("/question/view/:id", question.getQuestion);
router.put("/question/update/:id", question.updateQuestion);
router.delete("/question/delete/:id", question.deleteQuestion);

// /api/review
router.get("/review/create", review.createReview);
router.post("/review/store", review.saveReview);
router.put("/review/update/:id", review.updateReview);
router.delete("/review/delete/:id", review.deleteReview);

// /api/unit
router.get("/unit/create", unit.createUnit);
router.post("/unit/store", unit.saveUnit);
router.get("/unit/index", unit.getUnits);
router.get("/unit/", unit.getUnits);
router.get("/unit/view/:id", unit.getUnit);
router.put("/unit/update/:id", unit.updateUnit);
router.delete("/unit/delete/:id", unit.deleteUnit);



module.exports = router;