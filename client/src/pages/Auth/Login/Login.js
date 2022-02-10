import axios from "../../../axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import AuthHeader from "../../../components/AuthHeader/AuthHeader";
import Button from "../../../components/Button/Button";
import Form from "../../../components/Form/Form";
import { isEmpty } from "../../../helpers/isEmpty";
import { token } from "../../../utils/token";
import { requests } from "../../../constants/requests";
import Cookies from "universal-cookie";
import '../../../i18next';
import {useTranslation} from "react-i18next"

const Login = () => {
    const {t} = useTranslation();
  const history = useHistory();
  if (token) {
    history.replace("/home");
  }
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("student");

  const [isLoading, setIsLoading] = useState(false);

  const login = async (e) => {
  
    e.preventDefault();
    setIsLoading(true);
    try {
      let loginData;
      let url;
      if (userType === "student") {
        loginData = {
          student: {
            mobile_no: phone,
            password: password,
          },
        };
        url = requests.login;
      } else {
        loginData = {
          tutor: {
            mobile_no: phone,
            password: password,
          },
        };
        url = requests.teacherLogin;
      }
      const { data } = await axios.post(url, loginData);
      if (!data.success) {
        return alert(data.message);
      } else {
        const cookie = new Cookies();
        if (data.role) {
          cookie.set("_role", data.role, { secure: true, path: "/" });
          cookie.set("_tutorIdToken", data.token, { secure: true, path: "/" });
          cookie.set("_tutor-data", data.results, { secure: true, path: "/" });
        } else {
          cookie.set("_idToken", data.token, { secure: true, path: "/" });
          cookie.set("_user-data", data.results, { secure: true, path: "/" });
        }
        window.location.reload();
      }
      setIsLoading(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
      
  };

  return (
    <div className="register">
      <AuthHeader />
      <Form onSubmit={login}>
        <h1 className="heading-primary--main">{t("login_1")}</h1>
        <Form.Group>
          <Form.Label controlId="phone">Phone Number</Form.Label>
          <Form.Control
            type="text"
            controlId="phone"
            placeHolder="phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label controlId="password">Password</Form.Label>
          <Form.Control
            type="password"
            controlId="password"
            placeHolder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Radio
          defaultChecked
          required
          value="student"
          name="user-type"
          label="Student"
          controlId="student"
          onChange={(e) => setUserType(e.target.value)}
        />
        <Form.Radio
          required
          value="teacher"
          name="user-type"
          label="Teacher"
          controlId="teacher"
          onChange={(e) => setUserType(e.target.value)}
        />

        <Button
          disabled={isEmpty(phone, password, userType) || isLoading}
          loading={isLoading}
          type="submit"
        >
          Login
        </Button>
        <p style={{ textAlign: "center" }} className="paragraph">
          <Link to="/register">Create Account</Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
