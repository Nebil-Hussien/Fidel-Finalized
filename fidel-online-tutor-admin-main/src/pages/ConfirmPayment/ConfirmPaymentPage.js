import axios from "../../axios";
import React, { useState } from "react";

import Header from "../../components/Header/Header";
import Container from "../../components/Container/Container";
import { requests } from "../../constants/requests";
import { useEffect } from "react";
import Course from "../../components/Course/Course";
import Loader from "../../components/Loader/Loader";

const ConfirmPaymentPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);

  const getAllCourses = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(requests.getAllCourses);
      if (!data.success) {
        return alert(data.message);
      } else {
        setCourses(data.results);
        console.log(data);
      }
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <Container className="confirm-payment-page">
          <h1 className="heading-primary--main">All Courses</h1>
          <div className="grid">
            {courses &&
              courses.length > 0 &&
              courses.map((course) => (
                <Course
                  key={course._id}
                  title={course.courseName}
                  courseData={course}
                />
              ))}
          </div>
        </Container>
      )}
    </>
  );
};

export default ConfirmPaymentPage;
