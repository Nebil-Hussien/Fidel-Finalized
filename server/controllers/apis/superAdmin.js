const express = require("express");
let router = express.Router();
const { authSuperPermission } = require("../../auth");

const superAdminService = require("../../services/superAdmin/superAdmin");
const superAdminCourseService = require("../../services/superAdmin/superAdminCourse/superAdminCourse");
const superAdminTutorService = require("../../services/superAdmin/superAdminTutor/superAdminTutor");
const superAdminScheduleService = require("../../services/superAdmin/superAdminSchedule/superAdminSchedule");
const superAdminStudentService = require("../../services/superAdmin/superAdminStudent/superAdminStudent");

router.post("/sign-in", superAdminService.signIn);

router.post(
  "/create-tutor",
  authSuperPermission,
  superAdminTutorService.createTutor
);
router.get(
  "/all-tutor",
  authSuperPermission,
  superAdminTutorService.getAllTutor
);
router.get(
  "/all-active-tutor",
  authSuperPermission,
  superAdminTutorService.getAllActiveTutor
);
router.get(
  "/all-blocked-tutor",
  authSuperPermission,
  superAdminTutorService.getAllBlockedTutor
);
router.post(
  "/tutor-activationMode",
  authSuperPermission,
  superAdminTutorService.changeTutorActivationMode
);

router.post(
  "/create-schedule",
  authSuperPermission,
  superAdminScheduleService.createSchedule
);
router.post(
  "/create-course",
  authSuperPermission,
  superAdminCourseService.createCourse
);

router.post(
  "/account-status",
  authSuperPermission,
  superAdminStudentService.updateAccountStatus
);

router.get(
  "/all-user",
  authSuperPermission,
  superAdminStudentService.getAllStudents
);
router.get(
  "/all-active-user",
  authSuperPermission,
  superAdminStudentService.getAllActiveStudents
);

router.get(
  "/all-blocked-user",
  authSuperPermission,
  superAdminStudentService.getAllBlockStudents
);

module.exports = router;
