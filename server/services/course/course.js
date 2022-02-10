const fs = require("fs");
const path = require("path");
const {
  ERROR_OCCURRED,
  SUCCESS,
  COURSE_ALREADY_ENROLLED,
  NO_COURSE,
  NO_ENROLLED_COURSE_FOUND,
  NO_DATA,
  NO_TUTOR,
  COURSE_ALREADY_ASSIGNED,
  NO_COURSE_MATERIAL,
  NO_PAYMENT_RECEIPT,
} = require("../../constants/messages");
const {
  errorMessageWithStatusCode,
  errorMessage,
  resultMessage,
  successMessage,
} = require("../../utils/response_messages");
const EnrollCourse = require("../../models/courseEnrollment");
const Course = require("../../models/course");
const Tutor = require("../../models/tutor");
const CourseAssigned = require("../../models/courseAssigned");
const Receipt = require("../../models/receipt");
const Blackboard = require("../../models/blackBoard");
const Assessment = require("../../models/assessment");
const { NODATA } = require("dns");

const enrollCourse = async (req, res) => {
  const { course } = req.body;
  try {
    const newEnroll = new EnrollCourse(course);
    const checkCourseEnrollment = await EnrollCourse.findOne({
      course: newEnroll.course,
      student: newEnroll.student,
    });
    if (checkCourseEnrollment == null) {
      const enrollNewCourse = await newEnroll.save({
        validateBeforeSave: false,
      });
      if (enrollNewCourse != null) {
        resultMessage(res, newEnroll);
      } else {
        errorMessage(res, ERROR_OCCURRED);
      }
    } else {
      errorMessage(res, COURSE_ALREADY_ENROLLED);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const getEnrolledCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await EnrollCourse.find({
      student: id,
    })
      .populate({
        path: "course",
        populate: {
          path: "tutor",
        },
      })
      .populate("tutor");
    if (course.length != 0) {
      resultMessage(res, course);
    } else {
      successMessage(res, NO_COURSE);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const updateCoursePaymentStatus = async (req, res) => {
  const { id, paid } = req.body;
  try {
    const enrolledCourse = await EnrollCourse.findOne({
      _id: id,
    });
    if (enrolledCourse != null) {
      await EnrollCourse.updateOne(
        { _id: enrolledCourse._id },
        { paid: paid },
        { upsert: true }
      );
      successMessage(res, SUCCESS);
    } else {
      errorMessage(res, NO_ENROLLED_COURSE_FOUND);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const submitCoursePaymentVerification = async (req, res) => {
  const { student, course_enrollment } = req.body;

  try {
    const receiptData = {
      student,
      course_enrollment,
      receiptVerification: req.file.filename,
    };
    const newReceipt = new Receipt(receiptData);
    const submitPaymentVerification = await newReceipt.save(newReceipt);
    if (submitPaymentVerification != null) {
      await EnrollCourse.updateOne(
        { _id: receiptData.course_enrollment },
        { receipt: submitPaymentVerification._id },
        { upsert: true }
      );
      successMessage(res, SUCCESS);
    } else {
      errorMessage(res, ERROR_OCCURRED);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
const getAllPaidStudents = async (req, res) => {
  const { course_id } = req.query;
  try {
    const paymentReceipt = await Receipt.findOne({
      course: course_id,
    }).populate("student");
    if (paymentReceipt) {
      resultMessage(res, paymentReceipt);
    } else {
      successMessage(res, NO_PAYMENT_RECEIPT);
    }
  } catch (error) {
    console.log(error);
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
const getStudentPaymentReceipt = async (req, res) => {
  const { course_id, student_id } = req.query;
  try {
    const paymentReceipt = await Receipt.findOne({
      course: course_id,
      student: student_id,
    });
    if (paymentReceipt) {
      resultMessage(res, paymentReceipt);
    } else {
      successMessage(res, NO_PAYMENT_RECEIPT);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
const getAllEnrolledCourses = async (req, res) => {
  try {
    const enrolledCourses = await EnrollCourse.find().populate("receipt");
    if (enrolledCourses.length != 0) {
      resultMessage(res, enrolledCourses);
    } else {
      errorMessage(res, NO_DATA);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const getAllEnrolledStudents = async (req, res) => {
  const { course_id } = req.query;
  try {
    const enrolledCourses = await EnrollCourse.find({
      course: course_id,
    })
      .populate("student")
      .populate("receipt");
    if (enrolledCourses.length != 0) {
      resultMessage(res, enrolledCourses);
    } else {
      errorMessage(res, NO_DATA);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const getAllAssignedCourse = async (req, res) => {
  try {
    const courses = await CourseAssigned.find()
      .populate("course")
      .populate("tutor");
    if (courses.length > 0) {
      resultMessage(res, courses);
    } else {
      errorMessage(res, NO_DATA);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    console.log(courses.length);
    if (courses.length > 0) {
      resultMessage(res, courses);
    } else {
      errorMessage(res, NO_DATA);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const assignCourse = async (req, res) => {
  const { course_id, tutor_id } = req.body;

  try {
    const course = Course.find({
      _id: course_id,
    });
    if (course) {
      const assignedCourse = await CourseAssigned.findOne({
        course: course_id,
      });
      if (!assignedCourse) {
        const tutor = Tutor.find({
          _id: tutor_id,
        });
        if (tutor) {
          const assign = new CourseAssigned({
            tutor: tutor_id,
            course: course_id,
          });
          const assignCourse = await assign.save(assign);
          const update = await Course.updateOne(
            { _id: course_id },
            { tutor: tutor_id }
          );
          if (assignCourse) {
            resultMessage(res, assign);
          } else {
            errorMessage(res, ERROR_OCCURRED);
          }
        } else {
          errorMessage(res, NO_TUTOR);
        }
      } else {
        errorMessage(res, COURSE_ALREADY_ASSIGNED);
      }
    } else {
      errorMessage(res, NO_COURSE);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const getAllTotalEnrolledStudents = async (req, res) => {
  const { course_id } = req.query;

  try {
    const enrolledCourses = await EnrollCourse.find({
      course: course_id,
    });
    if (enrolledCourses) {
      resultMessage(res, enrolledCourses.length);
    } else {
      successMessage(res, NO_ENROLLED_COURSE_FOUND);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
const getAllCourseMaterials = async (req, res) => {
  const { course_id } = req.query;
  try {
    const courseMaterials = await Blackboard.find({
      course: course_id,
    });
    if (courseMaterials) {
      resultMessage(res, courseMaterials);
    } else {
      successMessage(res, NO_COURSE_MATERIAL);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
const downloadCourseMaterial = async (req, res) => {
  const { file_name } = req.query;
  try {
    // const file = fs.createReadStream(
    //   `${__dirname}/../../public/course_material/${file_name}`
    // );
    const file = `${__dirname}/../../public/course_material/${file_name}`;

    // file.pipe(res);
    res.download(file, file_name);
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const searchAllCourses = async (req, res) => {
  const { search_query } = req.query;
  try {
    const courses = await Course.find({
      courseName: new RegExp(search_query, "i"),
    }).populate("tutor");
    if (courses.length > 0) {
      resultMessage(res, courses);
    } else {
      successMessage(res, NO_COURSE);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
const searchAssignedCourses = async (req, res) => {
  const { search_query, tutor_id } = req.query;
  try {
    const courseAssigned = await CourseAssigned.find({
      tutor: tutor_id,
    })
      .populate("tutor")
      .populate({
        path: "course",
        match: { courseName: new RegExp(search_query, "i") },
      });
    if (courseAssigned.length > 0 && courseAssigned.some((el) => el.course)) {
      resultMessage(res, courseAssigned);
    } else {
      successMessage(res, NO_COURSE);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
module.exports = {
  enrollCourse,
  getEnrolledCourse,
  updateCoursePaymentStatus,
  submitCoursePaymentVerification,
  getAllPaidStudents,
  getStudentPaymentReceipt,
  getAllEnrolledCourses,
  getAllAssignedCourse,
  getAllCourse,
  getAllTotalEnrolledStudents,
  getAllEnrolledStudents,
  assignCourse,
  getAllCourseMaterials,
  downloadCourseMaterial,
  searchAllCourses,
  searchAssignedCourses,
};
