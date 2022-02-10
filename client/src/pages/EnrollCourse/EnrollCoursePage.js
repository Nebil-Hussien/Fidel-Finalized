import { Cancel, Check, Send } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Popup from "../../components/Popup/Popup";
import Upload from "../../components/Upload/Upload";
import moment from "moment";
import axios from "../../axios";
import { requests } from "../../constants/requests";
import { _id } from "../../utils/token";

const EnrollCoursePage = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const history = useHistory();
  const { state } = useLocation();
  if (!state) history.goBack();
  const { course, isEnrolled } = state;
  console.log(state);

  const [isLoading, setIsLoading] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [totalStudents, setTotalStudents] = useState(0);
  const [enrollmentData, setEnrollmentData] = useState(null);
  const getTotalEnrolledStudents = async () => {
    try {
      const { data } = await axios.get(requests.getTotalEnrolledStudents, {
        params: { course_id: course.course._id },
      });
      if (data.success && data.results) {
        setTotalStudents(data.results);
      }
    } catch (error) {
      return alert(error);
    }
  };

  const enrollCourse = async () => {
    setIsEnrolling(true);
    const enrollmentData = {
      course: {
        student: _id,
        course: course.course._id,
      },
    };
    try {
      const { data } = await axios.post(requests.enrollCourse, enrollmentData);
      if (data.success && data.results) {
        console.log(data);
        setEnrollmentData(data.results);
      } else {
        alert(data.message);
      }
    } catch (error) {
      return alert(error.message);
    } finally {
      setIsEnrolling(false);
    }
  };

  const submitPayment = async (file) => {
    setIsSubmiting(true);
    const submitData = new FormData();
    submitData.append(
      "student",
      isEnrolled ? course.student : enrollmentData.student,
    );
    submitData.append(
      "course_enrollment",
      isEnrolled ? course._id : enrollmentData._id,
    );
    submitData.append("image", file);
    try {
      const { data } = await axios.post(requests.submitEnrollement, submitData);
      if (data.success) {
        setOpenPopup(false);
        alert("Payment verification success");
      }
    } catch (error) {
      return alert(error.message);
    } finally {
      setIsSubmiting(false);
      setOpenPopup(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getTotalEnrolledStudents();
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Popup open={openPopup} close={() => setOpenPopup(false)}>
        <h1 className="heading-secondary">Upload Bank Receipt</h1>
        <Upload
          isUploading={isSubmiting}
          fileType="image"
          onSubmit={submitPayment}
        />
      </Popup>
      <div className="enroll-course-page">
        <ul className="enroll-course-page__detail">
          <li className="enroll-course-page__detail-item">
            <span className="enroll-course-page__detail-item__label">
              Course Name
            </span>
            <span className="enroll-course-page__detail-item__value">
              {course.course.courseName}
            </span>
          </li>
          <li className="enroll-course-page__detail-item">
            <span className="enroll-course-page__detail-item__label">
              Provided by
            </span>
            <span className="enroll-course-page__detail-item__value">
              {`${
                course.tutor
                  ? course.tutor.firstName
                  : course.course.tutor.firstName
              } ${
                course.tutor
                  ? course.tutor.lastName
                  : course.course.tutor.lastName
              }`}
            </span>
          </li>
          <li className="enroll-course-page__detail-item">
            <span className="enroll-course-page__detail-item__label">
              Course Tuition fee
            </span>
            <span className="enroll-course-page__detail-item__value">
              {course.course.tutionFee.toFixed(2)} ETB per hour
            </span>
          </li>
          <li className="enroll-course-page__detail-item">
            <span className="enroll-course-page__detail-item__label">
              Course Duration
            </span>
            <span className="enroll-course-page__detail-item__value">
              {moment(course.createdAt)
                .diff(course.course.duration, "days")
                .toLocaleString()}{" "}
              days
            </span>
          </li>
          <li className="enroll-course-page__detail-item">
            <span className="enroll-course-page__detail-item__label">
              Course delivery language
            </span>
            <span className="enroll-course-page__detail-item__value">
              {course.course.delivery_Lang}
            </span>
          </li>
          <li className="enroll-course-page__detail-item">
            <span className="enroll-course-page__detail-item__label">
              No. of students enrolled
            </span>
            <span className="enroll-course-page__detail-item__value">
              {isLoading ? "..." : totalStudents}
            </span>
          </li>
        </ul>
        <div className="enroll-course-page__button">
          {!enrollmentData && !isEnrolled ? (
            <>
              <Button
                loading={isEnrolling}
                disabled={isEnrolling}
                onClick={enrollCourse}
                success
              >
                <Check className="btn__icon small" /> Enroll
              </Button>
              <div className="sized-box w-lg"></div>
              <Button onClick={() => history.goBack()} danger>
                <Cancel className="btn__icon small" /> Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={() => setOpenPopup(true)} success>
                <Send className="btn__icon small" /> Send Receipt
              </Button>
              <div className="sized-box w-lg"></div>
              <Button onClick={() => history.goBack()}>
                <Cancel className="btn__icon small" />
                Send Later
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default EnrollCoursePage;
