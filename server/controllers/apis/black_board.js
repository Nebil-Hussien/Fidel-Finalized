const express = require("express");
let router = express.Router();
const { authenticateStudentJWT, authenticateTutorJWT } = require("../../auth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/course_material");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});
const upload = multer({ storage: storage });

const blackBoardService = require("../../services/black_board/black_board");

router.post(
  "/create",
  upload.single("document"),
  authenticateTutorJWT,
  blackBoardService.createBlackBoard
);

router.get("/tutor", authenticateStudentJWT, blackBoardService.getTutor);

//Get BlackBoard By TutorId
router.get(
  "/board/:tutor_id",
  authenticateStudentJWT,
  blackBoardService.getBlackBoardByTutorId
);
router.get(
  "/course/:course_id",
  authenticateStudentJWT,
  blackBoardService.getBlackBoardByCourseId
);

module.exports = router;
