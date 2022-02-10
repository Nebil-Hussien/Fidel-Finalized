import React, { useState } from "react";
import AuthHeader from "../../../components/AuthHeader/AuthHeader";
import Button from "../../../components/Button/Button";
import Form from "../../../components/Form/Form";
import { requests } from "../../../constants/requests";
import { isEmpty } from "../../../helpers/isEmpty";
import axios from "../../../axios";
import Cookies from "universal-cookie";
import { token } from "../../../utils/token";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  if (token) {
    history.replace("/home");
  }
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [subCity, setSubCity] = useState("");
  const [wereda, setWereda] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [homePhoneNumber, setHomePhoneNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("M");
  const [rePassword, setRePassword] = useState("");
  const [terms, setTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();

    if (password.trim() !== rePassword.trim()) {
      return alert("Password donot match!");
    }

    setIsLoading(true);
    try {
      const registerData = {
        student: {
          firstName,
          lastName,
          gender,
          dateOfBirth: birthDate,
          address: {
            subCity,
            wereda,
            houseNumber,
            homePhoneNumber,
          },
          mobile_no: phone,
          email,
          userName,
          password,
        },
      };
      const { data } = await axios.post(requests.register, registerData);
      if (!data.success) {
        return alert(data.message);
      } else {
        const cookie = new Cookies();
        cookie.set("_idToken", data.token, { secure: true, path: "/" });
        cookie.set("_user-data", data.results, { secure: true, path: "/" });
        window.location.reload();
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <AuthHeader />
      <Form onSubmit={register}>
        <h1 className="heading-primary--main">Register</h1>
        <Form.Group>
          <Form.Label controlId="f-name">First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            controlId="f-name"
            placeHolder="first name"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label controlId="l-name">Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            controlId="l-name"
            placeHolder="last name"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label controlId="u-name">User Name</Form.Label>
          <Form.Control
            type="text"
            value={userName}
            controlId="u-name"
            placeHolder="user name"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label controlId="date">Date Of Birth</Form.Label>
          <Form.Control
            type="date"
            value={birthDate}
            controlId="date"
            required
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label controlId="sub">Sub City</Form.Label>
          <Form.Control
            type="text"
            value={subCity}
            controlId="sub"
            placeHolder="sub city"
            required
            onChange={(e) => setSubCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label controlId="wereda">Wereda</Form.Label>
          <Form.Control
            type="text"
            value={wereda}
            controlId="wereda"
            placeHolder="wereda"
            required
            onChange={(e) => setWereda(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label controlId="h-number">House Number</Form.Label>
          <Form.Control
            type="text"
            value={houseNumber}
            controlId="h-number"
            placeHolder="house number"
            required
            onChange={(e) => setHouseNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label controlId="h-p-number">Home Phone Number</Form.Label>
          <Form.Control
            type="text"
            value={homePhoneNumber}
            controlId="h-p-number"
            placeHolder="home phone number"
            required
            onChange={(e) => setHomePhoneNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label controlId="p-number">Phone number</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            controlId="p-number"
            placeHolder="phone number"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label controlId="email">Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            controlId="email"
            placeHolder="e-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Gender</Form.Label>
          <br />
          <Form.Radio
            defaultChecked
            required
            controlId="male"
            value="M"
            name="gender"
            label="Male"
            onChange={(e) => setGender(e.target.value)}
          />
          <Form.Radio
            required
            controlId="female"
            value="F"
            name="gender"
            label="Female"
            onChange={(e) => setGender(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label controlId="password">Password</Form.Label>
          <Form.Control
            value={password}
            type="password"
            controlId="password"
            placeHolder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label controlId="re-password">Re-enter Password</Form.Label>
          <Form.Control
            value={rePassword}
            type="password"
            controlId="re-password"
            placeHolder="re-enter password"
            required
            onChange={(e) => setRePassword(e.target.value)}
          />
        </Form.Group>
        <p className="paragraph">
          By clicking Register, you agree to our <a href="/">Terms</a>,{" "}
          <a href="/">Data Policy</a> and <a href="/">Cookies Policy.</a>
          You may receive SMS Notifications from us and can opt out any time.
        </p>
        <Form.Check
          required
          value={terms}
          name="agreement"
          label="I have read and accepted Terms and Conditions"
          onChange={(e) => setTerms(e.target.checked)}
        />
        <Button
          disabled={
            isEmpty(
              firstName,
              lastName,
              userName,
              birthDate,
              subCity,
              wereda,
              houseNumber,
              homePhoneNumber,
              phone,
              email,
              gender,
              password,
              rePassword,
              terms,
            ) || isLoading
          }
          type="submit"
          loading={isLoading}
        >
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
