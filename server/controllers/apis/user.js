const express = require("express");
let router = express.Router();
const { authenticateStudentJWT } = require("../../auth");

const userService = require("../../services/user/user");

router.get("/profile", authenticateStudentJWT, userService.getUserProfile);

router.post(
  "/update",
  authenticateStudentJWT,
  userService.updateStudentProfile
);

router.get("/assessment", authenticateStudentJWT, userService.getAllAssessment);

router.post("/rate", authenticateStudentJWT, userService.rateTutor);

router.post(
  "/take-assessment",
  authenticateStudentJWT,
  userService.takeAssessment
);
router.get(
  "/assessment-taken",
  authenticateStudentJWT,
  userService.getAllTakenCourseTest
);
router.get(
  "/assessment-untaken",
  authenticateStudentJWT,
  userService.getAllUnTakenCourseTest
);

module.exports = router;
