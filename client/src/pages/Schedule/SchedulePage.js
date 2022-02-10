import React from "react";
import Container from "../../components/Container/Container";
import Header from "../../components/Header/Header";
import Schedule from "../../components/Schedule/Schedule";

const SchedulePage = () => {
  return (
    <>
      <Header />
      <Container className="schedule-page">
        <h1 className="heading-primary--main">Next Class</h1>
        <div className="schedule-page__schedule">
          <Schedule title="Introduction to java" date="30/6/2021" />
          <Schedule title="Introduction to java" date="30/6/2021" />
          <Schedule title="Introduction to java" date="30/6/2021" />
          <Schedule title="Introduction to java" date="30/6/2021" />
        </div>
      </Container>
    </>
  );
};

export default SchedulePage;
