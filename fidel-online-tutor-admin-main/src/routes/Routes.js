import React from "react";
import { Route, Switch } from "react-router-dom";
import AddCoursePage from "../pages/AddCourse/AddCoursePage";
import AddTutorPage from "../pages/AddTutor/AddTutorPage";
import Login from "../pages/Auth/Login/Login";
import CheckReceiptPage from "../pages/CheckReceipt/CheckReceiptPage";
import ConfirmPaymentPage from "../pages/ConfirmPayment/ConfirmPaymentPage";
import CourseStudentsPage from "../pages/CourseStudents/CourseStudentsPage";
import HomePage from "../pages/Home/HomePage";
import ManageAccountsPage from "../pages/ManageAccounts/ManageAccountsPage";
import StudentListPage from "../pages/StudentList/StudentListPage";
import UsersPage from "../pages/Users/UsersPage";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={HomePage} />
      <ProtectedRoute path="/student-list" component={StudentListPage} />
      <ProtectedRoute
        exact
        path="/confirm-payment"
        component={ConfirmPaymentPage}
      />
      <ProtectedRoute
        path="/confirm-payment/check-receipt"
        component={CheckReceiptPage}
      />
      <ProtectedRoute
        path="/confirm-payment/students/:courseId"
        component={CourseStudentsPage}
      />
      <ProtectedRoute path="/manage-accounts/user-list" component={UsersPage} />
      <ProtectedRoute
        exact
        path="/manage-accounts/add-tutor"
        component={AddTutorPage}
      />
      <ProtectedRoute
        exact
        path="/manage-accounts"
        component={ManageAccountsPage}
      />
      <ProtectedRoute path="/add-course" component={AddCoursePage} />
    </Switch>
  );
};

export default Routes;
