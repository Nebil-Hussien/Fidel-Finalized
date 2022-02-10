const express = require("express");
let router = express.Router();
const { authenticateStudentJWT, authenticateTutorJWT } = require("../../auth");

const tutorService = require("../../services/tutor/tutor");

router.post("/sign-in", tutorService.signIn);

router.post(
  "/create-assessment",
  authenticateTutorJWT,
  tutorService.createAssessment
);

router.get("/profile", authenticateTutorJWT, tutorService.getTutorProfile);

router.post("/update", authenticateTutorJWT, tutorService.updateTutorProfile);

router.get("/rate", authenticateTutorJWT, tutorService.getRate);

router.get(
  "/assigned-course",
  authenticateTutorJWT,
  tutorService.getAllAssignedCourse
);
router.get(
  "/course/assessment",
  authenticateTutorJWT,
  tutorService.getAllCourseAssessments
);

module.exports = router;
