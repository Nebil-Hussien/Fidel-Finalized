import React, { useEffect, useState } from "react";
import { requests } from "../../constants/requests";
import axios from "../../axios";
import Loader from "../../components/Loader/Loader";
import Container from "../../components/Container/Container";
import List from "../../components/List/List";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Divider from "../../components/Divider/Divider";

const UsersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const getAllStudents = async () => {
    try {
      const { data } = await axios.get(requests.getAllStudents);
      if (!data.success) {
        return alert(data.message);
      } else {
        setStudents(data.results);
      }
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const getAllTutors = async () => {
    try {
      const { data } = await axios.get(requests.getAllTutors);
      if (!data.success) {
        return alert(data.message);
      } else {
        setTutors(data.results);
      }
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    await getAllStudents();
    await getAllTutors();
    setIsLoading(false);
  };

  const changeAccountStatus = async (actMode, id, userType) => {
    setIsChangingStatus(true);
    setCurrentId(id);
    let url;
    if (userType === "tutor") {
      url = requests.changeTutorAccountStatus;
    } else {
      url = requests.changeStudentAccountStatus;
    }
    try {
      const { data } = await axios.post(url, {
        id,
        actMode: !actMode,
      });
      if (!data.success) {
        return alert(data.message);
      } else {
        alert(
          `Account ${actMode ? "Deactivated" : "Activated"} Successfully!!`,
        );
        fetchData();
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsChangingStatus(false);
      setCurrentId("");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <Container className="users-page">
          <div className="user-page__title">
            <h1 className="heading-primary--main">
              Activate / Deactivate User
            </h1>
          </div>
          <div className="users-page__students">
            <h2 className="heading-secondary">Students List</h2>
            {students.map((student, index) => (
              <List
                key={index}
                name={`${student.firstName} ${student.lastName}`}
                trailing={
                  <Button
                    disabled={isChangingStatus}
                    loading={isChangingStatus && currentId === student._id}
                    onClick={() =>
                      changeAccountStatus(
                        student.actMode,
                        student._id,
                        "student",
                      )
                    }
                    success={!student.actMode}
                    danger={student.actMode}
                  >
                    {student.actMode ? "Deactivate" : "Activate"}
                  </Button>
                }
              />
            ))}
          </div>
          <Divider />
          <div className="users-page__tutors">
            <h2 className="heading-secondary">Tutors List</h2>
            {tutors.map((tutor, index) => (
              <List
                key={index}
                name={`${tutor.firstName} ${tutor.lastName}`}
                trailing={
                  <Button
                    disabled={isChangingStatus}
                    loading={isChangingStatus && currentId === tutor._id}
                    onClick={() =>
                      changeAccountStatus(tutor.actMode, tutor._id, "tutor")
                    }
                    success={!tutor.actMode}
                    danger={tutor.actMode}
                  >
                    {tutor.actMode ? "Deactivate" : "Activate"}
                  </Button>
                }
              />
            ))}
          </div>
        </Container>
      )}
    </>
  );
};

export default UsersPage;
