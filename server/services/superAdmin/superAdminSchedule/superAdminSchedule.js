const {
  errorMessageWithStatusCode,

  errorMessage,
  resultMessage,
  successMessage,
} = require("../../../utils/response_messages");
const {
  DATA_MISSING,
  COURSE_EXISTS,
  NO_DATA,
  SUCCESS,
  ERROR_OCCURRED,
} = require("../../../constants/messages");

const Schedule = require("../../../models/schedule");

const createSchedule = async (req, res) => {
  const { schedule } = req.body;
  try {
    const newSchedule = new Schedule(schedule);
    // var schedules = [];
    // schedules = schedule.schedule_date;
    // const isScheduleExists = await Schedule.findOne({
    //   schedules.find((schedule)=>{

    //   })
    // });
    const createSchedule = await newSchedule.save(newSchedule);
    if (createSchedule != null) {
      resultMessage(res, newSchedule);
    } else {
      errorMessage(res, ERROR_OCCURRED);
    }
  } catch (error) {
    errorMessageWithStatusCode(res, error.message, 400);
  }
};

module.exports = {
  createSchedule,
};
