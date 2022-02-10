const {
  errorMessageWithStatusCode,
  errorMessage,
  resultMessage,
  socketEmit,
  successMessage,
} = require("../../utils/response_messages");
const ClassRoom = require("../../models/classRoom");
const {
  CLASSROOM_EXISTS,
  ERROR_OCCURRED,
  NO_CLASSROOM,
  SUCCESS,
} = require("../../constants/messages");
const { NEW_CLASS } = require("../../constants/socket_messages");
const createClassRoom = async (req, res) => {
  const { classRoom } = req.body;
  try {
    const isClassRoomExists = await ClassRoom.findOne({
      course: classRoom.course,
      tutor: classRoom.tutor,
    });
    if (isClassRoomExists == null) {
      const newClassRoom = new ClassRoom(classRoom);
      const createNewClassRoom = newClassRoom.save(newClassRoom);
      if (createNewClassRoom != null) {
        resultMessage(res, newClassRoom);
      } else {
        errorMessage(res, ERROR_OCCURRED);
      }
    } else {
      errorMessage(res, CLASSROOM_EXISTS);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const addClassRoomLink = async (req, res) => {
  const { link, class_room_id } = req.body;
  console.log(link);
  try {
    const classRoom = await ClassRoom.findOne({
      _id: class_room_id,
    });
    if (classRoom) {
      await ClassRoom.updateOne(
        { _id: classRoom._id },
        { link: link },
        { upsert: true }
      );
      const newClassRoom = await ClassRoom.findOne({
        _id: class_room_id,
      });
      socketEmit(res, NEW_CLASS, newClassRoom);

      successMessage(res, SUCCESS);
    } else {
      errorMessage(res, NO_CLASSROOM);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const joinClassRoom = async (req, res) => {
  const { student_id, classroom_id } = req.body;
  try {
    const classRoom = await ClassRoom.findOne({
      _id: classroom_id,
    });
    const students = [...classRoom.students];
    students.push(student_id);
    if (classRoom) {
      await ClassRoom.updateOne(
        { _id: classRoom._id },
        { student: students },
        { upsert: true }
      );
    } else {
      errorMessage(res, NO_CLASSROOM);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

module.exports = {
  createClassRoom,
  addClassRoomLink,
  joinClassRoom,
};
