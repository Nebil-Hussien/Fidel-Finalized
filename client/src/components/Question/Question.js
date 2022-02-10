import React from "react";
import Choice from "../Choice/Choice";

const Question = ({ id, number, question, score, mark, numberOfQuestions }) => {
  const handleStudentChoice = (e) => {
    if (question.answer === e.target.value) {
      score.current.push({ id, score: mark });
    } else {
      if (score.current.length === 0) {
        return;
      } else {
        const index = score.current.findIndex((item) => item.id === id);
        if (index === -1) return;
        score.current.splice(index, 1);
      }
    }
  };

  return (
    <div className="question">
      <p className="paragraph">{`${number}) ${question.question}`}</p>
      <div className="question__choices">
        <Choice
          onChoose={handleStudentChoice}
          choice={question.choice1}
          name={id}
        />
        <Choice
          onChoose={handleStudentChoice}
          choice={question.choice2}
          name={id}
        />
        <Choice
          onChoose={handleStudentChoice}
          choice={question.choice3}
          name={id}
        />
        <Choice
          onChoose={handleStudentChoice}
          choice={question.choice4}
          name={id}
        />
      </div>
    </div>
  );
};

export default Question;
