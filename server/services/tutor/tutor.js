const { TUTOR_SECRET_KEY } = require("../../auth");
const {
  INVALID_LOGIN,
  ERROR_OCCURRED,
  DUPLICATE_ASSESSMENT,
  SUCCESS,
  NO_COURSE,
  NO_RATE,
  NO_ASSESSMENT,
} = require("../../constants/messages");
const { NEW_ASSESSMENT } = require("../../constants/socket_messages");
const Tutor = require("../../models/tutor");
const Assessment = require("../../models/assessment");
const Question = require("../../models/question");
const Rate = require("../../models/rate");
const Course = require("../../models/course");
const CourseAssigned = require("../../models/courseAssigned");
const { average } = require("average-rating");
const {
  errorMessageWithStatusCode,
  resultMessageWithUserToken,
  errorMessage,
  resultMessage,
  successMessage,
  socketEmit,
} = require("../../utils/response_messages");
const {
  checkPassword,
  JwtToken,
  calculateRating,
} = require("../../utils/utils");

const signIn = async (req, res) => {
  const { tutor } = req.body;

  try {
    const tutorData = await Tutor.findOne({
      $or: [{ mobile_no: tutor.mobile_no }, { email: tutor.email }],
    });
    if (tutorData != null) {
      const jwtPayload = {
        mobile_no: tutorData.mobile_no,
        email: tutorData.email,
        role: "tutor",
      };
      const checkCorrectPassword = await checkPassword(
        tutor.password,
        tutorData.password
      );
      if (checkCorrectPassword) {
        const token = await JwtToken(jwtPayload, TUTOR_SECRET_KEY, null);
        resultMessageWithUserToken(res, token, tutorData, "tutor");
      } else {
        errorMessageWithStatusCode(res, INVALID_LOGIN, 404);
      }
    } else {
      errorMessageWithStatusCode(res, INVALID_LOGIN, 404);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 500);
  }
};

const createAssessment = async (req, res) => {
  const { assessment } = req.body;
  try {
    const assessmentData = await Assessment.findOne({
      course: assessment.course,
      dateOfExamination: assessment.dateOfExamination,
    });
    if (assessmentData == null) {
      const newAssessment = new Assessment(assessment);
      const createNewAssessment = await newAssessment.save(newAssessment);
      if (createNewAssessment != null) {
        assessment.question.assessment = createNewAssessment._id;
        const newQuestion = new Question(assessment.question);
        const createNewQuestion = await newQuestion.save(newQuestion);
        if (createNewQuestion != null) {
          const updateQuestion = await Assessment.updateOne(
            { _id: createNewAssessment._id },
            { questionData: createNewQuestion._id },
            { upsert: true }
          );
          resultMessage(res, SUCCESS);
          const course = await Course.findOne({
            _id: assessment.course,
          });
          socketEmit(res, NEW_ASSESSMENT, course);
        } else {
          errorMessage(res, ERROR_OCCURRED);
        }
      } else {
        errorMessage(res, ERROR_OCCURRED);
      }
    } else {
      errorMessage(res, DUPLICATE_ASSESSMENT);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const getTutorProfile = async (req, res) => {
  const { mobile_no } = req.user;
  try {
    const tutor = await Tutor.findOne({
      mobile_no: mobile_no,
    });
    if (tutor != null) {
      const tutorData = new Tutor(tutor);
      resultMessage(res, tutorData);
    } else {
      errorMessage(res, USER_NOT_FOUND);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const updateTutorProfile = async (req, res) => {
  const { mobile_no } = req.user;
  const { tutor } = req.body;
  try {
    const tutorData = await Tutor.findOne({
      mobile_no: mobile_no,
    });
    if (tutorData != null) {
      tutor.password = tutorData.password;
      const updateTutor = await Tutor.updateOne(
        { mobile_no: tutorData.mobile_no },
        tutor,
        { upsert: true }
      );
      if (updateTutor != null) {
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

const getRate = async (req, res) => {
  const { tutor_id } = req.query;

  try {
    const rate = await Rate.find({
      tutor: tutor_id,
    });
    if (rate.length > 0) {
      const rating = rate.map((el) => +el.rate);

      const finalRate = calculateRating(rating);
      resultMessage(res, finalRate);
    } else {
      errorMessage(res, NO_RATE);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const getAllAssignedCourse = async (req, res) => {
  const { tutor_id } = req.query;
  try {
    const assigned_courses = await CourseAssigned.find({
      tutor: tutor_id,
    }).populate("course");
    if (assigned_courses) {
      resultMessage(res, assigned_courses);
    } else {
      successMessage(res, NO_COURSE);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const getAllCourseAssessments = async (req, res) => {
  const { tutor_id, course_id } = req.query;

  try {
    const assessments = await Assessment.find({
      tutor: tutor_id,
      course: course_id,
    });
    if (assessments.length > 0) {
      resultMessage(res, assessments);
    } else {
      successMessage(res, NO_ASSESSMENT);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

module.exports = {
  signIn,
  createAssessment,
  getTutorProfile,
  updateTutorProfile,
  getRate,
  getAllAssignedCourse,
  getAllCourseAssessments,
};
