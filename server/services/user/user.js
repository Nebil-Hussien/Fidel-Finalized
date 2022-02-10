const {
  ERROR_OCCURRED,
  SUCCESS,
  USER_NOT_FOUND,
  ASSESSMENT_NOT_FOUND,
  NO_TUTOR,
  ALREADY_GAVE_RATE,
  NO_SCORE,
} = require("../../constants/messages");
const Student = require("../../models/student");
const EnrolledCourse = require("../../models/courseEnrollment");
const Assessment = require("../../models/assessment");
const Tutor = require("../../models/tutor");
const Rate = require("../../models/rate");
const Score = require("../../models/score");
const {
  errorMessageWithStatusCode,
  errorMessage,
  resultMessage,
  successMessage,
} = require("../../utils/response_messages");
const { generateHashedPassword } = require("../../utils/utils");

const getUserProfile = async (req, res) => {
  const { mobile_no } = req.user;
  try {
    const student = await Student.findOne({
      mobile_no: mobile_no,
    });
    if (student != null) {
      const studentData = new Student(student);
      resultMessage(res, studentData);
    } else {
      errorMessage(res, USER_NOT_FOUND);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const updateStudentProfile = async (req, res) => {
  const { mobile_no } = req.user;
  const { student } = req.body;
  try {
    const studentData = await Student.findOne({
      mobile_no: mobile_no,
    });
    if (studentData != null) {
      student.password = studentData.password;
      const updateStudent = await Student.updateOne(
        { mobile_no: studentData.mobile_no },
        student,
        { upsert: true }
      );
      if (updateStudent) {
        successMessage(res, SUCCESS);
      } else {
        errorMessage(res, ERROR_OCCURRED);
      }
    } else {
      errorMessage(res, USER_NOT_FOUND);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const getAllAssessment = async (req, res) => {
  const { course_id, student_id } = req.query;

  try {
    const isEnrolled = await EnrolledCourse.findOne({
      course: course_id,
      student: student_id,
    });
    if (isEnrolled) {
      const assessment = await Assessment.find({
        course: course_id,
      }).populate("questionData");
      resultMessage(res, assessment);
    } else {
      errorMessage(res, ASSESSMENT_NOT_FOUND);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const rateTutor = async (req, res) => {
  const { tutor_id, student_id, rate_value } = req.body;

  try {
    const tutor = await Tutor.findOne({
      _id: tutor_id,
    });
    if (tutor) {
      const student = await Student.findOne({
        _id: student_id,
      });
      if (student) {
        const rate = new Rate({
          tutor: tutor_id,
          student: student_id,
          rate: rate_value,
        });
        const isAlreadyRate = await Rate.findOne({
          tutor: rate.tutor_id,
          student: rate.student_id,
        });
        if (!isAlreadyRate) {
          const rateTutor = await rate.save(rate);
          if (rateTutor) {
            resultMessage(res, rate);
          } else {
            errorMessage(res, ERROR_OCCURRED);
          }
        } else {
          errorMessage(res, ALREADY_GAVE_RATE);
        }
      } else {
        errorMessage(res, USER_NOT_FOUND);
      }
    } else {
      errorMessage(res, NO_TUTOR);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
const takeAssessment = async (req, res) => {
  const { score } = req.body;
  try {
    const newTestScore = new Score(score);
    const testScore = await newTestScore.save(score);
    if (testScore) {
      resultMessage(res, testScore);
    } else {
      errorMessage(res, ERROR_OCCURRED);
    }
  } catch (error) {
    console.log(error);
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
const getAllTakenCourseTest = async (req, res) => {
  const { student_id, course_id } = req.query;
  try {
    const TestScore = await Score.find({
      student: student_id,
    }).populate({
      path: "assessment",
      match: {
        course: course_id,
      },
    });
    if (TestScore.length > 0 && TestScore.some((el) => el.assessment)) {
      resultMessage(res, TestScore);
    } else {
      successMessage(res, NO_SCORE);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
const getAllUnTakenCourseTest = async (req, res) => {
  const { student_id, course_id } = req.query;
  try {
    const testScore = await Score.find({
      student: student_id,
    });
    const assessments = await Assessment.find({
      course: course_id,
    }).populate("questionData");
    const testScoreId = testScore.map((test) => test.assessment.toString());
    const filteredAssessments = assessments.filter(
      (el) => !testScoreId.includes(el._id.toString())
    );
    resultMessage(res, filteredAssessments);
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
module.exports = {
  getUserProfile,
  updateStudentProfile,
  getAllAssessment,
  rateTutor,
  takeAssessment,
  getAllTakenCourseTest,
  getAllUnTakenCourseTest,
};
