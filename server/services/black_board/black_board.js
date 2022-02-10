const { TUTOR_SECRET_KEY } = require("../../auth");
const {
  INVALID_LOGIN,
  ERROR_OCCURRED,
  DUPLICATE_ASSESSMENT,
  SUCCESS,
  NO_DATA,
  NO_NOTE,
} = require("../../constants/messages");
const BlackBoard = require("../../models/blackBoard");
const {
  errorMessageWithStatusCode,
  resultMessageWithUserToken,
  errorMessage,
  resultMessage,
  successMessage,
} = require("../../utils/response_messages");
const { isEmpty } = require("../../utils/utils");

const createBlackBoard = async (req, res) => {
  const blackboard = req.body;
  blackboard.document = req.file.filename;
  try {
    const newBlackBoard = new BlackBoard(blackboard);
    const createNewBlackBoard = await newBlackBoard.save(newBlackBoard);
    if (createNewBlackBoard != null) {
      resultMessage(res, newBlackBoard);
    } else {
      errorMessage(res, ERROR_OCCURRED);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const getTutor = async (req, res) => {
  try {
    const note = await BlackBoard.find().populate("tutor");
    if (note != null) {
      resultMessage(res, note);
    } else {
      errorMessage(res, NO_DATA);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const getBlackBoardByTutorId = async (req, res) => {
  const { tutor_id } = req.params;
  try {
    const blackBoardNote = await BlackBoard.find({ tutor: tutor_id });
    if (blackBoardNote != null) {
      resultMessage(res, blackBoardNote);
    } else {
      errorMessage(res, NO_NOTE);
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

const getBlackBoardByCourseId = async (req, res) => {
  const { course_id } = req.params;
  try {
    const blackBoardNote = await BlackBoard.find({ course: course_id });
    if (blackBoardNote.length != 0) {
      resultMessage(res, blackBoardNote);
    } else {
      errorMessage(res, NO_NOTE);
    }
  } catch (error) {
    catchHandler(error, next);
  }
};

module.exports = {
  createBlackBoard,
  getTutor,
  getBlackBoardByTutorId,
  getBlackBoardByCourseId,
};
