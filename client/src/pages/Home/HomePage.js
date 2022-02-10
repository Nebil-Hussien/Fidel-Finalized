import { Today } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import Course from "../../components/Course/Course";
import Header from "../../components/Header/Header";
import { requests } from "../../constants/requests";
import { isTutor, _id } from "../../utils/token";
import axios from "../../axios";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [myCourses, setMyCourses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState({ myCourses: null, allCourses: null });

  const history = useHistory();

  const getMyCourses = async () => {
    let url;
    let params;
    if (!isTutor) {
      url = `${requests.getMyCourses}/${_id}`;
    } else {
      url = requests.getMyCourses;
      params = { tutor_id: _id };
    }
    const { data } = await axios.get(url, { params });
    try {
      if (data.success && data.results) {
        console.log(data);
        setMyCourses(data.results);
      } else {
        setMessage({ myCourses: data.message, allCourses: message.allCourses });
      }
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  const getAllCourses = async () => {
    const { data } = await axios.get(requests.getAllCourses);
    console.log(data);
    try {
      if (data.success && data.results) {
        setCourses(data.results);
      } else {
        setMessage({
          myCourses: message.myCourses,
          allCourses: data.message,
        });
      }
    } catch (error) {
      alert(error.message);
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    await getMyCourses();
    if (!isTutor) {
      await getAllCourses();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchData();
    }
    return (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="home-page">
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <div className="home-page__my-courses">
            <h1 className="heading-primary--main">My Courses</h1>
            <div className="grid">
              {myCourses.length > 0 ? (
                myCourses.map((course, index) => (
                  <Course
                    key={index}
                    title={course.course.courseName}
                    instructor={`${course.course.tutor.firstName} ${course.course.tutor.lastName}`}
                    courseData={course}
                  />
                ))
              ) : (
                <Message variant="info">No data found</Message>
              )}
            </div>
          </div>
          {!isTutor && (
            <div className="home-page__new-courses">
              <h1 className="heading-primary--main">New Courses</h1>
              <div className="grid">
                {courses.length > 0 ? (
                  courses.map((course, index) => (
                    <Course
                      key={index}
                      newCourse
                      title={course.course.courseName}
                      instructor={`${course.tutor.firstName} ${course.tutor.lastName}`}
                      courseData={course}
                    />
                  ))
                ) : (
                  <Message variant="info">{message.allCourses}</Message>
                )}
              </div>
            </div>
          )}
          <div className="home-page__schedules">
            <h1 className="heading-primary--main">My Schedule</h1>
            <Button onClick={() => history.push("/schedule")}>
              <Today className="btn__icon" /> <span>View Schedule</span>
            </Button>
          </div>
        </Container>
      )}
    </div>
  );
};

export default HomePage;
