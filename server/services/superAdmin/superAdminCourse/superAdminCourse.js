const {
  errorMessageWithStatusCode,
  successMessage,
  errorMessage,
  resultMessage,
  socketEmit,
} = require("../../../utils/response_messages");
const {
  DATA_MISSING,
  COURSE_EXISTS,
  NO_DATA,
} = require("../../../constants/messages");
const { NEW_COURSE } = require("../../../constants/socket_messages");
const Course = require("../../../models/course");
const Notification = require("../../../models/notification");
const moment = require("moment");

const createCourse = async (req, res) => {
  const { course } = req.body;
  try {
    if (course != null) {
      const isCourseExists = await Course.findOne({
        courseName: course.courseName,
      });
      if (isCourseExists == null) {
        course.duration = moment().format();
        const newCourse = new Course(course);
        const createNewCourse = await newCourse.save({
          validateBeforeSave: false,
        });
        if (createNewCourse != null) {
          resultMessage(res, newCourse);
          const notification = new Notification({
            title: "New Course",
            description: "New Course has been added!",
          });
          await notification.save();
          socketEmit(res, NEW_COURSE);
        } else {
          errorMessage(res, ERROR_OCCURRED);
        }
      } else {
        errorMessage(res, COURSE_EXISTS);
      }
    } else {
      errorMessage(res, DATA_MISSING);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

module.exports = {
  createCourse,
};
