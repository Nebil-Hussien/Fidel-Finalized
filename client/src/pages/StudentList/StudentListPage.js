import React, { useEffect, useState } from "react";
import { requests } from "../../constants/requests";
import { isTutor } from "../../utils/token";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Container from "../../components/Container/Container";
import StudentList from "../../components/StudentList/StudentList";

const StudentListPage = () => {
  const { courseId } = useParams();

  const [totalStudents, setTotalStudents] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getTotalEnrolledStudents = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(requests.getTotalEnrolledStudents, {
        params: { course_id: courseId },
      });
      console.log(data);
      if (data.success && data.results) {
        setTotalStudents(data.results);
      }
    } catch (error) {
      return alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isTutor) {
      getTotalEnrolledStudents();
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header />
      <Container className="student-list-page">
        <h2 className="heading-secondary">Introduction to Java</h2>
        <p className="paragraph">
          {isLoading
            ? "..."
            : `# ${
                totalStudents === 0
                  ? "No of Students enrolled in this course"
                  : `${totalStudents} Student${
                      totalStudents > 1 ? "s" : ""
                    } enrolled in this course`
              }`}
        </p>
        <div className="student-list-page__list">
          <h2 className="heading-secondary">Student List</h2>
          <StudentList name="Betelehem Haile" />
          <StudentList name="Betelehem Haile" />
          <StudentList name="Betelehem Haile" />
          <StudentList name="Betelehem Haile" />
          <StudentList name="Betelehem Haile" />
        </div>
      </Container>
    </>
  );
};

export default StudentListPage;
