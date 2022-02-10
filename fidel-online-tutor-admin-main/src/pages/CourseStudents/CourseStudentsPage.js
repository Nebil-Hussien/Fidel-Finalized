import React, { useEffect } from "react";
import Container from "../../components/Container/Container";
import { Money } from "@mui/icons-material";
import Button from "../../components/Button/Button";
import List from "../../components/List/List";
import Header from "../../components/Header/Header";
import { useHistory, useParams } from "react-router-dom";
import axios from "../../axios";
import { requests } from "../../constants/requests";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";

const CourseStudentsPage = () => {
  const history = useHistory();
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCourseStudents = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(requests.getCourseStudents, {
        params: { course_id: courseId },
      });
      if (!data.success) {
        return alert(data.message);
      } else {
        setStudents(data.results);
        console.log(data, "test");
      }
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCourseStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <h2 className="heading-secondary">Students Payment</h2>
          {students &&
            students.length > 0 &&
            students
              .filter((student) => !student.paid && student.receipt)
              .map((student) => (
                <List
                  key={student.student._id}
                  name={`${student.student.firstName} ${student.student.lastName}`}
                  trailing={
                    <Button
                      onClick={() =>
                        history.push("/confirm-payment/check-receipt", {
                          receipt: student,
                        })
                      }
                    >
                      <Money className="btn__icon small" />
                      Check Receipt
                    </Button>
                  }
                />
              ))}
        </Container>
      )}
    </>
  );
};

export default CourseStudentsPage;
