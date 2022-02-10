import { AddBoxOutlined, Cancel, Check } from "@material-ui/icons";
import axios from "../../axios";
import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Choice from "../../components/Choice/Choice";
import Container from "../../components/Container/Container";
import Form from "../../components/Form/Form";
import Header from "../../components/Header/Header";
import { requests } from "../../constants/requests";
import { isEmpty } from "../../helpers/isEmpty";
import { useHistory, useParams } from "react-router-dom";
import { _id } from "../../utils/token";

const AddTestPage = () => {
  const { courseId } = useParams();
  const history = useHistory();

  const [testType, setTestType] = useState("");
  const [testDuratuion, setTestDuration] = useState("");
  const [totalMark, setTotalMark] = useState(10);
  const [testDate, setTestDate] = useState();
  const [question, setQuestion] = useState("");
  const [choice, setChoice] = useState("");
  const [answer, setAnswer] = useState("");
  const [choices, setChoices] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [choiceNumber, setChoiceNumber] = useState(1);
  const [testNumber, setTestNumber] = useState("");

  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChoice = () => {
    if (isEmpty(choice)) {
      return alert("Please enter choice");
    }
    if (choiceNumber === 5) {
      return alert("You can't add more choice.");
    }
    setChoiceNumber((prevChoice) => prevChoice + 1);
    setChoices((prevChoices) => [...prevChoices, choice]);
    setChoice("");
  };

  const handleQuestion = () => {
    if (isEmpty(question, choices, answer)) {
      return alert("Please fill out all fields");
    }
    setQuestionNumber((prevChoice) => prevChoice + 1);
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        question,
        answer: answer,
        choice1: choices[0],
        choice2: choices[1],
        choice3: choices[2],
        choice4: choices[3],
      },
    ]);
    setQuestion("");
    setChoice("");
    setChoiceNumber(1);
    setChoices([]);
  };

  const createTest = async () => {
    if (
      isEmpty(
        questions,
        testDuratuion,
        testDate,
        testNumber,
        totalMark,
        testType,
      )
    ) {
      return alert("Please fill out all fields");
    }
    const testData = {
      assessment: {
        type: testType,
        number: testNumber,
        course: courseId,
        tutor: _id,
        dateOfExamination: testDate,
        examDuration: testDuratuion,
        totalMark: totalMark,
        question: {
          assessment: "",
          question: questions,
        },
      },
    };
    setIsLoading(true);
    try {
      const { data } = await axios.post(requests.createTest, testData);
      if (data.success) {
        alert("Test Created!");
        history.goBack();
      } else {
        alert(data.message);
      }
    } catch (error) {
      return alert(error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(questions);
  return (
    <>
      <Header />
      <div className="add-test-page">
        <Container>
          <h2 className="heading-secondary">Add Test</h2>
          <div className="add-test-page__options">
            <Form.Group>
              <Form.Label controlId="type">Test Type</Form.Label>
              <Form.Select
                controlId="type"
                value={testType}
                onChange={(e) => setTestType(e.target.value)}
                options={[
                  { value: "quiz", name: "Quiz" },
                  { value: "test", name: "Test" },
                ]}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label controlId="time">
                Test Duration (In Minutes)
              </Form.Label>
              <Form.Control
                placeHolder="Enter test duration"
                min={1}
                controlId="time"
                onChange={(e) => {
                  setTestDuration(e.target.value);
                }}
                value={testDuratuion}
                type="number"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label controlId="date">Test Date</Form.Label>
              <Form.Control
                controlId="date"
                onChange={(e) => {
                  setTestDate(e.target.value);
                }}
                value={testDate}
                type="date"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label controlId="num">Test Number</Form.Label>
              <Form.Control
                controlId="num"
                onChange={(e) => {
                  setTestNumber(e.target.value);
                }}
                value={testNumber}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label controlId="mark">Total Mark</Form.Label>
              <Form.Control
                min={5}
                controlId="mark"
                onChange={(e) => {
                  setTotalMark(e.target.value);
                }}
                value={totalMark}
                type="number"
              />
            </Form.Group>
          </div>
          <div className="add-test-page__questions-box">
            <h2 className="heading-secondary">Questions</h2>
            <Form.Group>
              <Form.Label controlId="question">
                Question {questionNumber}
              </Form.Label>
              <Form.Control
                placeHolder="Enter question"
                controlId="question"
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label controlId="choice">Choice {choiceNumber}</Form.Label>
              <Form.Control
                placeHolder="Enter choice"
                controlId="choice"
                onChange={(e) => setChoice(e.target.value)}
                value={choice}
                type="text"
              />
            </Form.Group>
            <Button onClick={handleChoice}>
              <AddBoxOutlined className="btn__icon small" />
              Add Choice
            </Button>
            <div className="add-test-page__choices">
              <p className="paragraph">Select the correct choice</p>
              {choices.map((choice, index) => (
                <Choice
                  key={index}
                  choice={choice}
                  onChoose={(e) => setAnswer(e.target.value)}
                />
              ))}
            </div>
            <Button onClick={handleQuestion}>
              <AddBoxOutlined className="btn__icon small" />
              Add Question
            </Button>
          </div>
          <div className="add-test-page__buttons">
            <div></div>
            <Button
              disabled={isLoading}
              loading={isLoading}
              onClick={createTest}
              success
            >
              <Check className="btn__icon small" /> Save
            </Button>
            <span className="sized-box w-lg"></span>
            <Button onClick={() => {}} danger>
              <Cancel className="btn__icon small" />
              Discard
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AddTestPage;
