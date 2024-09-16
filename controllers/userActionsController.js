const asyncHandler = require('express-async-handler');
const { User } = require('../models/User');
const Course = require('../models/courses/courseModel');
const Exam = require('../models/courses/examModel');
const Question = require('../models/courses/questionModel');
const CourseStudent = require('../models/courses/courseStudentModel');
const StudentExam = require('../models/courses/studentExamModel');
const Certificate = require('../models/courses/certificateModel');

const { validateAnswers } = require('../validation/courseValidate');


function getLocalDateTime() {
    const currentDate = new Date();
    const timeZoneOffset = currentDate.getTimezoneOffset() * 60000;
    return localDateTime = new Date(currentDate.getTime() - timeZoneOffset);
}


//  Get number of upcoming exams, enrolled courses, and completed courses by userId
exports.getUserSummary = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const enrolledCourses = await CourseStudent.find({ user_Id: userId })
        .populate({
            path: 'course_Id',
            match: { status: 'enroll' },
        });
    console.log(enrolledCourses);

    const enrolledCoursesCount = enrolledCourses.filter(course => course.course_Id).length;

    const completedCourses = await CourseStudent.find({ user_Id: userId })
        .populate({
            path: 'course_Id',
            match: { status: 'completed' }
        });;
    const completedCourseCount = completedCourses.filter(course => course.course_Id).length;

    const upcomingExams = await Exam.find({
        course_id: { $in: enrolledCourses.map((course) => course.course_Id) },
        date: { $gt: getLocalDateTime() }
    });

    res.status(200).json({
        enrolledCourses: enrolledCoursesCount,
        completedCourses: completedCourseCount,
        upcomingExams: upcomingExams.length,
        localDateTime
    });
});

//  Get today's exams by userId
exports.getTodayExams = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    let timee = getLocalDateTime()

    const todayTimeStampMS = timee.setUTCHours(0, 0, 0, 0);
    const tomorrowTimeStampMS = timee.setUTCHours(23, 59, 59, 999);

    let today = new Date(parseInt(todayTimeStampMS, 10));
    let tomorrow = new Date(parseInt(tomorrowTimeStampMS, 10));

    const enrolledCourses = await CourseStudent.find({ user_Id: userId });
    const todayExams = await Exam.find({
        course_id: { $in: enrolledCourses.map((course) => course.course_Id) },
        date: {
            $gte: today,
            $lt: tomorrow
        },
    });

    res.status(200).json(todayExams);
});

// Get upcoming exams by userId
exports.getUpcomingExams = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const enrolledCourses = await CourseStudent.find({ user_Id: userId });
    const upcomingExams = await Exam.find({
        course_id: { $in: enrolledCourses.map((course) => course.course_Id) },
        date: { $gt: getLocalDateTime() },
    });

    res.status(200).json(upcomingExams);
});

//  Get enrolled courses by userId
exports.getEnrolledCourses = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const enrolledCourses = await CourseStudent.find({ user_Id: userId })
        .populate({
            path: 'course_Id',
            match: { status: 'enroll' },
        });

    const filteredCourses = enrolledCourses
        .filter(course => course.course_Id)
        .map(course => course.course_Id)

    res.status(200).json(filteredCourses);
});

// Get user progress for each course by userId
exports.getUserProgress = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const coursesProgress = await CourseStudent.find({ user_Id: userId }).populate({
        path: 'course_Id',
        select: 'title level duration',
    });

    res.status(200).json({
        status: 'success',
        data: {
            coursesProgress,
        },
    });
});

//  Get user certificates by userId
exports.getUserCertificates = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const certificates = await Certificate.find()
        .populate({
            path: 'student_Id',
            match: { user_Id: userId }, 
            populate: {
                path: 'course_Id',
                model: 'Course',
                select: 'title instructor',
            },
        })
        .select('dateAcquired certificateImage');

    const userCertificates = certificates.filter(cert => cert.student_Id !== null);

    const formattedCertificates = userCertificates.map(cert => ({
        title: cert.student_Id.course_Id.title,
        instructor: cert.student_Id.course_Id.instructor,
        dateAcquired: cert.dateAcquired,
        certificateImage: cert.certificateImage
    }));

    res.status(200).json({
        status: 'success',
        userCertificates: formattedCertificates,
    });



});

