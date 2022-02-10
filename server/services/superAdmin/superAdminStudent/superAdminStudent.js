const {
  errorMessageWithStatusCode,

  errorMessage,
  resultMessage,
  successMessage,
} = require("../../../utils/response_messages");
const {
  DATA_MISSING,
  COURSE_EXISTS,
  NO_DATA,
  SUCCESS,
} = require("../../../constants/messages");

const Schedule = require("../../../models/schedule");
const Student = require("../../../models/student");

const createSchedule = async (req, res) => {
  const { schedule } = req.body;
  try {
    const newSchedule = new Schedule(schedule);
    const createSchedule = await newSchedule.save(newSchedule);
    if (createSchedule != null) {
      resultMessage(res, newSchedule);
    } else {
      errorMessage(res, ERROR_OCCURRED);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    if (students.length > 0) {
      resultMessage(res, students);
    } else {
      errorMessage(res, NO_DATA);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
const getAllActiveStudents = async (req, res) => {
  try {
    const students = await Student.find({
      actMode: true,
    });
    if (students.length > 0) {
      resultMessage(res, students);
    } else {
      errorMessage(res, NO_DATA);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
const getAllBlockStudents = async (req, res) => {
  try {
    const students = await Student.find({
      actMode: false,
    });
    if (students.length > 0) {
      resultMessage(res, students);
    } else {
      errorMessage(res, NO_DATA);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const updateAccountStatus = async (req, res) => {
  const { id, actMode } = req.body;
  try {
    const user = await Student.findOne({
      _id: id,
    });
    if (user != null) {
      await Student.updateOne(
        { _id: user._id },
        { actMode: actMode },
        { upsert: true }
      );
      successMessage(res, SUCCESS);
    } else {
      errorMessage(res, NO_DATA);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
module.exports = {
  updateAccountStatus,
  createSchedule,
  getAllStudents,
  getAllActiveStudents,
  getAllBlockStudents,
};
