import React, { useState } from "react";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import { isEmpty } from "../../helpers/isEmpty";
import axios from "../../axios";
import { useHistory } from "react-router-dom";
import { requests } from "../../constants/requests";
import Header from "../../components/Header/Header";
import '../../i18next';
import {useTranslation} from "react-i18next";

const AddTutorPage = () => {
  const {t} = useTranslation();
  const history = useHistory();
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

  const [isLoading, setIsLoading] = useState(false);

  const addTutor = async (e) => {
    e.preventDefault();

    if (password.trim() !== rePassword.trim()) {
      return alert("Password donot match!");
    }

    setIsLoading(true);
    try {
      const addTutorData = {
        tutor: {
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
      const { data } = await axios.post(requests.createTutor, addTutorData);
      if (!data.success) {
        return alert(data.message);
      } else {
        alert("Tutor Created Successfuly!!");
        history.goBack();
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add-tutor-page">
      <Header />
      <Form onSubmit={addTutor}>
        <h1 className="heading-primary--main">{t("heading_primary_main_addTutorPage")}</h1>
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
            ) || isLoading
          }
          type="submit"
          loading={isLoading}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddTutorPage;
