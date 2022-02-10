import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import { AddCircle, Delete } from "@mui/icons-material";

const ManageAccountsPage = ({ match }) => {
  return (
    <div className="manage-accounts-page">
      <Header />
      <ul className="manage-accounts-page__options">
        <li className="manage-accounts-page__item">
          <Link to={`${match.path}/add-tutor`} className="btn">
            <AddCircle className="btn__icon" /> Add Tutor
          </Link>
        </li>
        <li className="manage-accounts-page__item">
          <Link to={`${match.path}/user-list`} className="btn">
            <Delete className="btn__icon" /> Activate / Deactivate
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ManageAccountsPage;
