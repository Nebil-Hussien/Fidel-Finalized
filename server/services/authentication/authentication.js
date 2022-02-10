const { jwt, SECRET_KEY, STUDENT_SECRET_KEY } = require("../../auth/index");

const {
  errorMessageWithStatusCode,
  successMessage,
  errorMessage,
  resultMessage,
  resultMessageWithUserToken,
  socketEmit,
} = require("../../utils/response_messages");
const {
  USER_ALREADY_REGISTERED,
  USER_NOT_FOUND,
  INVALID_LOGIN,
  BLOCKED_USER,
} = require("../../constants/messages");
const {
  checkPassword,
  isEmpty,
  generateHashedPassword,
  JwtToken,
} = require("../../utils/utils");
const Student = require("../../models/student");
const signUp = async (req, res, next) => {
  const { student } = req.body;
  try {
    const isUserExists = await Student.find({
      $or: [
        { mobile_no: student.mobile_no },
        { email: student.email },
        { userName: student.userName },
      ],
    });
    if (isEmpty(isUserExists)) {
      const encryptPassword = await generateHashedPassword(student.password);
      const newStudent = new Student({
        firstName: student.firstName,
        lastName: student.lastName,
        gender: student.gender,
        dateOfBirth: student.dateOfBirth,
        address: {
          subCity: student.address.subCity,
          wereda: student.address.wereda,
          houseNumber: student.address.houseNumber,
          homePhoneNumber: student.address.homePhoneNumber,
        },
        mobile_no: student.mobile_no,
        email: student.email,
        userName: student.userName,
        password: encryptPassword,
      });
      const createStudent = await newStudent.save(newStudent);
      if (!isEmpty(createStudent)) {
        const jwtPayload = {
          mobile_no: createStudent.mobile_no,
          email: createStudent.email,

          role: "student",
        };
        const token = await JwtToken(jwtPayload, STUDENT_SECRET_KEY);
        resultMessageWithUserToken(res, token, createStudent);
      } else {
        errorMessageWithStatusCode(res, ERROR_OCCURRED, 400);
      }
    } else {
      errorMessage(res, USER_ALREADY_REGISTERED);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
const signIn = async (req, res, next) => {
  const { student } = req.body;

  try {
    const studentData = await Student.findOne({
      $or: [
        { mobile_no: student.mobile_no },
        { email: student.email },
        { userName: student.userName },
      ],
    });
    if (studentData != null) {
      if (studentData.actMode == true) {
        const jwtPayload = {
          mobile_no: studentData.mobile_no,
          email: studentData.email,
          role: "student",
        };
        const checkCorrectPassword = await checkPassword(
          student.password,
          studentData.password
        );
        if (checkCorrectPassword) {
          const token = await JwtToken(jwtPayload, STUDENT_SECRET_KEY, null);
          resultMessageWithUserToken(res, token, studentData);
        } else {
          errorMessageWithStatusCode(res, INVALID_LOGIN, 404);
        }
      } else {
        errorMessage(res, BLOCKED_USER);
      }
    } else {
      errorMessageWithStatusCode(res, INVALID_LOGIN, 404);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 500);
  }
};
const adminLogin = async (req, res, next) => {
  const adminCredentials = {
    adminEmail: "swift@admin.com",
    adminPassword: "swift@123",
    Name: "Swift Admin",
  };
  const { email, password } = req.body;

  try {
    if (
      email == adminCredentials.adminEmail &&
      password == adminCredentials.adminPassword
    ) {
      const jwtPayload = {
        email: adminCredentials.adminEmail,
        role: "SuperAdmin",
      };
      const token = await JwtToken(jwtPayload, "12h");
      resultMessageWithUserToken(res, token);
    } else {
      errorMessageWithStatusCode(res, INVALID_EMAIL_OR_PASSWORD, 400);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 500);
  }
};
module.exports = {
  adminLogin,
  signUp,
  signIn,
};
