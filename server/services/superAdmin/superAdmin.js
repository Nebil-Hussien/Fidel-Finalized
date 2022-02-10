const moment = require("moment");

const { jwt, SECRET_KEY, SUPER_ADMIN_SECRET_KEY } = require("../../auth/index");

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
  DATA_MISSING,
  COURSE_EXISTS,
} = require("../../constants/messages");
const {
  checkPassword,
  isEmpty,
  generateHashedPassword,
  JwtToken,
} = require("../../utils/utils");

const signIn = async (req, res, next) => {
  const { superAdmin } = req.body;

  try {
    if (superAdmin != null) {
      const superAdminData = {
        userName: "fidelSuperAdmin",
        password: "123456789",
        role: "SuperAdmin",
      };

      const jwtPayload = {
        userName: superAdminData.userName,
        role: superAdminData.role,
      };

      if (
        superAdminData.password === superAdmin.password &&
        superAdminData.userName === superAdmin.userName
      ) {
        const token = await JwtToken(jwtPayload, SUPER_ADMIN_SECRET_KEY, null);
        resultMessageWithUserToken(res, token, superAdminData);
      } else {
        errorMessageWithStatusCode(res, INVALID_LOGIN, 404);
      }
    } else {
      errorMessage(res, DATA_MISSING);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 500);
  }
};

module.exports = {
  signIn,
};
