const express = require("express");
let router = express.Router();
const {
  authSuperPermission,
  authenticateTutorJWT,
  authenticateAll,
} = require("../../auth");

const classRoomService = require("../../services/class_room/class_room");

router.post("/create", authenticateTutorJWT, classRoomService.createClassRoom);

router.post("/add-link", classRoomService.addClassRoomLink);

router.post("/join", authenticateAll, classRoomService.joinClassRoom);

module.exports = router;