//  Enroll user in a course
exports.enrollUserToCourse = asyncHandler(async (req, res) => {
    const { userId, courseId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }

    const existingEnrollment = await CourseStudent.findOne({ user_Id: userId, course_Id: courseId });
    if (existingEnrollment) {
        return res.status(400).json({ message: 'User is already enrolled in this course' });
    }

    const newCourseStudent = new CourseStudent({
        user_Id: userId,
        course_Id: courseId,
        progress: '0',
    });

    await newCourseStudent.save();
    res.status(201).json({ message: 'User successfully added to course', newCourseStudent });
});

// Get previous exams and their marks or evaluations by userId
exports.getPreviousExams = asyncHandler(async (req, res) => {
    const userId = req.params.id;

    const studentExams = await StudentExam.find({ user_Id: userId })
        .populate({
            path: 'exam_Id',
            model: 'Exam',
            select: 'course_id level full_mark date duration', 
            populate: {
                path: 'course_id',
                model: 'Course',
                select: 'title instructor', 
            },
        });

    if (!studentExams.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'No previous exams found for this user.',
        });
    }
    console.log(studentExams);

    const examsData = studentExams.map((exam) => ({
        studentExamId: exam._id,
        examId: exam.exam_Id._id,
        courseTitle: exam.exam_Id.course_id.title,
        instructor: exam.exam_Id.course_id.instructor,
        level: exam.exam_Id.level,
        fullMark: exam.exam_Id.full_mark,
        date: exam.exam_Id.date,
        duration: exam.exam_Id.duration,
        studentMark: exam.totalMark,
    }));

    res.status(200).json({
        status: 'success',
        results: examsData.length,
        data: examsData,
    });
});

// Submit answers for an exam
exports.submitExamAnswers = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { examId, answers } = req.body;

    const { error } = validateAnswers({ examId, answers });
    if (error) {
        return res.status(400).json({ status: 'fail', message: error.details[0].message });
    }

    const exam = await Exam.findById(examId);
    if (!exam) {
        return res.status(404).json({ status: 'fail', message: 'Exam not found' });
    }

    const existingSubmission = await StudentExam.findOne({ user_Id: userId, exam_Id: examId });
    if (existingSubmission) {
        return res.status(400).json({
            status: 'fail',
            message: 'You have already submitted this exam',
        });
    }

    let totalMark = 0;
    const totalExamMark = exam.full_mark || 0;

    for (const answer of answers) {
        const question = await Question.findById(answer.questionId);

        if (!question) {
            return res.status(404).json({ status: 'fail', message: `Question not found for id: ${answer.questionId}` });
        }

        if (answer.selectedAnswer.toLowerCase() === question.answer.toLowerCase()) {
            totalMark += question.mark;
        }
    }

    const percentageMark = (totalMark / totalExamMark) * 100;
    console.log(percentageMark);
    console.log(userId);

    const studentExam = new StudentExam({
        user_Id: userId,
        exam_Id: examId,
        studentAnswers: answers.map((answer) => ({
            question_Id: answer.questionId,
            answer: answer.selectedAnswer,
        })),
        totalMark,
    });

    await studentExam.save();

    res.status(200).json({
        status: 'success',
        message: 'Exam submitted successfully',
        data: {
            totalExamMark,
            totalMark,
            percentageMark,
        },
    });
});

// Get exam evaluation by userId and examId
exports.getExamEvaluation = asyncHandler(async (req, res) => {
    const { userId, examId } = req.params;

    if (!userId || !examId) {
        return res.status(400).json({ error: "userId and examId are required." });
    }

    const studentExam = await StudentExam.findOne({
        user_Id: userId,
        exam_Id: examId
    }).populate('exam_Id');

    if (!studentExam) {
        return res.status(404).json({ error: "Student exam record not found." });
    }

    const exam = await Exam.findById(examId);
    if (!exam) {
        return res.status(404).json({ error: "Exam not found." });
    }

    const course = await Course.findById(exam.course_id);
    if (!course) {
        return res.status(404).json({ error: "Course not found for this exam." });
    }

    req.studentExam = studentExam;
    req.exam = exam;
    req.course = course;
    res.status(200).json({
        success: true,
        data: {
            course,
            exam,
            studentExam
        }
    })

});
