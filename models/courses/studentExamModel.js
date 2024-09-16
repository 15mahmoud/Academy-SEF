const mongoose = require('mongoose');

const studentExamSchema = new mongoose.Schema(
    {
        user_Id: {
            type: mongoose.Schema.ObjectId,
            required: [true, "user_Id is required"],
            ref: "User",
        },
        exam_Id: {
            type: mongoose.Schema.ObjectId,
            required: [true, "exam_Id is required"],
            ref: "Exam",
        },
        studentAnswers: [
            {
                question_Id: {
                    type: mongoose.Schema.ObjectId,
                    required: [true, "question_Id is required"],
                    ref: "Question",
                },
                answer: {
                    type: String,
                    required: [true, "answer is required"],
                },
            }
        ],
        totalMark: {
            type: Number,
            required: true,
            default: 0, 
        },
    },
    { timestamps: true }
);

const studentExamModel = mongoose.model('StudentExam', studentExamSchema);

module.exports = studentExamModel;
