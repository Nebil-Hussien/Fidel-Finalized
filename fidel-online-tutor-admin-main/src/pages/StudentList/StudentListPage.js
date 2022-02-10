import React, { useEffect, useState } from "react";
import { requests } from "../../constants/requests";
import Header from "../../components/Header/Header";
import Container from "../../components/Container/Container";
import List from "../../components/List/List";
import axios from "../../axios";
import Loader from "../../components/Loader/Loader";

const StudentListPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);

  const getAllStudents = async () => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllStudents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <Container className="student-list-page">
          <h2 className="heading-primary--main">Student List</h2>
          {students.map((student, index) => (
            <List
              key={index}
              name={`${student.firstName} ${student.lastName}`}
            />
          ))}
        </Container>
      )}
    </>
  );
};

export default StudentListPage;
