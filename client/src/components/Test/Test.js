import React from "react";
import { QuizOutlined } from "@material-ui/icons/";
import { isTutor } from "../../utils/token";
import { useHistory } from "react-router-dom";
import moment from "moment";

const Test = ({ title, score, questionData, courseTitle, totalMark }) => {
  const history = useHistory();

  const now = moment(new Date());
  const examDate =
    questionData.dateOfExamination || questionData.assessment.dateOfExamination;
  // const difference = examDate.diff(examDate, "days");

  const difference = moment.duration(now.diff(examDate)).humanize();

  return (
    <div className="test">
      <div className="test__box">
        <QuizOutlined className="test__icon" />
      </div>
      <p className="paragraph">{title}</p>
      {!isTutor &&
        (score !== null ? (
          <p className="paragraph">
            Score: <i>{`${score} / ${totalMark}`}</i>
          </p>
        ) : (new Date(questionData.dateOfExamination) ||
            new Date(questionData.assessment.dateOfExamination)) <=
          new Date() ? (
          <p
            onClick={() =>
              history.push("/start-test", { questionData, courseTitle })
            }
            className="paragraph link"
          >
            Start
          </p>
        ) : (
          <p className="paragraph">Start in {difference}</p>
        ))}
    </div>
  );
};

export default Test;
