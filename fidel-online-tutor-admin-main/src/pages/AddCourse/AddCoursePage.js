import axios from "../../axios";
import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Form from "../../components/Form/Form";
import Header from "../../components/Header/Header";
import { requests } from "../../constants/requests";
import { isEmpty } from "../../helpers/isEmpty";
import { Close } from "@mui/icons-material";
import moment from "moment";
import { useHistory } from "react-router";

const AddCoursePage = () => {
  const [name, setName] = useState("");
  const [fee, setFee] = useState(0);
  const [language, setLanguage] = useState("");
  const [schedule, setSchedule] = useState("");
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const handleSchedules = () => {
    if (isEmpty(schedule)) {
      return alert("Please Enter Schedule");
    }
    setSchedules((prevSchedules) => [...prevSchedules, schedule]);
  };

  const handleRemoveSchedule = (id) => {
    setSchedules((prevSchedules) =>
      prevSchedules.filter((_, index) => index !== id),
    );
  };

  const createCourse = async (e) => {
    e.preventDefault();

    const courseData = {
      course: {
        courseName: name,
        tutionFee: fee,
        delivery_Lang: language,
        schedule: schedules,
      },
    };
    setIsLoading(true);
    try {
      const { data } = await axios.post(requests.createCourse, courseData);
      if (!data.success) {
        return alert(data.message);
      } else {
        if (window.confirm("Course Added! Do you want to add more")) {
          return;
        } else {
          history.push("/");
        }
      }
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container className="add-course-page">
        <Form onSubmit={createCourse}>
          <h1 className="heading-primary--main">Add Course</h1>
          <Form.Group>
            <Form.Label controlId="name">Course Name</Form.Label>
            <Form.Control
              controlId="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeHolder="Enter course name"
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label controlId="fee">
              Course Tution Fee (per hour)
            </Form.Label>
            <Form.Control
              controlId="fee"
              type="number"
              value={fee}
              placeHolder="Enter course fee"
              required
              onChange={(e) => setFee(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label controlId="lang">Course Delivery Language</Form.Label>
            <Form.Control
              type="text"
              controlId="lang"
              value={language}
              placeHolder="Enter course delivery language"
              required
              onChange={(e) => setLanguage(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label controlId="schedule">Schedule (Multiple)</Form.Label>
            <Form.Control
              type="datetime-local"
              controlId="schedule"
              value={schedule}
              placeHolder="Enter course delivery language"
              required
              onChange={(e) => setSchedule(e.target.value)}
            />
          </Form.Group>
          {schedules.map((schedule, index) => (
            <div key={index} className="add-course-page__schedule-card">
              <p className="paragraph">{moment(schedule).format("LLLL")}</p>
              <Close
                className="add-course-page__schedule-card-icon"
                onClick={() => handleRemoveSchedule(index)}
              />
            </div>
          ))}
          <Button type="button" onClick={handleSchedules} outlined>
            Add Schedule
          </Button>
          <Button disabled={isLoading} loading={isLoading} type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddCoursePage;
