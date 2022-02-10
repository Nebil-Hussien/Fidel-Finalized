const express = require("express");
let router = express.Router();

const superAdminController = require("../../controllers/apis/superAdmin");

const authenticationController = require("../../controllers/apis/authentication");
const userController = require("../../controllers/apis/user");
const courseController = require("../../controllers/apis/course");
const classRoomController = require("../../controllers/apis/class_room");
const tutorController = require("../../controllers/apis/tutor");
const blackBoardController = require("../../controllers/apis/black_board");

router.use("/super-admin", superAdminController);

router.use("/auth", authenticationController);
router.use("/user", userController);
router.use("/tutor", tutorController);
router.use("/course", courseController);
router.use("/class-room", classRoomController);
router.use("/black-board", blackBoardController);
module.exports = router;
