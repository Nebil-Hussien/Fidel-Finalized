import axios from "../../axios";
import React, { useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Question from "../../components/Question/Question";
import Timer from "../../components/Timer/Timer";
import { requests } from "../../constants/requests";
import { _id } from "../../utils/token";

const TestPage = () => {
  const { state } = useLocation();
  const history = useHistory();
  if (!state) {
    history.goBack();
  }
  const question = state.questionData;
  const title = state.courseTitle;

  const score = useRef([]);
  const currentTime = useRef();

  const [isSubmiting, setIsSubmiting] = useState(false);

  const submitTest = async () => {
    const totalScore = score.current.reduce(
      (acc, item) => (acc += item.score),
      0,
    );
    const testData = {
      score: {
        student: _id,
        assessment: question.questionData.assessment,
        score: totalScore,
        timeOfCompletion: currentTime.current,
      },
    };
    setIsSubmiting(true);
    try {
      const { data } = await axios.post(requests.submitTest, testData);
      if (data.success) {
        history.goBack();
      }
    } catch (error) {
      return alert(error);
    } finally {
      setIsSubmiting(false);
    }
  };
  return (
    <>
      <Header />
      <div className="test-page">
        <div className="test-page__title">
          <h2 className="heading-secondary">{`Test ${question.number}`}</h2>
          <Timer
            initialMinute={question.examDuration}
            initialSeconds={0}
            onComplete={submitTest}
            currentTime={currentTime}
          />
        </div>

        <div className="test-page__paper">
          <p className="paragraph">
            {title} {`Test ${question.number}`}
          </p>
          {question.questionData.question.map((q, index, array) => (
            <Question
              key={index}
              question={q}
              number={index + 1}
              score={score}
              id={q._id}
              numberOfQuestions={array.length}
              mark={question.totalMark / array.length}
            />
          ))}
        </div>
        <Button
          disabled={isSubmiting}
          loading={isSubmiting}
          onClick={submitTest}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default TestPage;
