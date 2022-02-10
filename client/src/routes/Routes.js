import React from "react";
import "../i18next";
import { Route, Switch } from "react-router-dom";
import AddTestPage from "../pages/AddTest/AddTestPage";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import CoursePage from "../pages/Course/CoursePage";
import EnrollCoursePage from "../pages/EnrollCourse/EnrollCoursePage";
import HomePage from "../pages/Home/HomePage";
import LandingPage from "../pages/LandingPage/LandingPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SchedulePage from "../pages/Schedule/SchedulePage";
import StudentListPage from "../pages/StudentList/StudentListPage";
import TestPage from "../pages/Test/TestPage";
import ProtectedRoute from "./ProtectedRoute";


const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={LandingPage} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <ProtectedRoute path="/home" component={HomePage} />
      <ProtectedRoute path="/home/tutor" component={HomePage} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <ProtectedRoute path="/course/:courseId" component={CoursePage} />
      <ProtectedRoute path="/enroll-course" component={EnrollCoursePage} />
      <ProtectedRoute path="/schedule" component={SchedulePage} />
      <ProtectedRoute path="/add-test/:courseId" component={AddTestPage} />
      <ProtectedRoute path="/start-test" component={TestPage} />
      <ProtectedRoute path="/students-list" component={StudentListPage} />
    </Switch>
  );
};

export default Routes;
