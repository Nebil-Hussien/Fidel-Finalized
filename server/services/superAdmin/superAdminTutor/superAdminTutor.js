const {
  errorMessageWithStatusCode,
  errorMessage,
  resultMessage,
  resultMessageWithUserToken,
  successMessage,
} = require("../../../utils/response_messages");
const {
  DATA_MISSING,
  COURSE_EXISTS,
  NO_DATA,
  SUCCESS,
} = require("../../../constants/messages");

const {
  isEmpty,
  generateHashedPassword,
  JwtToken,
} = require("../../../utils/utils");
const { SUPER_ADMIN_SECRET_KEY } = require("../../../auth");
const Tutor = require("../../../models/tutor");

const createTutor = async (req, res) => {
  const { tutor } = req.body;
  try {
    const isTutorExists = await Tutor.find({
      mobile_no: tutor.mobile_no,
      email: tutor.email,
      userName: tutor.userName,
    });
    if (isEmpty(isTutorExists)) {
      const encryptPassword = await generateHashedPassword(tutor.password);
      const newTutor = new Tutor({
        firstName: tutor.firstName,
        lastName: tutor.lastName,
        gender: tutor.gender,
        age: tutor.age,
        address: {
          subCity: tutor.address.subCity,
          wereda: tutor.address.wereda,
          houseNumber: tutor.address.houseNumber,
          homePhoneNumber: tutor.address.homePhoneNumber,
        },
        mobile_no: tutor.mobile_no,
        email: tutor.email,
        userName: tutor.userName,
        password: encryptPassword,
      });
      const createTutor = await newTutor.save(newTutor);
      if (!isEmpty(createTutor)) {
        const jwtPayload = {
          mobile_no: createTutor.mobile_no,
          email: createTutor.email,
          role: "tutor",
        };

        const token = await JwtToken(jwtPayload, SUPER_ADMIN_SECRET_KEY, null);
        resultMessageWithUserToken(res, token, createTutor);
      } else {
        errorMessageWithStatusCode(res, ERROR_OCCURRED, 400);
      }
    } else {
      errorMessageWithStatusCode(res, USER_ALREADY_REGISTERED, 400);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const getAllTutor = async (req, res) => {
  try {
    const tutors = await Tutor.find();
    if (tutors.length > 0) {
      resultMessage(res, tutors);
    } else {
      errorMessage(res, NO_DATA);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
const getAllActiveTutor = async (req, res) => {
  try {
    const tutors = await Tutor.find({
      actMode: true,
    });
    if (tutors.length > 0) {
      resultMessage(res, tutors);
    } else {
      errorMessage(res, NO_DATA);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};
const getAllBlockedTutor = async (req, res) => {
  try {
    const tutors = await Tutor.find({
      actMode: false,
    });
    if (tutors.length > 0) {
      resultMessage(res, tutors);
    } else {
      errorMessage(res, NO_DATA);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

const changeTutorActivationMode = async (req, res) => {
  const { id, actMode } = req.body;
  try {
    const tutor = await Tutor.findOne({
      _id: id,
    });
    if (tutor != null) {
      await Tutor.updateOne(
        { _id: tutor._id },
        { actMode: actMode },
        { upsert: true }
      );
      successMessage(res, SUCCESS);
    } else {
      errorMessage(res, NO_DATA);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

module.exports = {
  createTutor,
  getAllTutor,
  getAllActiveTutor,
  getAllBlockedTutor,
  changeTutorActivationMode,
};
