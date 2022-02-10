const jwt = require("jsonwebtoken");
const exjwt = require("express-jwt");
const dotenv = require("dotenv");
const {
  errorMessageWithStatusCode,
  errorMessage,
} = require("../utils/response_messages");
const {
  NO_AUTHORIZATION_TOKEN_FOUND,
  AUTHORIZATION_ERROR,
  NO_PERMISSION,
} = require("../constants/messages");
const { canUpdateProfile } = require("./permissions/user/user_permissions");
const STUDENT_SECRET_KEY = process.env.STUDENT_SECRET_KEY;
const SUPER_ADMIN_SECRET_KEY = process.env.SUPER_ADMIN_SECRET_KEY;
const TUTOR_SECRET_KEY = process.env.TUTOR_SECRET_KEY;
const jwtMW = exjwt({
  secret: SUPER_ADMIN_SECRET_KEY,
  algorithms: ["RS256"],
  credentialsRequired: true,
});

const authenticateStudentJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, STUDENT_SECRET_KEY, (err, user) => {
      if (err) {
        return errorMessageWithStatusCode(res, AUTHORIZATION_ERROR, 403);
      }

      req.user = user;
      next();
    });
  } else {
    errorMessageWithStatusCode(res, NO_AUTHORIZATION_TOKEN_FOUND, 403);
  }
};
const authenticateTutorJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, TUTOR_SECRET_KEY, (err, user) => {
      if (err) {
        return errorMessageWithStatusCode(res, AUTHORIZATION_ERROR, 403);
      }

      req.user = user;
      next();
    });
  } else {
    errorMessageWithStatusCode(res, NO_AUTHORIZATION_TOKEN_FOUND, 403);
  }
};
const authenticateAll = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    next();
  } else {
    errorMessageWithStatusCode(res, NO_AUTHORIZATION_TOKEN_FOUND, 403);
  }
};

// function authPermission(req, res, next) {
//   var authorization = req.headers.authorization,
//     decoded;
//   try {
//     decoded = jwt.verify(authorization.split(" ")[1], SECRET_KEY);
//   } catch (e) {
//     return res.status(401).send("unautorized");
//   }
//   if (decoded.role === "Admin" || "SuperAdmin") {
//     next();
//   } else {
//     res.send(
//       JSON.stringify({
//         success: false,
//         message: NO_PERMISSION,
//       })
//     );
//   }
// }
function authSuperPermission(req, res, next) {
  var authorization = req.headers.authorization,
    decoded;
  try {
    decoded = jwt.verify(authorization.split(" ")[1], SUPER_ADMIN_SECRET_KEY);
  } catch (e) {
    return res.status(401).send("unautorized");
  }
  if (decoded.role === "SuperAdmin") {
    next();
  } else {
    res.send(
      JSON.stringify({
        success: false,
        message: NO_PERMISSION,
      })
    );
  }
}

function authUpdateProfile(req, res, next) {
  var authorization = req.headers.authorization,
    decoded;
  try {
    decoded = jwt.verify(authorization.split(" ")[1], SECRET_KEY);
  } catch (e) {
    return res.status(401).send("unautorized");
  }

  if (
    canUpdateProfile(decoded.phoneNumber, req.body.phoneNumber) ||
    decoded.role === "Admin"
  ) {
    next();
  } else {
    res.send(
      JSON.stringify({
        success: false,
        message: NO_PERMISSION,
      })
    );
  }
}

module.exports = {
  jwtMW,
  SUPER_ADMIN_SECRET_KEY,
  STUDENT_SECRET_KEY,
  TUTOR_SECRET_KEY,
  jwt,
  authenticateStudentJWT,
  // authPermission,
  authenticateAll,
  authenticateTutorJWT,
  authSuperPermission,
  authUpdateProfile,
};
