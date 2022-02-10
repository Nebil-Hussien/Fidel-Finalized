import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import {
  AddCircle,
  ManageAccounts,
  Money,
  Visibility,
} from "@mui/icons-material";

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <ul className="home-page__options">
        <li className="home-page__item">
          <Link to="/student-list" className="btn">
            <Visibility className="btn__icon" /> View Student List
          </Link>
        </li>
        <li className="home-page__item">
          <Link to="/confirm-payment" className="btn">
            <Money className="btn__icon" /> Confirm Payment
          </Link>
        </li>
        <li className="home-page__item">
          <Link to="/manage-accounts" className="btn">
            <ManageAccounts className="btn__icon" /> Manage Accounts
          </Link>
        </li>
        <li className="home-page__item">
          <Link to="/add-course" className="btn">
            <AddCircle className="btn__icon" /> Add Course
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
