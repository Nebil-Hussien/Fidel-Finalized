const express = require("express");
let router = express.Router();
const {
  authenticateStudentJWT,
  authSuperPermission,
  authenticateAll,
} = require("../../auth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/payment");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});
const upload = multer({ storage: storage });
const courseService = require("../../services/course/course");

router.get(
  "/student/:id",
  authenticateStudentJWT,
  courseService.getEnrolledCourse
);

router.post(
  "/enroll",
  upload.single("image"),
  authenticateStudentJWT,
  courseService.enrollCourse
);

router.post(
  "/course-payment-status",
  authSuperPermission,
  courseService.updateCoursePaymentStatus
);

router.post(
  "/student/submit-payment-verification",
  upload.single("image"),
  authenticateStudentJWT,
  courseService.submitCoursePaymentVerification
);
router.get(
  "/student/payment-receipt",
  authSuperPermission,
  courseService.getStudentPaymentReceipt
);
router.get(
  "/student-paid",
  authSuperPermission,
  courseService.getAllPaidStudents
);

router.get(
  "/all/enrolledCourse",
  authSuperPermission,
  courseService.getAllEnrolledCourses
);
router.get(
  "/all/student-enrolled",
  authSuperPermission,
  courseService.getAllEnrolledStudents
);

router.get("/all-assigned-course", courseService.getAllAssignedCourse);

router.get("/all", authSuperPermission, courseService.getAllCourse);

router.post("/assign", authSuperPermission, courseService.assignCourse);

router.get(
  "/total-enrolled",
  authenticateAll,
  courseService.getAllTotalEnrolledStudents
);

router.get("/material", authenticateAll, courseService.getAllCourseMaterials);
router.get(
  "/material/download",
  authenticateAll,
  courseService.downloadCourseMaterial
);
router.get("/search-all", courseService.searchAllCourses);
router.get("/search-assigned", courseService.searchAssignedCourses);
module.exports = router;
