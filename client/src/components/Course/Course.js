import React from "react";
import { useHistory } from "react-router-dom";
import { isTutor } from "../../utils/token";
import Button from "../Button/Button";

const Course = ({ title, instructor, newCourse, courseData }) => {
  const history = useHistory();

  const handleCourse = () => {
    if (!isTutor && !courseData.receipt) {
      if (
        window.confirm("You haven't send receipt yet. Do you want to send?")
      ) {
        history.push("/enroll-course", {
          course: courseData,
          isEnrolled: true,
        });
      } else {
        return;
      }
    } else if (!isTutor && courseData.receipt && !courseData.paid) {
      return alert("Your payment reciept is under review.Please wait!!");
    } else {
      history.push(`/course/${courseData.course._id}`, {
        title: courseData.course.courseName,
        instructor,
        tutor: courseData.course.tutor || courseData.tutor._id,
      });
    }
  };
  return (
    <div onClick={newCourse ? () => {} : handleCourse}>
      <div className="course">
        <div className="course__top"></div>
        <div className="course__content">
          <p className="paragraph">{title}</p>
          <p className="paragraph">By: {instructor}</p>
        </div>
      </div>
      {newCourse && (
        <Button
          onClick={() => history.push("/enroll-course", { course: courseData })}
        >
          Enroll
        </Button>
      )}
    </div>
  );
};

export default Course;
